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
import { URLBuilder } from "../utils/url-builder/base";
import { type Metadata } from "./models";

const DOMAIN = "https://omegascans.org";
const API_DOMAIN = "https://api.omegascans.org";

interface ApiQueryMeta {
  current_page: number;
  last_page: number;
}

interface ApiQueryResponse<T> {
  meta: ApiQueryMeta;
  data: T[];
}

interface ApiSeriesItem {
  title: string;
  description?: string | null;
  alternative_names?: string | null;
  series_type?: string | null;
  series_slug: string;
  thumbnail?: string | null;
  total_views?: number | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  free_chapters?: {
    chapter_slug: string;
  }[];
}

interface ApiSeriesDetails {
  title: string;
  series_slug: string;
  thumbnail?: string | null;
  description?: string | null;
  status?: string | null;
  author?: string | null;
  studio?: string | null;
  alternative_names?: string | null;
  tags?: {
    id: number;
    name: string;
  }[];
}

interface ApiTag {
  id: number;
  name: string;
}

interface ApiChapter {
  id: number;
  chapter_name: string;
  chapter_slug: string;
  created_at?: string | null;
  chapter_title?: string | null;
  price?: number | null;
}

type OmegaScansImplementation = Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding;

class OmegaScansInterceptor extends PaperbackInterceptor {
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

export class OmegaScansExtension implements OmegaScansImplementation {
  interceptor = new OmegaScansInterceptor("interceptor");

  rateLimiter = new BasicRateLimiter("rateLimiter", {
    numberOfRequests: 8,
    bufferInterval: 2,
    ignoreImages: true,
  });

  async initialise(): Promise<void> {
    this.interceptor.registerInterceptor();
    this.rateLimiter.registerInterceptor();
  }

  async fetchJson<T>(request: Request): Promise<T> {
    const [_response, data] = await Application.scheduleRequest(request);
    return JSON.parse(Application.arrayBufferToUTF8String(data)) as T;
  }

  getMangaShareUrl(mangaId: string): string {
    return `${DOMAIN}/series/${mangaId}/`;
  }

  async getSearchTags(): Promise<TagSection[]> {
    const request = {
      url: `${API_DOMAIN}/tags`,
      method: "GET",
    };

    const tags = await this.fetchJson<ApiTag[]>(request);
    return [
      {
        id: "genres",
        title: "Genres",
        tags: tags.map((tag) => ({
          id: tag.id.toString(),
          title: tag.name,
        })),
      },
    ];
  }

  async getSearchFilters(): Promise<SearchFilter[]> {
    const tags = await this.getSearchTags();
    return tags.map((tag) => ({
      id: tag.id,
      title: tag.title,
      type: "multiselect",
      options: tag.tags.map((x) => ({ id: x.id, value: x.title })),
      allowExclusion: false,
      value: {},
      allowEmptySelection: true,
      maximum: undefined,
    }));
  }

