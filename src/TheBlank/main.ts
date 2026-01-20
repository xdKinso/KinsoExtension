import {
  BasicRateLimiter,
  CloudflareError,
  ContentRating,
  CookieStorageInterceptor,
  DiscoverSectionType,
  type Chapter,
  type ChapterDetails,
  type ChapterProviding,
  type CloudflareBypassRequestProviding,
  type DiscoverSection,
  type DiscoverSectionItem,
  type DiscoverSectionProviding,
  type Extension,
  type MangaProviding,
  type PagedResults,
  type Request,
  type SearchFilter,
  type SearchQuery,
  type SearchResultItem,
  type SearchResultsProviding,
  type SourceManga,
  type Tag,
  type Cookie,
} from "@paperback/types";
import * as cheerio from "cheerio";
import { type CheerioAPI } from "cheerio";
import { type Metadata } from "./models";

const DOMAIN = "https://theblank.net";

type TheBlankImplementation = Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding &
  CloudflareBypassRequestProviding;

export class TheBlankExtension implements TheBlankImplementation {
  private cookieStorageInterceptor = new CookieStorageInterceptor({
    storage: "stateManager",
  });

  rateLimiter = new BasicRateLimiter("rateLimiter", {
    numberOfRequests: 3,
    bufferInterval: 5,
    ignoreImages: false,
  });

  async initialise(): Promise<void> {
    this.cookieStorageInterceptor.registerInterceptor();
    this.rateLimiter.registerInterceptor();
  }

  async fetchCheerio(request: Request): Promise<CheerioAPI> {
    const [response, data] = await Application.scheduleRequest(request);
    await this.checkCloudflareStatus(response.status, request.url);
    return cheerio.load(Application.arrayBufferToUTF8String(data));
  }

  async getSearchFilters(): Promise<SearchFilter[]> {
    // Note: TheBlank's search is JavaScript-dependent and not supported via direct HTTP
    // Users can browse via discover sections which include genre categorization
    return [];
  }

  async getDiscoverSections(): Promise<DiscoverSection[]> {
    return [
      {
        id: "trending",
        title: "Trending",
        type: DiscoverSectionType.prominentCarousel,
      },
      {
        id: "new-series",
        title: "New Series",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "last-chapters",
        title: "Last Chapters",
        type: DiscoverSectionType.chapterUpdates,
      },
    ];
  }

  async getDiscoverSectionItems(
    section: DiscoverSection,
    metadata: Metadata | undefined,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    const items: DiscoverSectionItem[] = [];
    const page = metadata?.page ?? 1;

    const request = {
      url: DOMAIN,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);

    if (section.id === "trending") {
      // Parse Trending section
      $("section").each((_, sectionElem) => {
        const $section = $(sectionElem);
        if ($section.find("label").text().includes("Trending")) {
          $section.find("a.flex.flex-col.gap-2").each((_, elem) => {
            const $elem = $(elem);
            const href = $elem.attr("href");
            const $img = $elem.find("img");
            const title = $img.attr("alt")?.trim() || $elem.find("span").last().text().trim();
            const image = $img.attr("src") || "";

            if (href && title) {
              const mangaId = this.extractMangaId(href);
              if (mangaId) {
                items.push({
                  type: "prominentCarouselItem",
                  mangaId: mangaId,
                  title: title,
                  imageUrl: image,
                });
              }
            }
          });
        }
      });
    } else if (section.id === "new-series") {
      // Parse New Series section
      $("section").each((_, sectionElem) => {
        const $section = $(sectionElem);
        if ($section.find("label").text().includes("New Series")) {
          $section.find("a.flex.flex-col.gap-2").each((_, elem) => {
            const $elem = $(elem);
            const href = $elem.attr("href");
            const $img = $elem.find("img");
            const title = $img.attr("alt")?.trim() || $elem.find("span").last().text().trim();
            const image = $img.attr("src") || "";

            if (href && title) {
              const mangaId = this.extractMangaId(href);
              if (mangaId) {
                items.push({
                  type: "simpleCarouselItem",
                  mangaId: mangaId,
                  title: title,
                  imageUrl: image,
                });
              }
            }
          });
        }
      });
    } else if (section.id === "last-chapters") {
      // Parse Last Chapters section
      $("section").each((_, sectionElem) => {
        const $section = $(sectionElem);
        if ($section.find("label").text().includes("Last Chapters")) {
          $section.find("a.block.cursor-pointer").each((_, elem) => {
            const $elem = $(elem);
            const href = $elem.attr("href");

            // Extract manga info from the link structure
            const $card = $elem.find("div.flex.items-center");
            const $img = $card.find("img").first();
            const title = $img.attr("alt")?.trim() || $elem.find("span.text-xs").text().trim();
            const image = $img.attr("src") || "";

            if (href && title) {
              const match = href.match(/\/serie\/([^/]+)\/chapter\/([^/]+)/);
              if (match && match[1] && match[2]) {
                items.push({
                  type: "chapterUpdatesCarouselItem",
                  mangaId: match[1],
                  title: title,
                  imageUrl: image,
                  chapterId: match[2],
                });
              }
            }
          });
        }
      });
    }

    // Implement pagination: return 10 items per page, provide next page if more items available
    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);
    const hasMorePages = items.length > endIndex;

