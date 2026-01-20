import {
  BasicRateLimiter,
  ContentRating,
  DiscoverSectionType,
  PaperbackInterceptor,
  type Chapter,
  type ChapterDetails,
  type ChapterProviding,
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
} from "@paperback/types";
import * as cheerio from "cheerio";
import { type CheerioAPI } from "cheerio";
import { Genres, type Metadata } from "./models";

const DOMAIN = "https://www.mangabats.com";

type MangaBatImplementation = Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding;

class MangaBatInterceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    request.headers = {
      ...request.headers,
      referer: `${DOMAIN}/`,
      origin: DOMAIN,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };
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

export class MangaBatExtension implements MangaBatImplementation {
  interceptor = new MangaBatInterceptor("interceptor");

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
    const [_response, data] = await Application.scheduleRequest(request);
    return cheerio.load(Application.arrayBufferToUTF8String(data));
  }

  getMangaShareUrl(mangaId: string): string {
    return `${DOMAIN}/manga/${mangaId}`;
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
        id: "popular",
        title: "Popular Manga",
        type: DiscoverSectionType.prominentCarousel,
      },
      {
        id: "latest",
        title: "Latest Releases",
        type: DiscoverSectionType.chapterUpdates,
      },
    ];
  }

  async getDiscoverSectionItems(
    section: DiscoverSection,
    metadata: Metadata | undefined,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    const page = metadata?.page ?? 1;
    const items: DiscoverSectionItem[] = [];

    let url = "";
    if (section.id === "popular") {
      url = `${DOMAIN}/manga-list/hot-manga?page=${page}`;
    } else if (section.id === "latest") {
      url = `${DOMAIN}/manga-list/latest-manga?page=${page}`;
    }

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);

    $("div.book_list_item, div.manga-item, div.item").each((_, elem) => {
      const $elem = $(elem);
      const $link = $elem.find("a").first();
      const href = $link.attr("href");
      const $img = $elem.find("img").first();
      const title = $img.attr("alt")?.trim() || $link.text().trim();
      const image = $img.attr("src") || $img.attr("data-src") || "";

      if (href && title) {
        const mangaId = this.extractMangaId(href);
        if (mangaId) {
          if (section.id === "popular") {
            items.push({
              type: "prominentCarouselItem",
              mangaId: mangaId,
              title: title,
              imageUrl: image,
            });
          } else if (section.id === "latest") {
            // For latest updates, try to get chapter info
            const $chapter = $elem.find(".chapter-item a, .latest-chapter a").first();
            const chapterHref = $chapter.attr("href");
            const chapterId = chapterHref ? this.extractChapterId(chapterHref) : "chapter-1";
            if (chapterId) {
              items.push({
                type: "chapterUpdatesCarouselItem",
                mangaId: mangaId,
                title: title,
                imageUrl: image,
                chapterId: chapterId,
              });
            }
          }
        }
      }
    });

    return {
      items: items,
      metadata: { page: page + 1 },
    };
  }

  async getSearchResults(
    query: SearchQuery,
    metadata: Metadata | undefined,
  ): Promise<PagedResults<SearchResultItem>> {
    const page = metadata?.page ?? 1;
    const items: SearchResultItem[] = [];

    let url = `${DOMAIN}/search?q=${encodeURIComponent(query.title || "")}&page=${page}`;

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);

    $("div.book_list_item, div.manga-item, div.item").each((_, elem) => {
      const $elem = $(elem);
      const $link = $elem.find("a").first();
      const href = $link.attr("href");
      const $img = $elem.find("img").first();
      const title = $img.attr("alt")?.trim() || $link.text().trim();
      const image = $img.attr("src") || $img.attr("data-src") || "";

      if (href && title) {
        const mangaId = this.extractMangaId(href);
        if (mangaId) {
          items.push({
            mangaId: mangaId,
            title: title,
            imageUrl: image,
          });
        }
      }
    });

    return {
      items: items,
      metadata: { page: page + 1 },
    };
  }

  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    const url = `${DOMAIN}/manga/${mangaId}`;
    const request = {
      url: url,
      method: "GET",
    };
    const $ = await this.fetchCheerio(request);

    const title = $("h1.name, h1.manga-title").text().trim();
    const image = $("div.summary_image img, div.manga-image img").attr("src") || "";
    const author = $("div.author-content a, div.author a").text().trim() || "Unknown";
    const description = $("div.description-summary div.summary__content, div.summary")
      .text()
      .trim();
    let status = "ONGOING";
    const statusText = $("div.post-status div.summary-content, div.status").text().toLowerCase();
    if (statusText.includes("completed") || statusText.includes("complete")) {
      status = "COMPLETED";
    }

    const tags: Tag[] = [];
    $("div.genres-content a, div.genre a").each((_, elem) => {
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
    const url = `${DOMAIN}/manga/${sourceManga.mangaId}`;
    const request = {
      url: url,
      method: "GET",
    };
    const $ = await this.fetchCheerio(request);

    const chapters: Chapter[] = [];

    $("li.wp-manga-chapter, div.chapter-item, li.chapter-item").each((_, elem) => {
      const $elem = $(elem);
      const $link = $elem.find("a").first();
      const href = $link.attr("href");
      const chapterTitle = $link.text().trim();
      const timeStr = $elem.find("span.chapter-release-date, span.chapter-time").text().trim();

      if (href) {
        const chapterId = this.extractChapterId(href);
        if (chapterId) {
          const chapterMatch = chapterTitle.match(/chapter[\s-]*(\d+(\.\d+)?)/i);
          const chapterNum = chapterMatch && chapterMatch[1] ? parseFloat(chapterMatch[1]) : 0;

          chapters.push({
            chapterId: chapterId,
            sourceManga: sourceManga,
            langCode: "en",
            chapNum: chapterNum,
            title: chapterTitle,
            publishDate: this.parseDate(timeStr),
          });
        }
      }
    });

    return chapters.reverse();
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    const url = `${DOMAIN}/manga/${chapter.sourceManga.mangaId}/${chapter.chapterId}`;
    const request = {
      url: url,
      method: "GET",
    };
    const $ = await this.fetchCheerio(request);

    const pages: string[] = [];

    $("div.reading-content img, div.page-break img").each((_, elem) => {
      const src = $(elem).attr("src") || $(elem).attr("data-src");
      if (src) {
        pages.push(src);
      }
    });

    return {
      id: chapter.chapterId,
      mangaId: chapter.sourceManga.mangaId,
      pages: pages,
    };
  }

  private extractMangaId(url: string): string | null {
    const match = url.match(/\/manga\/([^\/\?#]+)/);
    return match && match[1] ? match[1] : null;
  }

  private extractChapterId(url: string): string | null {
    const match = url.match(/\/chapter-(\d+(\.\d+)?)/);
    if (match && match[1]) {
      return `chapter-${match[1]}`;
    }
    const match2 = url.match(/\/([^\/]+)\/?$/);
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
