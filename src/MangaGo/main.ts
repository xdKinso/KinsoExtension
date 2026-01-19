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
        id: "popular",
        title: "Popular Manga",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "yaoi-top5",
        title: "Yaoi Manga Top 5",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "comedy-top5",
        title: "Comedy Manga Top 5",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "shounen-ai-top5",
        title: "Shounen Ai Manga Top 5",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "shoujo-top5",
        title: "Shoujo Manga Top 5",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "yuri-top5",
        title: "Yuri Manga Top 5",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "josei-top5",
        title: "Josei Manga Top 5",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "fantasy-top5",
        title: "Fantasy Manga Top 5",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "school-life-top5",
        title: "School Life Manga Top 5",
        type: DiscoverSectionType.simpleCarousel,
      },
    ];
  }

  async getDiscoverSectionItems(
    section: DiscoverSection,
    metadata: Metadata | undefined,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    const request = {
      url: DOMAIN,
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
      // New chapters from li.updateli items
      $("li.updateli").each((_, element) => {
        const $li = $(element);

        // Find the manga link and image
        const $link = $li.find("a.thm-effect").first();
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
    } else if (section.id === "popular" || section.id.endsWith("-top5")) {
      // Popular manga and genre top 5s from div#top_genres
      const $container = $("div#top_genres");

      // Map section IDs to genre names for filtering
      const genreMap: Record<string, string> = {
        popular: "", // Popular doesn't need filtering
        "yaoi-top5": "Yaoi",
        "comedy-top5": "Comedy",
        "shounen-ai-top5": "Shounen Ai",
        "shoujo-top5": "Shoujo",
        "yuri-top5": "Yuri",
        "josei-top5": "Josei",
        "fantasy-top5": "Fantasy",
        "school-life-top5": "School Life",
      };

      const targetGenre = genreMap[section.id] || "";
      let $items;

      if (section.id === "popular") {
        // For popular, get items from div.row_2 with div.left_listimg
        $items = $("div.row_2:has(div.left_listimg)");
      } else if (targetGenre) {
        // For genre top 5s, find the section with matching genre title
        const $genreSection = $container
          .find("li.li_title")
          .filter((_, el) => {
            const text = $(el).text().trim();
            return text.toLowerCase().includes(targetGenre.toLowerCase());
          })
          .parent()
          .first();

        $items = $genreSection.find("div.flexl_listitem");
      } else {
        // Fallback to empty selection
        $items = $("").find("div.flexl_listitem");
      }

      $items.each((_, element) => {
        const $item = $(element);
        const $link = $item.find("div.left_listimg a.thm-effect").first();
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