    return {
      items: paginatedItems,
      metadata: hasMorePages ? { page: page + 1 } : undefined,
    };
  }

  async getSearchResults(
    _query: SearchQuery,
    _metadata: Metadata | undefined,
  ): Promise<PagedResults<SearchResultItem>> {
    // TheBlank uses dynamic/AJAX search - the URL doesn't change
    // Search functionality requires JavaScript execution which isn't supported
    // Users should browse via discover sections instead
    return {
      items: [],
      metadata: undefined,
    };
  }

  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    const url = `${DOMAIN}/serie/${mangaId}/`;
    const request = {
      url: url,
      method: "GET",
    };
    const $ = await this.fetchCheerio(request);

    const title = $("h1").first().text().trim() || $("div.text-2xl").text().trim();
    const image = $("img").first().attr("src") || "";
    const author = $("div:contains('Author')").next().text().trim() || "Unknown";
    const description = $("div.text-sm, div.description").first().text().trim();
    let status = "ONGOING";
    const statusText = $("div:contains('Status')").next().text().toLowerCase();
    if (statusText.includes("completed") || statusText.includes("complete")) {
      status = "COMPLETED";
    }

    const tags: Tag[] = [];
    $("a[href*='/genre/']").each((_, elem) => {
      const tag = $(elem).text().trim();
      if (tag) {
        tags.push({ id: tag.toLowerCase(), title: tag });
      }
    });

    return {
      mangaId: mangaId,
      mangaInfo: {
        primaryTitle: title,
        secondaryTitles: [],
        thumbnailUrl: image,
        author: author,
        artist: author,
        synopsis: description,
        status: status as "ONGOING" | "COMPLETED",
        contentRating: ContentRating.EVERYONE,
        tagGroups: tags.length > 0 ? [{ id: "genres", title: "Genres", tags }] : [],
      },
    };
  }

  async getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
    const url = `${DOMAIN}/serie/${sourceManga.mangaId}/`;
    const request = {
      url: url,
      method: "GET",
    };
    const $ = await this.fetchCheerio(request);

    const chapters: Chapter[] = [];

    $("a[href*='/chapter/']").each((_, elem) => {
      const $elem = $(elem);
      const href = $elem.attr("href");
      const chapterTitle = $elem.find("span").first().text().trim();

      if (href) {
        const chapterId = this.extractChapterId(href);
        if (chapterId) {
          const chapterMatch = chapterTitle.match(/chapter\s+(\d+(\.\d+)?)/i);
          const chapterNum = chapterMatch && chapterMatch[1] ? parseFloat(chapterMatch[1]) : 0;

          chapters.push({
            chapterId: chapterId,
            sourceManga: sourceManga,
            langCode: "en",
            chapNum: chapterNum,
            title: chapterTitle || `Chapter ${chapterNum}`,
            publishDate: new Date(),
          });
        }
      }
    });

    return chapters.reverse();
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    const url = `${DOMAIN}/serie/${chapter.sourceManga.mangaId}/chapter/${chapter.chapterId}/`;
    const request = {
      url: url,
      method: "GET",
    };
    const $ = await this.fetchCheerio(request);

    const pages: string[] = [];

    $("img[loading='lazy']").each((_, elem) => {
      const src = $(elem).attr("src");
      if (src && src.includes("mangaid")) {
        pages.push(src);
      }
    });

    return {
      id: chapter.chapterId,
      mangaId: chapter.sourceManga.mangaId,
      pages: pages,
    };
  }

  async getCloudflareBypassRequest(): Promise<Request> {
    // Direct the user to the homepage to complete the Cloudflare challenge in WebView
    return {
      url: DOMAIN,
      method: "GET",
      headers: {
        referer: DOMAIN,
        origin: DOMAIN,
        "user-agent": await Application.getDefaultUserAgent(),
      },
    };
  }

  async saveCloudflareBypassCookies(cookies: Cookie[]): Promise<void> {
    // Persist Cloudflare challenge cookies using the built-in interceptor
    // Delete first to prevent stale cookie conflicts
    for (const cookie of cookies) {
      this.cookieStorageInterceptor.deleteCookie(cookie);
      this.cookieStorageInterceptor.setCookie(cookie);
    }
  }

  private async checkCloudflareStatus(status: number, url: string = DOMAIN): Promise<void> {
    if (status === 503 || status === 403) {
      throw new CloudflareError({
        url: url,
        method: "GET",
        headers: {
          referer: DOMAIN,
          origin: DOMAIN,
          "user-agent": await Application.getDefaultUserAgent(),
        },
      });
    }
  }

  private extractMangaId(url: string): string | null {
    const match = url.match(/\/serie\/([^/]+)/);
    return match && match[1] ? match[1] : null;
  }

  private extractChapterId(url: string): string | null {
    const match = url.match(/\/chapter\/([^/]+)/);
    if (match && match[1]) {
      return match[1];
    }
    const match2 = url.match(/\/([^/]+)\/?$/);
    return match2 && match2[1] ? match2[1] : null;
  }
}

export const TheBlank = new TheBlankExtension();
