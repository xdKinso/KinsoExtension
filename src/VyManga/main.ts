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

const DOMAIN = "https://vymanga.com";

type VyMangaImplementation = Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding;

class VyMangaInterceptor extends PaperbackInterceptor {
  async interceptRequest(request: Request): Promise<Request> {
    request.headers = {
      ...request.headers,
      referer: "https://vymanga.com/",
      origin: "https://vymanga.com",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    };
    return request;
  }

  async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    return data;
  }
}

export class VyMangaExtension implements VyMangaImplementation {
  interceptor = new VyMangaInterceptor("interceptor");

  rateLimiter = new BasicRateLimiter("rateLimiter", {
    numberOfRequests: 3,
    bufferInterval: 5,
    ignoreImages: false,
  });

  async initialise(): Promise<void> {
    this.rateLimiter.registerInterceptor();
  }

  async fetchCheerio(request: Request): Promise<CheerioAPI> {
    const [response, data] = await Application.scheduleRequest(request);
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
        id: "latest-update",
        title: "Latest Update",
        type: DiscoverSectionType.chapterUpdates,
      },
      {
        id: "new-release",
        title: "New Release",
        type: DiscoverSectionType.simpleCarousel,
      },
    ];
  }

  async getDiscoverSectionItems(
    section: DiscoverSection,
    metadata: Metadata | undefined,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    const page = metadata?.page ?? 1;

    let url = DOMAIN;
    if (section.id === "latest-update") {
      url = `${DOMAIN}/search?sort=updated_at&page=${page}`;
    } else if (section.id === "new-release") {
      url = `${DOMAIN}/search?sort=created_at&page=${page}`;
    }

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    const items: DiscoverSectionItem[] = [];
    const seenIds = new Set<string>();

    // Parse manga cards - VyManga uses direct links to /manga/ pages in list items
    $('a[href*="/manga/"]').each((_, element) => {
      const $elem = $(element);
      const href = $elem.attr("href");

      // Skip if href is missing or doesn't look like a manga page
      if (!href) return;

      const mangaId = this.extractMangaId(href);

      // Skip if invalid ID or already seen
      if (!mangaId || seenIds.has(mangaId)) {
        return;
      }

      // Get title - try multiple methods
      let title = $elem.attr("title")?.trim() || "";
      if (!title) {
        title = $elem.text().trim();
        // Clean up title if it contains chapter info
        if (title.includes("Chapter")) {
          const lines = title.split("\n");
          title = lines[0]?.trim() || "";
        }
      }

      // Get image - look for img within the link or in parent/sibling elements
      let image = "";
      const $img = $elem.find("img").first();
      if ($img.length) {
        image = $img.attr("src") || $img.attr("data-src") || "";
      }
      // If no image in link, try to find nearby image
      if (!image) {
        const $parentImg = $elem.parent().find("img").first();
        image = $parentImg.attr("src") || $parentImg.attr("data-src") || "";
      }

      // Skip if no title
      if (!title) {
        return;
      }

      // Provide a placeholder image if none found
      if (!image || !image.startsWith("http")) {
        image = "https://vymanga.com/web/img/placeholder.png";
      }

      seenIds.add(mangaId);

      if (section.id === "popular") {
        if (items.length < 20) {
          items.push({
            type: "prominentCarouselItem",
            mangaId: mangaId,
            title: title,
            imageUrl: image,
          });
        }
      } else if (section.id === "latest-update") {
        items.push({
          type: "chapterUpdatesCarouselItem",
          mangaId: mangaId,
          title: title,
          imageUrl: image,
          chapterId: "latest",
        });
      } else if (section.id === "new-release") {
        items.push({
          type: "simpleCarouselItem",
          mangaId: mangaId,
          title: title,
          imageUrl: image,
        });
      }
    });

    return {
      items: items,
      metadata: items.length >= 20 ? { page: page + 1 } : undefined,
    };
  }

  async getSearchResults(
    query: SearchQuery,
    metadata: Metadata | undefined,
  ): Promise<PagedResults<SearchResultItem>> {
    const page = metadata?.page ?? 1;
    const searchTerm = query.title?.trim() || "";

    let url = `${DOMAIN}/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    const results: SearchResultItem[] = [];

    $('a[href*="/manga/"]').each((_, element) => {
      const $elem = $(element);
      const href = $elem.attr("href");
      const title =
        $elem.find("h3, h4, .title").first().text().trim() || $elem.attr("title")?.trim();
      const image =
        $elem.find("img").first().attr("src") || $elem.find("img").first().attr("data-src") || "";

      if (href && title && !results.find((r) => r.mangaId === this.extractMangaId(href))) {
        const mangaId = this.extractMangaId(href);
        if (mangaId) {
          results.push({
            mangaId: mangaId,
            title: title,
            imageUrl: image,
          });
        }
      }
    });

    return {
      items: results,
      metadata: results.length >= 20 ? { page: page + 1 } : undefined,
    };
  }

  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    const url = `${DOMAIN}/manga/${mangaId}`;

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);

    const title = $("h1, .manga-title, .title").first().text().trim();
    const image =
      $('img[alt*="' + title + '"], .manga-cover img, .thumbnail img, img')
        .first()
        .attr("src") ||
      $('img[alt*="' + title + '"], .manga-cover img, .thumbnail img, img')
        .first()
        .attr("data-src") ||
      "";

    const description = $(".summary, .description, .synopsis, p").first().text().trim();

    // Try to parse author and artist
    let author = "Unknown";
    let artist = "Unknown";

    $("div, span, p").each((_, element) => {
      const text = $(element).text();
      if (text.includes("Author")) {
        const match = text.match(/Author[:\s]+([^•\n]+)/i);
        if (match && match[1]) {
          author = match[1].trim();
        }
      }
      if (text.includes("Artist")) {
        const match = text.match(/Artist[:\s]+([^•\n]+)/i);
        if (match && match[1]) {
          artist = match[1].trim();
        }
      }
    });

    // Parse status
    let status = "ONGOING";
    const statusText = $(".status, .manga-status").text().toLowerCase();
    if (statusText.includes("completed") || statusText.includes("complete")) {
      status = "COMPLETED";
    }

    // Parse genres
    const tags: Tag[] = [];
    $('a[href*="/genre/"]').each((_, element) => {
      const $el = $(element);
      const href = $el.attr("href") || "";
      const tag = $el.text().trim();

      // Extract genre ID from URL like /genre/webtoons
      const genreMatch = href.match(/\/genre\/([a-zA-Z0-9-]+)/);
      if (genreMatch && genreMatch[1] && tag) {
        // Use the URL slug as ID - it's already sanitized
        const id = genreMatch[1].toLowerCase();
        // Make sure ID is valid (alphanumeric with allowed symbols)
        if (id && /^[a-zA-Z0-9._\-@()\[\]%?#+=/&:]+$/.test(id)) {
          tags.push({ id: id, title: tag });
        }
      }
    });

    return {
      mangaId: mangaId,
      mangaInfo: {
        primaryTitle: title,
        secondaryTitles: [],
        thumbnailUrl: image,
        status: status as "ONGOING" | "COMPLETED",
        artist: artist,
        author: author,
        contentRating: ContentRating.MATURE,
        synopsis: description,
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

    // VyManga chapter list
    $('a[href*="/chapter/"], .chapter-list a, a[href*="chapter"]').each((_, element) => {
      const $elem = $(element);
      const href = $elem.attr("href");
      const chapterTitle =
        $elem.text().trim() || $elem.find(".chapter-title, .title").text().trim();

      if (href && href.includes("chapter") && chapterTitle) {
        const chapterId = this.extractChapterId(href);
        if (chapterId && !chapters.find((c) => c.chapterId === chapterId)) {
          // Extract chapter number from title or URL
          const chapterNumMatch =
            chapterTitle.match(/chapter[:\s]+(\d+(?:\.\d+)?)/i) ||
            href.match(/chapter[:\-_]+(\d+(?:\.\d+)?)/i);
          const chapterNum =
            chapterNumMatch && chapterNumMatch[1]
              ? parseFloat(chapterNumMatch[1])
              : chapters.length;

          // Try to parse date
          const dateText = $elem.find(".chapter-date, .date, time").text().trim();
          let date = new Date();
          if (dateText) {
            date = this.parseRelativeDate(dateText);
          }

          chapters.push({
            chapterId: chapterId,
            sourceManga: sourceManga,
            langCode: "en",
            chapNum: chapterNum,
            title: chapterTitle,
            publishDate: date,
          });
        }
      }
    });

    return chapters.reverse(); // Reverse to get oldest first
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    const url = `${DOMAIN}${chapter.chapterId.startsWith("/") ? "" : "/"}${chapter.chapterId}`;

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    const pages: string[] = [];

    // Try to find images in the chapter reader
    $(
      '.chapter-content img, .reader-content img, #chapter-reader img, .page-break img, img[alt*="page"]',
    ).each((_, element) => {
      const $img = $(element);
      const src = $img.attr("src") || $img.attr("data-src") || $img.attr("data-lazy-src") || "";
      if (src && !src.includes("loading") && !src.includes("spinner") && !src.includes("icon")) {
        pages.push(src.trim());
      }
    });

    // If no images found, try to find them in script tags
    if (pages.length === 0) {
      const html = $.html();
      const imageMatches = html.matchAll(/https?:\/\/[^\s"']+?\.(?:jpg|jpeg|png|gif|webp)/gi);
      for (const match of imageMatches) {
        const imageUrl = match[0];
        if (
          !imageUrl.includes("loading") &&
          !imageUrl.includes("spinner") &&
          !imageUrl.includes("icon")
        ) {
          pages.push(imageUrl);
        }
      }
    }

    return {
      id: chapter.chapterId,
      mangaId: chapter.sourceManga.mangaId,
      pages: pages,
    };
  }

  private extractMangaId(url: string): string | null {
    // Extract manga ID from URL like /manga/manga-slug or https://vymanga.com/manga/manga-slug
    const match = url.match(/\/manga\/([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])(?:\/|\?|$|#)/);
    if (!match || !match[1]) {
      // Try simpler match for short slugs
      const simpleMatch = url.match(/\/manga\/([a-zA-Z0-9-]+)/);
      if (simpleMatch && simpleMatch[1]) {
        const id = simpleMatch[1];
        // Validate: must not be just dashes, must have alphanumeric chars
        if (id.replace(/-/g, "").length >= 2) {
          return id;
        }
      }
      return null;
    }
    return match[1];
  }

  private extractChapterId(url: string): string | null {
    // Return the full path after domain for chapters
    // VyManga uses full URLs, extract the path
    try {
      const urlObj = new URL(url, DOMAIN);
      return urlObj.pathname;
    } catch {
      // If not a full URL, assume it's already a path
      return url.startsWith("/") ? url : "/" + url;
    }
  }

  private parseRelativeDate(dateString: string): Date {
    const now = new Date();
    const lower = dateString.toLowerCase();

    // Handle relative dates
    if (lower.includes("ago")) {
      const match = dateString.match(/(\d+)\s+(second|minute|hour|day|week|month|year)/i);
      if (match && match[1] && match[2]) {
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();

        switch (unit) {
          case "second":
            now.setSeconds(now.getSeconds() - value);
            break;
          case "minute":
            now.setMinutes(now.getMinutes() - value);
            break;
          case "hour":
            now.setHours(now.getHours() - value);
            break;
          case "day":
            now.setDate(now.getDate() - value);
            break;
          case "week":
            now.setDate(now.getDate() - value * 7);
            break;
          case "month":
            now.setMonth(now.getMonth() - value);
            break;
          case "year":
            now.setFullYear(now.getFullYear() - value);
            break;
        }
      }
      return now;
    }

    // Try to parse as regular date
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? now : parsed;
  }
}

export const VyManga = new VyMangaExtension();
