import {
  BasicRateLimiter,
  CloudflareError,
  CookieStorageInterceptor,
  DiscoverSectionType,
  type Chapter,
  type ChapterDetails,
  type ChapterProviding,
  type CloudflareBypassRequestProviding,
  type Cookie,
  type DiscoverSection,
  type DiscoverSectionItem,
  type DiscoverSectionProviding,
  type Extension,
  type PagedResults,
  type Request,
  type SearchQuery,
  type SearchResultItem,
  type SearchResultsProviding,
  type SourceManga,
  type SortingOption,
} from "@paperback/types";
import * as cheerio from "cheerio";
import * as htmlparser2 from "htmlparser2";

import { Interceptor } from "./interceptors";
import { parseSearchResults, parseMangaDetails, parseChapters, parseChapterPages } from "./parsers";

const baseUrl = "https://demonicscans.org";

type MangaDemonImplementation = Extension &
  SearchResultsProviding &
  ChapterProviding &
  CloudflareBypassRequestProviding &
  DiscoverSectionProviding;

export class MangaDemonExtension implements MangaDemonImplementation {
  requestManager = new Interceptor("main");
  cookieStorageInterceptor = new CookieStorageInterceptor({
    storage: "stateManager",
  });

  // Main rate limiter: 2 requests per second (matching Keiyoushi)
  globalRateLimiter = new BasicRateLimiter("rateLimiter", {
    numberOfRequests: 2,
    bufferInterval: 1,
    ignoreImages: true,
  });

  // Separate rate limiter for thumbnails: 6 requests per second (faster loading)
  thumbnailRateLimiter = new BasicRateLimiter("thumbnailRateLimiter", {
    numberOfRequests: 6,
    bufferInterval: 1,
    ignoreImages: false,
  });

  async initialise(): Promise<void> {
    this.requestManager.registerInterceptor();
    this.cookieStorageInterceptor.registerInterceptor();
    this.globalRateLimiter.registerInterceptor();
    this.thumbnailRateLimiter.registerInterceptor();
  }

  async getSearchResults(
    query: SearchQuery,
    metadata?: any,
    _sortingOption?: SortingOption,
  ): Promise<PagedResults<SearchResultItem>> {
    const page = metadata?.page || 1;

    try {
      let searchUrl: string;

      if (query.title && query.title.trim() !== "") {
        const searchUrls = [
          `${baseUrl}/search.php?manga=${encodeURIComponent(query.title)}`,
          `${baseUrl}/search.php?query=${encodeURIComponent(query.title)}`,
          `${baseUrl}/search?query=${encodeURIComponent(query.title)}`,
          `${baseUrl}/?s=${encodeURIComponent(query.title)}`,
          `${baseUrl}/lastnvupdates.php`,
        ];

        let items: SearchResultItem[] = [];
        for (const candidateUrl of searchUrls) {
          console.log("[MangaDemon] Performing search request:", candidateUrl);
          const request = { url: candidateUrl, method: "GET" };
          const htmlStr = await this.fetchHtml(request);
          const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));
          items = parseSearchResults($, baseUrl, query.title || "");
          if (items.length > 0) break;
        }

        return { items };
      }

      searchUrl = `${baseUrl}/advanced.php?list=${page}&status=all&orderby=VIEWS%20DESC`;

      console.log("[MangaDemon] Performing search request:", searchUrl);

