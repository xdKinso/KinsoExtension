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

    // Handle different sections differently
    if (section.id === "popular") {
      // Popular section: Find all img tags with src attributes and their associated links
      $("img[src*='thumbnail']").each((_, element) => {
        const $img = $(element);
        const imageUrl = $img.attr("src") || "";
        let title = $img.attr("alt") || $img.attr("title") || "";

        if (!imageUrl || !title) return;

        // Find the link associated with this image
        let $link = $img.closest("a[href*='/manga/']");
        if (!$link.length) {
          // Try finding link in parent elements
          $link = $img.parent().find("a[href*='/manga/']").first();
        }
        if (!$link.length) {
          // Try finding link as sibling
          $link = $img.siblings("a[href*='/manga/']").first();
        }

        let mangaId = "";
        if ($link.length) {
          const href = $link.attr("href") || "";
          const extractedId = this.extractMangaId(href);
          if (extractedId) {
            mangaId = extractedId;
          }
        }

        // Fallback: try to extract ID from image src or data attributes
        if (!mangaId) {
          const srcMatch = imageUrl.match(/\/(\d+)\//);
          if (srcMatch && srcMatch[1]) {
            mangaId = srcMatch[1];
          }
        }

        if (!mangaId || seenIds.has(mangaId)) return;

        seenIds.add(mangaId);
        items.push({
          type: "prominentCarouselItem",
          mangaId: mangaId,
          title: title,
          imageUrl: imageUrl,
        });
      });
    } else {
      // Latest Update and New Release sections use .comic-image divs with img.image.lozad
      $("div.comic-image").each((_, element) => {
        const $imageDiv = $(element);

        // Find the image and get data from it
        const $img = $imageDiv.find("img.image.lozad").first();
        if (!$img.length) return;

        // Get image URL from data-src or src
        const imageUrl = $img.attr("data-src") || $img.attr("src") || "";

        // Get title from alt attribute
        const title = $img.attr("alt")?.trim() || $img.attr("title")?.trim() || "";

        if (!title || !imageUrl) return;

        // Find the manga link to get the ID - look for onclick with manga ID or search for link
        let mangaId = "";

        // Try to extract from onclick attribute: onclick="toggleBookmark(event,'99651')"
        const bookmarkBtn = $imageDiv.find(".btn-bookmark").first();
        const onclickAttr = bookmarkBtn.attr("onclick") || "";
        const idMatch = onclickAttr.match(/toggleBookmark\(event,'(\d+)'\)/);
        if (idMatch && idMatch[1]) {
          mangaId = idMatch[1];
        }

        // Fallback: look for manga_id attribute
        if (!mangaId) {
          const readBtn = $imageDiv.find(".btn-mark-as-read").first();
          mangaId = readBtn.attr("manga_id") || "";
        }

        if (!mangaId || seenIds.has(mangaId)) return;

        seenIds.add(mangaId);

        if (section.id === "latest-update") {
          items.push({
            type: "chapterUpdatesCarouselItem",
            mangaId: mangaId,
            title: title,
            imageUrl: imageUrl,
            chapterId: "latest",
          });
        } else {
          items.push({
            type: "simpleCarouselItem",
            mangaId: mangaId,
            title: title,
            imageUrl: imageUrl,
          });
        }
      });
    }

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

    // Find the cover image - look for img inside .img-manga div
    let image = "";
    const $mangaImg = $("div.img-manga img").first();
    if ($mangaImg.length) {
      image = $mangaImg.attr("src") || $mangaImg.attr("data-src") || "";
    }
    // Fallback: look for img with src containing 'thumbnail' or 'cover'
    if (!image) {
      const $coverImg = $("img[src*='thumbnail'], img[src*='cover']").first();
      if ($coverImg.length) {
        image = $coverImg.attr("src") || $coverImg.attr("data-src") || "";
      }
    }
    // Final fallback: try to find any img with alt matching title
    if (!image && title) {
      const $titleImg = $(`img[alt="${title}"], img[title="${title}"]`).first();
      if ($titleImg.length) {
        image = $titleImg.attr("src") || $titleImg.attr("data-src") || "";
      }
    }

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

    // VyManga uses .list-chapter class for chapter links with redirect URLs
    $("a.list-chapter").each((_, element) => {
      const $elem = $(element);
      const href = $elem.attr("href");
      const chapterId = $elem.attr("id"); // e.g., "chapter-1"

      if (!href || !chapterId) return;

      // Get chapter title/number from span
      const chapterTitle = $elem.find("span").first().text().trim() || $elem.text().trim();

      // Try to parse chapter number from text (e.g., "Chapter 123" -> 123)
      let chapterNum = 0;
      const numMatch = chapterTitle.match(/chapter\s+(\d+(?:\.\d+)?)/i);
      if (numMatch && numMatch[1]) {
        chapterNum = parseFloat(numMatch[1]);
      }

      // Get chapter date from the small paragraph
      const dateText = $elem.find("p.small").text().trim();
      let date = new Date();
      if (dateText) {
        const parsedDate = new Date(dateText);
        if (!isNaN(parsedDate.getTime())) {
          date = parsedDate;
        }
      }

      // Store the redirect URL - we'll use it to fetch chapter images
      chapters.push({
        chapterId: href, // Store the full redirect URL as chapterId
        sourceManga: sourceManga,
        langCode: "en",
        chapNum: chapterNum,
        title: chapterTitle,
        publishDate: date,
      });
    });

    return chapters.reverse(); // Reverse to get oldest first
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    // The chapterId contains the redirect URL from aovheroes.com
    const url = chapter.chapterId;

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    const pages: string[] = [];

    // VyManga uses lazy-loaded images with class 'lozad' and data-src attribute
    $("img.lozad").each((_, element) => {
      const $img = $(element);
      // Try data-src first (lazy load), then fall back to src
      const src = $img.attr("data-src") || $img.attr("src") || "";

      if (src && src.startsWith("http")) {
        pages.push(src);
      }
    });

    // Fallback: if no lozad images found, try all images with data-src or src
    if (pages.length === 0) {
      $("img").each((_, element) => {
        const $img = $(element);
        const src = $img.attr("data-src") || $img.attr("src") || "";

        // Skip small images (thumbnails, icons, logos, etc.)
        if (!src || src.includes("icon") || src.includes("logo") || src.includes("loading")) {
          return;
        }

        if (src.startsWith("http")) {
          pages.push(src);
        }
      });
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
      // Try simpler match for short slugs or numeric IDs
      const simpleMatch = url.match(/\/manga\/([a-zA-Z0-9-]+)/);
      if (simpleMatch && simpleMatch[1]) {
        const id = simpleMatch[1];
        // Validate: must not be just dashes, must have alphanumeric chars
        if (id.replace(/-/g, "").length >= 1) {
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
