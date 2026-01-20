import {
  BasicRateLimiter,
  CloudflareError,
  ContentRating,
  DiscoverSectionType,
  PaperbackInterceptor,
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
  type Response,
  type SearchFilter,
  type SearchQuery,
  type SearchResultItem,
  type SearchResultsProviding,
  type SourceManga,
  type Tag,
  type TagSection,
  type Cookie,
} from "@paperback/types";
import * as cheerio from "cheerio";
import { type CheerioAPI } from "cheerio";
import { Genres, type Metadata } from "./models";

const DOMAIN = "https://theblank.net";

type TheBlankImplementation = Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding &
  CloudflareBypassRequestProviding;

class TheBlankInterceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    // Let Paperback's built-in Cloudflare solver handle requests
    // User will need to manually solve Cloudflare challenges in the app
    return request;
  }

  override async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    return data;
  }
}

export class TheBlankExtension implements TheBlankImplementation {
  interceptor = new TheBlankInterceptor("interceptor");

  rateLimiter = new BasicRateLimiter("rateLimiter", {
    numberOfRequests: 3,
    bufferInterval: 5,
    ignoreImages: false,
  });

  async initialise(): Promise<void> {
    this.interceptor.registerInterceptor();
    this.rateLimiter.registerInterceptor();
  }

  async fetchCheerio(request: Request): Promise<CheerioAPI> {
    const [response, data] = await Application.scheduleRequest(request);
    this.checkCloudflareStatus(response.status);
    return cheerio.load(Application.arrayBufferToUTF8String(data));
  }

  getMangaShareUrl(mangaId: string): string {
    return `${DOMAIN}/serie/${mangaId}/`;
  }

  async getSearchFilters(): Promise<SearchFilter[]> {
    return [];
  }

  async getSearchTags(): Promise<TagSection[]> {
    return [
      {
        id: "genres",
        title: "Genres",
        tags: Genres.map((g) => ({ id: g.id, title: g.label })),
      },
    ];
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
              const match = href.match(/\/serie\/([^\/]+)\/chapter\/([^\/]+)/);
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

    return {
      items: items,
      metadata: undefined,
    };
  }

  async getSearchResults(
    query: SearchQuery,
    metadata: Metadata | undefined,
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
    };
  }

  async saveCloudflareBypassCookies(_cookies: Cookie[]): Promise<void> {
    // Paperback handles cookie persistence; nothing extra needed here
    return;
  }

  private checkCloudflareStatus(status: number): void {
    if (status === 503 || status === 403) {
      throw new CloudflareError({ url: DOMAIN, method: "GET" });
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

  private parseDate(dateStr: string): Date {
    const now = new Date();
    const lowerStr = dateStr.toLowerCase();

    if (lowerStr.includes("ago")) {
      if (lowerStr.includes("minute")) {
        const mins = parseInt(lowerStr.match(/(\d+)/)?.[1] || "0");
        return new Date(now.getTime() - mins * 60000);
      }
      if (lowerStr.includes("hour")) {
        const hours = parseInt(lowerStr.match(/(\d+)/)?.[1] || "0");
        return new Date(now.getTime() - hours * 3600000);
      }
      if (lowerStr.includes("day")) {
        const days = parseInt(lowerStr.match(/(\d+)/)?.[1] || "0");
        return new Date(now.getTime() - days * 86400000);
      }
    }

    return new Date(dateStr || now.toISOString());
  }
}

export const TheBlank = new TheBlankExtension();