  async getDiscoverSections(): Promise<DiscoverSection[]> {
    return [
      {
        id: "popular",
        title: "Popular",
        type: DiscoverSectionType.prominentCarousel,
      },
      {
        id: "latest",
        title: "Latest Updates",
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

    const orderBy = section.id === "popular" ? "total_views" : "updated_at";
    const order = "desc";
    const queryResponse = await this.querySeries({
      page,
      perPage: 30,
      seriesType: "Comic",
      queryString: "",
      orderBy,
      order,
      status: "All",
      tagIds: [],
    });

    for (const series of queryResponse.data) {
      if (!series.series_slug || !series.title) {
        continue;
      }

      if (section.id === "popular") {
        items.push({
          type: "prominentCarouselItem",
          mangaId: series.series_slug,
          title: series.title,
          imageUrl: series.thumbnail ?? "",
        });
      } else if (section.id === "latest") {
        const chapterId = series.free_chapters?.[0]?.chapter_slug;
        if (!chapterId) {
          continue;
        }
        items.push({
          type: "chapterUpdatesCarouselItem",
          mangaId: series.series_slug,
          title: series.title,
          imageUrl: series.thumbnail ?? "",
          chapterId: chapterId,
        });
      }
    }

    const metadataOut =
      queryResponse.meta.current_page < queryResponse.meta.last_page
        ? { page: page + 1 }
        : undefined;

    return { items, metadata: metadataOut };
  }

  async getSearchResults(
    query: SearchQuery,
    metadata: Metadata | undefined,
  ): Promise<PagedResults<SearchResultItem>> {
    const page = metadata?.page ?? 1;
    const items: SearchResultItem[] = [];

    const includedTags: string[] = [];
    for (const filter of query.filters ?? []) {
      const tags = (filter.value ?? {}) as Record<string, "included" | "excluded">;
      for (const [id, state] of Object.entries(tags)) {
        if (state === "included") {
          includedTags.push(id);
        }
      }
    }

    const queryResponse = await this.querySeries({
      page,
      perPage: 30,
      seriesType: "Comic",
      queryString: query.title ?? "",
      orderBy: "updated_at",
      order: "desc",
      status: "All",
      tagIds: includedTags,
    });

    for (const series of queryResponse.data) {
      if (!series.series_slug || !series.title) {
        continue;
      }
      items.push({
        mangaId: series.series_slug,
        title: series.title,
        imageUrl: series.thumbnail ?? "",
      });
    }

    const metadataOut =
      queryResponse.meta.current_page < queryResponse.meta.last_page
        ? { page: page + 1 }
        : undefined;

    return { items, metadata: metadataOut };
  }

  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    const request = {
      url: `${API_DOMAIN}/series/${mangaId}`,
      method: "GET",
    };
    const series = await this.fetchJson<ApiSeriesDetails>(request);

    const title = series.title?.trim() ?? mangaId;
    const image = series.thumbnail ?? "";
    const author = series.author?.trim() || series.studio?.trim() || "Unknown";
    const description = series.description?.trim() ?? "";
    const statusText = series.status?.toLowerCase() ?? "";
    const status =
      statusText.includes("completed") || statusText.includes("complete")
        ? "COMPLETED"
        : "ONGOING";

    const tags: Tag[] = [];
    for (const tag of series.tags ?? []) {
      if (tag?.name) {
        tags.push({ id: tag.id.toString(), title: tag.name });
      }
    }

    const secondaryTitles: string[] = [];
    if (series.alternative_names) {
      for (const name of series.alternative_names.split(/[,;|]/)) {
        const trimmed = name.trim();
        if (trimmed.length > 0) {
          secondaryTitles.push(trimmed);
        }
      }
    }

    return {
      mangaId: mangaId,
      mangaInfo: {
        primaryTitle: title,
        secondaryTitles: secondaryTitles,
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
    const request = {
      url: `${API_DOMAIN}/chapter/all/${sourceManga.mangaId}`,
      method: "GET",
    };
    const chapterData = await this.fetchJson<ApiChapter[]>(request);

    const chapters: Chapter[] = chapterData
      .filter((chapter) => chapter.price === 0 || chapter.price == null)
      .map((chapter) => {
        const chapterNum = this.parseChapterNumber(chapter.chapter_name, chapter.chapter_slug);
        const title = chapter.chapter_name;

        return {
          chapterId: chapter.chapter_slug,
          sourceManga: sourceManga,
          langCode: "en",
          chapNum: chapterNum,
          volume: 0,
          title: title,
          publishDate: chapter.created_at ? new Date(chapter.created_at) : new Date(),
        };
      })
      .sort((a, b) => (a.chapNum ?? 0) - (b.chapNum ?? 0));

    return chapters;
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    const request = {
      url: `${DOMAIN}/series/${chapter.sourceManga.mangaId}/${chapter.chapterId}`,
      method: "GET",
    };

    const [_response, data] = await Application.scheduleRequest(request);
    const html = Application.arrayBufferToUTF8String(data);
    const pageUrls = this.extractPageUrls(html, chapter.sourceManga.mangaId);

    return {
      id: chapter.chapterId,
      mangaId: chapter.sourceManga.mangaId,
      pages: pageUrls,
    };
  }

  private async querySeries(params: {
    page: number;
    perPage: number;
    seriesType: string;
    queryString: string;
    orderBy: string;
    order: "asc" | "desc";
    status: string;
    tagIds: string[];
  }): Promise<ApiQueryResponse<ApiSeriesItem>> {
    const request = {
      url: new URLBuilder(API_DOMAIN)
        .addPath("query")
        .addQuery("page", params.page.toString())
        .addQuery("perPage", params.perPage.toString())
        .addQuery("series_type", params.seriesType)
        .addQuery("query_string", params.queryString)
        .addQuery("orderBy", params.orderBy)
        .addQuery("adult", "true")
        .addQuery("order", params.order)
        .addQuery("status", params.status)
        .addQuery("tags_ids", `[${params.tagIds.join(",")}]`)
        .build(),
      method: "GET",
    };

    return this.fetchJson<ApiQueryResponse<ApiSeriesItem>>(request);
  }

  private extractPageUrls(html: string, seriesSlug: string): string[] {
    const matches = html.match(/https:\/\/media\.omegascans\.org\/[^\"\\s]+/g) ?? [];
    const filtered = matches
      .map((url) => url.replace(/\\+$/, ""))
      .filter((url) => url.includes(`/uploads/series/${seriesSlug}/`));

    const unique = Array.from(new Set(filtered));
    unique.sort((a, b) => {
      const aNum = this.extractPageNumber(a);
      const bNum = this.extractPageNumber(b);
      if (aNum == null || bNum == null) {
        return 0;
      }
      return aNum - bNum;
    });

    return unique;
  }

  private extractPageNumber(url: string): number | null {
    const match = url.match(/\/(\d+)(?:\.[a-zA-Z0-9]+)?$/);
    if (!match) {
      return null;
    }
    return parseInt(match[1], 10);
  }

  private parseChapterNumber(name: string, slug: string): number {
    const nameMatch = name.match(/(?:chapter|ch\.?)\s*(\d+(?:\.\d+)?)/i);
    if (nameMatch?.[1]) {
      return parseFloat(nameMatch[1]);
    }
    const leadingMatch = name.match(/^(\d+(?:\.\d+)?)/);
    if (leadingMatch?.[1]) {
      return parseFloat(leadingMatch[1]);
    }
    const slugMatch = slug.match(/chapter-(\d+(?:\.\d+)?)/i);
    if (slugMatch?.[1]) {
      return parseFloat(slugMatch[1]);
    }
    return 0;
  }
}

export const OmegaScans = new OmegaScansExtension();