      const request = { url: searchUrl, method: "GET" };
      const htmlStr = await this.fetchHtml(request);
      const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));
      const items = parseSearchResults($, baseUrl, query.title || "");

      console.log(`[MangaDemon] Found ${items.length} results`);

      return { items, metadata: items.length > 0 ? { page: page + 1 } : undefined };
    } catch (error) {
      if (error instanceof CloudflareError) {
        throw error;
      }
      console.error("[MangaDemon] Search error:", error);
      return { items: [] };
    }
  }

  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    const url = this.decodeId(mangaId);
    const request = {
      url: url.startsWith("http") ? url : `${baseUrl}${url}`,
      method: "GET",
    };

    const htmlStr = await this.fetchHtml(request);
    const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));

    return parseMangaDetails($, mangaId, baseUrl);
  }

  async getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
    const mangaId = sourceManga.mangaId;
    const url = this.decodeId(mangaId);

    const request = {
      url: url.startsWith("http") ? url : `${baseUrl}${url}`,
      method: "GET",
    };

    const htmlStr = await this.fetchHtml(request);
    const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));

    return parseChapters($, sourceManga);
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    const url = this.decodeId(chapter.chapterId);

    const request = {
      url: url.startsWith("http") ? url : `${baseUrl}${url}`,
      method: "GET",
    };

    const htmlStr = await this.fetchHtml(request);
    const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));

    const pages = parseChapterPages($);

    return {
      id: chapter.chapterId,
      mangaId: chapter.sourceManga.mangaId,
      pages,
    };
  }

  async getSearchFilters(): Promise<any[]> {
    return [];
  }

  async getSortingOptions(): Promise<any[]> {
    return [];
  }

  async getCloudflareBypassRequest(): Promise<Request> {
    const { generateBrowserHeadersMangaDemon } = await import("./browserHeadersMangaDemon");
    const headers = await generateBrowserHeadersMangaDemon(baseUrl);

    return {
      url: baseUrl,
      method: "GET",
      headers,
    };
  }

  async saveCloudflareBypassCookies(_cookies: any[]): Promise<void> {
    for (const cookie of _cookies as Cookie[]) {
      if (
        cookie.name.startsWith("cf") ||
        cookie.name.startsWith("_cf") ||
        cookie.name.startsWith("__cf")
      ) {
        this.cookieStorageInterceptor.setCookie(cookie);
      }
    }
  }

  async getDiscoverSections(): Promise<DiscoverSection[]> {
    return [
      {
        id: "most_viewed_today",
        title: "Most Viewed Today",
        type: DiscoverSectionType.featured,
      },
      {
        id: "latest_translations",
        title: "Latest Translations",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "latest_updates",
        title: "Latest Updates",
        type: DiscoverSectionType.simpleCarousel,
      },
    ];
  }

  async getDiscoverSectionItems(
    section: DiscoverSection,
    _metadata?: any,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    try {
      const request = {
        url: baseUrl,
        method: "GET",
      };

      const htmlStr = await this.fetchHtml(request);
      const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));

      let items: DiscoverSectionItem[] = [];

      if (section.id === "most_viewed_today") {
        const { parseMostViewedToday } = await import("./parsers");
        items = parseMostViewedToday($, baseUrl);
      } else if (section.id === "latest_translations") {
        const { parseLatestTranslations } = await import("./parsers");
        items = parseLatestTranslations($, baseUrl);
      } else if (section.id === "latest_updates") {
        const { parseLatestUpdates } = await import("./parsers");
        items = parseLatestUpdates($, baseUrl);
      }

      return { items };
    } catch (error) {
      if (error instanceof CloudflareError) {
        throw error;
      }
      console.error(`[MangaDemon] Error loading section ${section.id}:`, error);
      return { items: [] };
    }
  }

  private async fetchHtml(request: Request): Promise<string> {
    const [response, data] = await Application.scheduleRequest(request);
    const htmlStr = Application.arrayBufferToUTF8String(data);
    if (this.isCloudflare(response.status, htmlStr)) {
      throw new CloudflareError(request);
    }
    return htmlStr;
  }

  private isCloudflare(status: number, htmlStr: string): boolean {
    if (status === 403 || status === 503) return true;
    return (
      htmlStr.includes("Just a moment") ||
      htmlStr.includes("cf-chl") ||
      htmlStr.includes("challenge-platform")
    );
  }

  private decodeId(encoded: string): string {
    if (encoded.startsWith("b64:")) {
      return this.fromBase64(encoded.slice(4));
    }
    try {
      return decodeURIComponent(encoded);
    } catch {
      return encoded;
    }
  }

  private fromBase64(value: string): string {
    try {
      return decodeURIComponent(escape(atob(value)));
    } catch {
      return atob(value);
    }
  }
}

export const MangaDemon = new MangaDemonExtension();
