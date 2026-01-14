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
      // Popular section: Find all links to manga pages first
      $("a[href*='/manga/']").each((_, element) => {
        const $link = $(element);
        const href = $link.attr("href") || "";
        const mangaId = this.extractMangaId(href);

        if (!mangaId || seenIds.has(mangaId)) return;

        // Find the associated image
        const $img = $link.find("img[src*='thumbnail'], img[src*='cover']").first();
        let imageUrl = "";
        let title = "";

        if ($img.length) {
          imageUrl = $img.attr("src") || $img.attr("data-src") || "";
          title = $img.attr("alt") || $img.attr("title") || "";
        }

        // Try to find image in parent or sibling elements if not found in link
        if (!imageUrl) {
          const $nearbyImg = $link
            .parent()
            .find("img[src*='thumbnail'], img[src*='cover']")
            .first();
          if ($nearbyImg.length) {
            imageUrl = $nearbyImg.attr("src") || $nearbyImg.attr("data-src") || "";
            title = $nearbyImg.attr("alt") || $nearbyImg.attr("title") || "";
          }
        }

        if (!title || !imageUrl) return;

        seenIds.add(mangaId);
        items.push({
          type: "prominentCarouselItem",
          mangaId: mangaId,
          title: title,
          imageUrl: imageUrl,
        });
      });
    } else {
      // Latest Update and New Release sections - find manga cards with links
      $("div.comic-image").each((_, element) => {
        const $imageDiv = $(element);

        // Find the image to get title and imageUrl
        const $img = $imageDiv.find("img.image.lozad").first();
        if (!$img.length) return;

        const imageUrl = $img.attr("data-src") || $img.attr("src") || "";
        const title = $img.attr("alt")?.trim() || $img.attr("title")?.trim() || "";

        if (!title || !imageUrl) return;

        // Find the manga link - it should be near the comic-image div
        let mangaId = "";

        // Try to find link in parent or sibling elements
        const $parent = $imageDiv.parent();
        let $link = $parent.find("a[href*='/manga/']").first();

        // If not found, try in grandparent
        if (!$link.length) {
          $link = $parent.parent().find("a[href*='/manga/']").first();
        }

        // Try siblings
        if (!$link.length) {
          $link = $imageDiv.siblings("a[href*='/manga/']").first();
        }

        if ($link.length) {
          const href = $link.attr("href") || "";
          const extractedId = this.extractMangaId(href);
          if (extractedId) {
            mangaId = extractedId;
          }
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
    const seenIds = new Set<string>();

    // Search results use div.comic-item structure
    $("div.comic-item").each((_, element) => {
      const $item = $(element);

      // Find the manga link
      const $link = $item.find("a[href*='/manga/']").first();
      if (!$link.length) return;

      const href = $link.attr("href") || "";
      const mangaId = this.extractMangaId(href);
      if (!mangaId || seenIds.has(mangaId)) return;

      // Get title from div.comic-title or img alt/title
      let title = $item.find("div.comic-title").first().text().trim();
      if (!title) {
        const $img = $item.find("img.image").first();
        title = $img.attr("alt") || $img.attr("title") || "";
      }

      // Get image URL
      const $img = $item.find("img.image.lozad").first();
      const imageUrl = $img.attr("data-src") || $img.attr("src") || "";

      if (title && imageUrl) {
        seenIds.add(mangaId);
        results.push({
          mangaId: mangaId,
          title: title.trim(),
          imageUrl: imageUrl,
        });
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

    // Find the cover image - try multiple approaches
    let image = "";

    // 1. Look for img inside .img-manga div
    const $mangaImg = $("div.img-manga img").first();
    if ($mangaImg.length) {
      image = $mangaImg.attr("src") || $mangaImg.attr("data-src") || "";
    }

    // 2. Look for any img with cdnxyz.xyz domain (VyManga's CDN)
    if (!image) {
      const $cdnImg = $("img[src*='cdnxyz.xyz']").first();
      if ($cdnImg.length) {
        image = $cdnImg.attr("src") || $cdnImg.attr("data-src") || "";
      }
    }

    // 3. Look for img with src containing 'thumbnail' or 'cover'
    if (!image) {
      const $coverImg = $("img[src*='thumbnail'], img[src*='cover']").first();
      if ($coverImg.length) {
        image = $coverImg.attr("src") || $coverImg.attr("data-src") || "";
      }
    }

    // 4. Try to find any img with alt/title matching the manga title
    if (!image && title) {
      const $titleImg = $(`img[alt="${title}"], img[title="${title}"]`).first();
      if ($titleImg.length) {
        image = $titleImg.attr("src") || $titleImg.attr("data-src") || "";
      }
    }

    const description = $(".summary, .description, .synopsis, p").first().text().trim();

    // Parse author - look for a[href*="/author/"]
    let author = "Unknown";
    const $authorLink = $('a[href*="/author/"]').first();
    if ($authorLink.length) {
      author = $authorLink.text().trim();
    }

    // Parse status - look for span.text-ongoing or span.text-completed
    let status = "ONGOING";
    if ($("span.text-completed").length) {
      status = "COMPLETED";
    } else if (!$("span.text-ongoing").length) {
      // Fallback: check generic status text
      const statusText = $(".status, .manga-status").text().toLowerCase();
      if (statusText.includes("completed") || statusText.includes("complete")) {
        status = "COMPLETED";
      }
    }

    // Parse genres - find the genres section specifically
    // Look for "Genres" label followed by genre badge links
    const tags: Tag[] = [];

    // Find the genres section by looking for the pre-title span containing "Genres"
    $("span.pre-title").each((_, element) => {
      const $label = $(element);
      if ($label.text().includes("Genres")) {
        // Get the parent container and find all genre links after the label
        const $container = $label.closest("div, span, p") || $label.parent();
        $container.find('a[href*="/genre/"].badge').each((_, genreEl) => {
          const $genreLink = $(genreEl);
          const href = $genreLink.attr("href") || "";
          const tag = $genreLink.text().trim();

          // Extract genre ID from URL like /genre/webtoons
          const genreMatch = href.match(/\/genre\/([a-zA-Z0-9-]+)/);
          if (genreMatch && genreMatch[1] && tag) {
            const id = genreMatch[1].toLowerCase();
            if (id && /^[a-zA-Z0-9._\-@()\[\]%?#+=/&:]+$/.test(id)) {
              tags.push({ id: id, title: tag });
            }
          }
        });
      }
    });

    // Fallback: if no genres found with the above method, try generic genre links
    if (tags.length === 0) {
      $('a[href*="/genre/"].badge').each((_, element) => {
        const $el = $(element);
        const href = $el.attr("href") || "";
        const tag = $el.text().trim();

        const genreMatch = href.match(/\/genre\/([a-zA-Z0-9-]+)/);
        if (genreMatch && genreMatch[1] && tag) {
          const id = genreMatch[1].toLowerCase();
          if (id && /^[a-zA-Z0-9._\-@()\[\]%?#+=/&:]+$/.test(id)) {
            tags.push({ id: id, title: tag });
          }
        }
      });
    }

    return {
      mangaId: mangaId,
      mangaInfo: {
        primaryTitle: title,
        secondaryTitles: [],
        thumbnailUrl: image,
        status: status as "ONGOING" | "COMPLETED",
        artist: "Unknown",
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

    // Find the Chapter List section first
    let $chapterContainer: any = null;
    $("p.title").each((_, element) => {
      const $title = $(element);
      if ($title.text().includes("Chapter List")) {
        // Found the chapter list title, get its container
        $chapterContainer = $title.closest("div") || $title.parent();
      }
    });

    // If we found the chapter container, search within it; otherwise search the whole page
    const $searchArea = $chapterContainer && $chapterContainer.length ? $chapterContainer : $;

    // VyManga uses .list-chapter class for chapter links with redirect URLs
    $searchArea.find("a.list-chapter").each((index: number, element: any) => {
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
    // The chapterId contains the redirect URL
    // Try view=0 parameter to load all images at once (0 = horizontal/all at once view)
    let url = chapter.chapterId;
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}view=0`;

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    const pages: string[] = [];
    const seenPages = new Set<string>();

    // When view=horizontal is used, images should load all at once
    // First priority: img.lozad with data-src (lazy-load image URLs)
    $("img.lozad").each((_, element) => {
      const src = ($(element).attr("data-src") || $(element).attr("src") || "").trim();
      if (src && src.startsWith("http") && !seenPages.has(src)) {
        pages.push(src);
        seenPages.add(src);
      }
    });

    // Fallback: if no lozad images found, try all images - but filter intelligently
    if (pages.length === 0) {
      $("img").each((_, element) => {
        const src = ($(element).attr("data-src") || $(element).attr("src") || "").trim();

        // Skip small/ui images
        if (
          !src ||
          src.includes("icon") ||
          src.includes("logo") ||
          src.includes("loading") ||
          src.includes("avatar") ||
          src.includes("user") ||
          src.includes("small")
        ) {
          return;
        }

        if (src.startsWith("http") && !seenPages.has(src)) {
          pages.push(src);
          seenPages.add(src);
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
