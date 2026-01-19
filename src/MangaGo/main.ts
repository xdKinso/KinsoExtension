import {
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
import { DOMAIN, MangaGoInterceptor, rateLimiter } from "./network";
import { MangaGoParser } from "./parsers";

type MangaGoImplementation = Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding;

export class MangaGoExtension implements MangaGoImplementation {
  interceptor = new MangaGoInterceptor("interceptor");
  parser = new MangaGoParser();

  async initialise(): Promise<void> {
    rateLimiter.registerInterceptor();
    this.interceptor.registerInterceptor();
  }

  async fetchCheerio(request: Request): Promise<CheerioAPI> {
    const [_response, data] = await Application.scheduleRequest(request);
    return cheerio.load(Application.arrayBufferToUTF8String(data));
  }

  getMangaShareUrl(mangaId: string): string {
    return `${DOMAIN}/read-manga/${mangaId}`;
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
    _metadata: Metadata | undefined,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    let url = DOMAIN;

    if (section.id === "new-chapters") {
      url = `${DOMAIN}/genre/all/1/?f=1&o=1&sortby=update_date&e=`;
    } else if (section.id.startsWith("popular-")) {
      url = `${DOMAIN}/genre/all/1/?f=1&o=1&sortby=view&e=`;
    }

    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    let items: DiscoverSectionItem[] = [];

    if (section.id === "featured") {
      items = this.parser.parseFeaturedManga($);
    } else if (section.id === "new-chapters") {
      items = this.parser.parseNewChapters($);
    } else if (section.id.startsWith("popular-")) {
      const sectionMap: Record<string, number> = {
        "popular-random": 1,
        "popular-yesterday": 2,
        "popular-week": 3,
        "popular-month": 4,
      };
      const sectionIndex = sectionMap[section.id] || 1;
      items = this.parser.parsePopularManga($, sectionIndex);
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
      const mangaId = this.parser.extractMangaId(href);

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
    const author = this.parser.extractAuthor($);
    const status = this.parser.extractStatus($);
    const tags = this.parser.extractGenres($);

    return {
      mangaId: mangaId,
      mangaInfo: {
        primaryTitle: title,
        secondaryTitles: [],
        thumbnailUrl: imageUrl,
        status: status === "Ongoing" ? "ONGOING" : "COMPLETED",
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

    // Try table-based chapter list first (Tachiyomi pattern)
    $("table#chapter_table > tbody > tr, table.uk-table > tbody > tr").each((_, element) => {
      const $row = $(element);
      const $link = $row.find("a.chico").first();
      const href = $link.attr("href") || "";

      if (!href) return;

      const chapterId = href;
      const chapterTitle = $link.text().trim();
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

    // Fallback to any read links if table not found
    if (chapters.length === 0) {
      $("a[href*='/read/']").each((_, element) => {
        const $link = $(element);
        const href = $link.attr("href") || "";

        if (!href) return;

        const chapterId = href;
        const chapterTitle = $link.text().trim() || "Chapter";
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
    }

    return chapters.reverse();
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    const url = chapter.chapterId.includes("http")
      ? chapter.chapterId
      : `${DOMAIN}${chapter.chapterId}`;
    const request = {
      url: url,
      method: "GET",
    };

    const $ = await this.fetchCheerio(request);
    const pages: string[] = [];

    // Extract image URLs from chapter page
    // Note: MangaGo uses encrypted/scrambled images that require JS deobfuscation
    // This is simplified and may not work for all images
    $("img[src*='image'], img[src*='chapter'], img.m").each((_, element) => {
      const $img = $(element);
      const imageUrl = $img.attr("src") || $img.attr("data-src");
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
