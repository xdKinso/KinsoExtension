import {
  BasicRateLimiter,
  ContentRating,
  DiscoverSectionType,
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
import { MangaGoInterceptor } from "./interceptors";

const DOMAIN = "https://mangago.me";

type MangaGoImplementation = Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding;

export class MangaGoExtension implements MangaGoImplementation {
  interceptor = new MangaGoInterceptor("interceptor");

  rateLimiter = new BasicRateLimiter("rateLimiter", {
    numberOfRequests: 10,
    bufferInterval: 2,
    ignoreImages: false,
  });

  async initialise(): Promise<void> {
    this.rateLimiter.registerInterceptor();
    this.interceptor.registerInterceptor();
  }

  async fetchCheerio(request: Request): Promise<CheerioAPI> {
    const [_response, data] = await Application.scheduleRequest(request);
    return cheerio.load(Application.arrayBufferToUTF8String(data));
  }

  getMangaShareUrl(mangaId: string): string {
    return `${DOMAIN}/read-manga/${mangaId}`;
  }

  private extractMangaId(href: string): string {
    const match = href.match(/\/read-manga\/([^/?]+)/);
    return match?.[1] ?? "";
  }

  private extractAuthor($: CheerioAPI): string {
    const $authorLink = $('a[href*="/author/"]').first();
    if ($authorLink.length) {
      return $authorLink.text().trim();
    }
    return "Unknown";
  }

  private extractStatus($: CheerioAPI): "ONGOING" | "COMPLETED" {
    const statusText = $(".status, .manga-status, span.badge").text().toLowerCase();
    if (statusText.includes("completed") || statusText.includes("complete")) {
      return "COMPLETED";
    }
    return "ONGOING";
  }

  private extractGenres($: CheerioAPI): Tag[] {
    const tags: Tag[] = [];

    $('a[href*="/genre/"]').each((_, element) => {
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

    return tags;
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
        id: "featured",
        title: "Featured Manga",
        type: DiscoverSectionType.prominentCarousel,
      },
      {
        id: "new-chapters",
        title: "New Chapters",
        type: DiscoverSectionType.chapterUpdates,
      },
      {
        id: "popular-random",
        title: "Random Day's Top",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "popular-yesterday",
        title: "Yesterday's Top",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "popular-week",
        title: "Week's Top",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "popular-month",
        title: "Month's Top",
        type: DiscoverSectionType.simpleCarousel,
      },
    ];
  }

  async getDiscoverSectionItems(
    section: DiscoverSection,
    metadata: Metadata | undefined,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    let url = DOMAIN;

    if (section.id === "new-chapters") {
      url = `${DOMAIN}/list/latest/all/1/`;
    } else if (section.id.startsWith("popular-")) {
      url = `${DOMAIN}/topmanga/`;
    }

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    const items: DiscoverSectionItem[] = [];
    const seenIds = new Set<string>();

    // Select container and parsing strategy based on section
    if (section.id === "featured") {
      // Featured manga from div#recommand
      const $container = $("div#recommand");
      $container.find("a[href*='/read-manga/']").each((_, element) => {
        const $link = $(element);
        const href = $link.attr("href") || "";
        const mangaId = this.extractMangaId(href);
        if (!mangaId || seenIds.has(mangaId)) return;

        const $img = $link.find("img").first();
        if (!$img.length) return;

        let imageUrl =
          $img.attr("src") || $img.attr("data-src") || $img.attr("data-original") || "";
        let title = $img.attr("alt") || $img.attr("title") || $link.text().trim();
        title = title.replace(" manga", "").trim();

        if (!title || !imageUrl) return;

        seenIds.add(mangaId);
        items.push({
          type: "prominentCarouselItem",
          mangaId: mangaId,
          title: title,
          imageUrl: imageUrl,
        });
      });
    } else if (section.id === "new-chapters") {
      // New chapters from https://www.mangago.me/list/latest/all/1/
      $("li").each((_, element) => {
        const $li = $(element);
        const $link = $li.find("div.box div.left a.thm-effect").first();
        const href = $link.attr("href") || "";
        const mangaId = this.extractMangaId(href);
        if (!mangaId || seenIds.has(mangaId)) return;

        const $img = $link.find("img").first();
        if (!$img.length) return;

        let imageUrl =
          $img.attr("src") || $img.attr("data-src") || $img.attr("data-original") || "";
        let title = $img.attr("alt") || $img.attr("title") || $link.attr("title") || "";
        title = title.replace(" manga", "").trim();

        if (!title || !imageUrl) return;

        seenIds.add(mangaId);
        items.push({
          type: "simpleCarouselItem",
          mangaId: mangaId,
          title: title,
          imageUrl: imageUrl,
        });
      });
    } else if (section.id.startsWith("popular-")) {
      // Popular manga subsections from https://www.mangago.me/topmanga/
      const sectionMap: Record<string, number> = {
        "popular-random": 1,
        "popular-yesterday": 2,
        "popular-week": 3,
        "popular-month": 4,
      };

      const sectionIndex = sectionMap[section.id] || 1;
      const $sections = $("div.left");

      // Get the nth section
      let currentSection = 0;
      $sections.each((_, element) => {
        currentSection++;
        if (currentSection !== sectionIndex) return;

        // Parse items in this section
        const $container = $(element);
        $container.find("div.row-1, div.row-2").each((_, rowElement) => {
          const $row = $(rowElement);
          const $link = $row.find("a.thm-effect").first();
          const href = $link.attr("href") || "";
          const mangaId = this.extractMangaId(href);
          if (!mangaId || seenIds.has(mangaId)) return;

          const $img = $link.find("img").first();
          if (!$img.length) return;

          let imageUrl =
            $img.attr("src") || $img.attr("data-src") || $img.attr("data-original") || "";
          let title = $img.attr("alt") || $img.attr("title") || $link.attr("title") || "";
          title = title.replace(" manga", "").trim();

          if (!title || !imageUrl) return;

          seenIds.add(mangaId);
          items.push({
            type: "simpleCarouselItem",
            mangaId: mangaId,
            title: title,
            imageUrl: imageUrl,
          });
        });
      });
    }

    // All sections are static - no pagination
    return {
      items: items,
      metadata: undefined,
    };
  }

  async getSearchResults(
    query: SearchQuery,
    metadata: Metadata | undefined,
  ): Promise<PagedResults<SearchResultItem>> {
    const page = metadata?.page ?? 1;
    let url = `${DOMAIN}/search?q=${encodeURIComponent(query.title || "")}`;

    if (query.filters && query.filters.length > 0) {
      for (const filter of query.filters) {
        if (filter.value) {
          url += `&genre[]=${String(filter.value)}`;
        }
      }
    }

    url += `&page=${page}`;

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    const items: SearchResultItem[] = [];
    const seenIds = new Set<string>();

    $("a[href*='/read-manga/']").each((_, element) => {
      const $link = $(element);
      const href = $link.attr("href") || "";
      const mangaId = this.extractMangaId(href);

      if (!mangaId || seenIds.has(mangaId)) return;

      const $img = $link.find("img.showdesc, img").first();
      let imageUrl = $img.attr("src") || $img.attr("data-src") || "";
      let title = $link.attr("alt") || $img.attr("alt") || $link.text().trim();

      // Clean up title
      title = title.replace(" manga", "").trim();

      if (!title || !imageUrl) return;

      seenIds.add(mangaId);
      items.push({
        mangaId: mangaId,
        title: title,
        imageUrl: imageUrl,
        subtitle: undefined,
      });
    });

    return {
      items: items,
      metadata: { page: page + 1 },
    };
  }

  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    const request = {
      url: `${DOMAIN}/read-manga/${mangaId}`,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);

    const title = $("h1, h2").first().text().trim() || mangaId;
    const imageUrl = $("img[src*='cover'], img.manga_cover").first().attr("src") || "";
    const description = $(".manga_summary, .description, p").first().text().trim() || "";
    const author = this.extractAuthor($);
    const status = this.extractStatus($);
    const tags = this.extractGenres($);

    return {
      mangaId: mangaId,
      mangaInfo: {
        primaryTitle: title,
        secondaryTitles: [],
        thumbnailUrl: imageUrl,
        status: status,
        artist: "",
        author: author,
        contentRating: ContentRating.MATURE,
        synopsis: description,
        tagGroups: tags.length > 0 ? [{ id: "genres", title: "Genres", tags }] : [],
      },
    };
  }

  async getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
    const request = {
      url: `${DOMAIN}/read-manga/${sourceManga.mangaId}`,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    const chapters: Chapter[] = [];

    $("a[href*='/read/']").each((_, element) => {
      const $link = $(element);
      const href = $link.attr("href") || "";
      const chapterMatch = href.match(/\/read\/([^/?]+)/);

      if (!chapterMatch || !chapterMatch[1]) return;

      const chapterId = chapterMatch[1];
      const chapterTitle = $link.text().trim() || `Chapter ${chapterId}`;
      const chapterNumber = parseFloat(chapterTitle.match(/\d+(\.\d+)?/)?.[0] || "0");

      chapters.push({
        chapterId,
        title: chapterTitle,
        sourceManga,
        chapNum: chapterNumber,
        publishDate: new Date(),
        langCode: "en",
        volume: 0,
      });
    });

    return chapters.reverse();
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    const request = {
      url: `${DOMAIN}/read/${chapter.chapNum}`,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    const pages: string[] = [];

    // Extract image URLs from the chapter page
    $("img[src*='image'], img[src*='chapter']").each((_, element) => {
      const imageUrl = $(element).attr("src") || $(element).attr("data-src");
      if (imageUrl && !pages.includes(imageUrl)) {
        pages.push(imageUrl);
      }
    });

    return {
      id: chapter.chapterId,
      mangaId: chapter.sourceManga.mangaId,
      pages: pages,
    };
  }
}

export const MangaGo = new MangaGoExtension();
