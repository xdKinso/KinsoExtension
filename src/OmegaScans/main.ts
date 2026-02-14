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

class OmegaScansImageInterceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    const isImageRequest = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(request.url);
    if (!isImageRequest) return request;
    const referer =
      (Application.getState("omega_last_chapter_url") as string | undefined) ?? `${DOMAIN}/`;
    request.headers = {
      ...request.headers,
      referer,
      origin: DOMAIN,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      accept: "image/webp,image/apng,image/*,*/*;q=0.8",
    };
    return request;
  }

  override async interceptResponse(
    _request: Request,
    _response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    return data;
  }
}

export class OmegaScansExtension implements OmegaScansImplementation {
  interceptor = new OmegaScansInterceptor("interceptor");
  imageInterceptor = new OmegaScansImageInterceptor("omega-images");

  rateLimiter = new BasicRateLimiter("rateLimiter", {
    numberOfRequests: 8,
    bufferInterval: 2,
    ignoreImages: true,
  });

  async initialise(): Promise<void> {
    this.interceptor.registerInterceptor();
    this.imageInterceptor.registerInterceptor();
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
      statusText.includes("completed") || statusText.includes("complete") ? "COMPLETED" : "ONGOING";

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

    const chapters: Chapter[] = [];
    const pending: { chapter: Chapter; isNumbered: boolean }[] = [];
    let sortingIndex = chapterData.length;

    for (const chapter of chapterData) {
      if (chapter.price != null && chapter.price > 0) {
        continue;
      }

      const chapterNum = this.parseChapterNumber(chapter.chapter_name, chapter.chapter_slug);
      const isNumbered = /^chapter\s*\d+/i.test(chapter.chapter_name);
      const title =
        !isNumbered && chapter.chapter_title
          ? `${chapter.chapter_name} - ${chapter.chapter_title}`
          : chapter.chapter_name;

      pending.push({
        isNumbered,
        chapter: {
          chapterId: chapter.chapter_slug,
          sourceManga: sourceManga,
          langCode: "en",
          chapNum: chapterNum,
          volume: 0,
          title: title,
          publishDate: chapter.created_at ? new Date(chapter.created_at) : new Date(),
          sortingIndex,
        },
      });
      sortingIndex--;
    }

    // Assign chapter numbers to non-numbered entries based on neighbors in display order.
    // Rule: For multiple specials between two numbered chapters, use sequential decimals.
    for (let i = 0; i < pending.length; i++) {
      const entry = pending[i]!;
      if (entry.isNumbered) {
        chapters.push(entry.chapter);
        continue;
      }

      let prevNum: number | null = null;
      let nextNum: number | null = null;
      let specialsSincePrev = 0;

      for (let p = i - 1; p >= 0; p--) {
        const prev = pending[p]!;
        if (prev.isNumbered && prev.chapter.chapNum != null) {
          prevNum = prev.chapter.chapNum ?? null;
          break;
        }
        if (!prev.isNumbered) {
          specialsSincePrev++;
        }
      }

      for (let n = i + 1; n < pending.length; n++) {
        const next = pending[n]!;
        if (next.isNumbered && next.chapter.chapNum != null) {
          nextNum = next.chapter.chapNum ?? null;
          break;
        }
      }

      if (prevNum != null && nextNum != null) {
        // e.g., between 73 and 74: 73.1, 73.2, 73.3...
        entry.chapter.chapNum = prevNum + (specialsSincePrev + 1) / 10;
      } else if (prevNum != null) {
        entry.chapter.chapNum = prevNum + (specialsSincePrev + 1) / 10;
      } else if (nextNum != null) {
        // If no previous numbered chapter, place before the next one.
        entry.chapter.chapNum = nextNum - (specialsSincePrev + 1) / 10;
      } else {
        entry.chapter.chapNum = 0;
      }

      chapters.push(entry.chapter);
    }

    return chapters;
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    const chapterUrl = `${DOMAIN}/series/${chapter.sourceManga.mangaId}/${chapter.chapterId}`;
    Application.setState(chapterUrl, "omega_last_chapter_url");
    const request: Request = {
      url: chapterUrl,
      method: "GET",
      headers: {},
    };

    const rscRequest = {
      ...request,
      headers: {
        ...request.headers,
        RSC: "1",
        Accept: "text/x-component",
      },
    };
    const [_rscResponse, rscData] = await Application.scheduleRequest(rscRequest);
    let rscHtml = Application.arrayBufferToUTF8String(rscData);
    let pageUrls = this.extractPageUrls(rscHtml, chapter.sourceManga.mangaId);

    const uploadPaths = this.extractUploadPaths(rscHtml);
    const firstUploadPath = uploadPaths[0];
    if (firstUploadPath) {
      const uploadBase = await this.resolveUploadBase(firstUploadPath, chapterUrl);
      const uploadUrls = this.buildUploadUrls(uploadPaths, uploadBase);
      pageUrls = this.mergePageUrls(pageUrls, uploadUrls, uploadBase);
    }

    if (pageUrls.length === 0) {
      const [_response, data] = await Application.scheduleRequest(request);
      const html = Application.arrayBufferToUTF8String(data);
      pageUrls = this.extractPageUrls(html, chapter.sourceManga.mangaId);
      const htmlUploadPaths = this.extractUploadPaths(html);
      const firstHtmlUploadPath = htmlUploadPaths[0];
      if (firstHtmlUploadPath) {
        const uploadBase = await this.resolveUploadBase(firstHtmlUploadPath, chapterUrl);
        const uploadUrls = this.buildUploadUrls(htmlUploadPaths, uploadBase);
        pageUrls = this.mergePageUrls(pageUrls, uploadUrls, uploadBase);
      }
    }

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
    const direct: string[] = html.match(/https:\/\/media\.omegascans\.org\/[^\s"\\]+/g) || [];
    const directQuoted: string[] = html.match(/https:\/\/media\.omegascans\.org\/[^"\\]+/g) || [];
    const escaped: string[] = html.match(/https:\\\/\\\/media\.omegascans\.org\\\/[^"\\]+/g) || [];
    const partial: string[] = html.match(/media\.omegascans\.org\/[^\s"\\]+/g) || [];
    const uploadsOnly: string[] = html.match(/uploads\/series\/[^\s"\\]+/g) || [];
    const uploadsQuoted: string[] = html.match(/uploads\/series\/[^"\\]+/g) || [];

    const matches: string[] = direct.concat(
      directQuoted,
      escaped,
      partial,
      uploadsOnly,
      uploadsQuoted,
    );
    const normalized = matches.map((url) => url.replace(/\\\//g, "/").replace(/\\+/g, ""));

    const baseMatch = normalized
      .find((url) => url.includes("media.omegascans.org/file/"))
      ?.match(/https:\/\/media\.omegascans\.org\/file\/[^/]+\//);
    const mediaBase = baseMatch?.[0] ?? "https://media.omegascans.org/file/zFSsXt/";

    const expanded = normalized.map((url) => {
      let cleaned = url;
      if (cleaned.startsWith("https://uploads/")) {
        cleaned = cleaned.replace("https://uploads/", "uploads/");
      }

      if (cleaned.startsWith("uploads/series/")) {
        return `${mediaBase}${cleaned}`;
      }

      if (cleaned.startsWith("media.omegascans.org/")) {
        return `https://${cleaned}`;
      }

      return cleaned;
    });

    const uploads = expanded.filter((url) => url.includes("/uploads/"));
    const slugged = uploads.filter((url) => url.includes(`/uploads/series/${seriesSlug}/`));
    const filtered = slugged.length > 0 ? slugged : uploads.length > 0 ? uploads : expanded;

    const withExtensions = filtered.filter((url) =>
      /\.(jpe?g|png|webp)$/i.test(url.split("?")[0] ?? ""),
    );

    const unique = Array.from(new Set(withExtensions.map((url) => encodeURI(url))));
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

  private extractUploadPaths(html: string): string[] {
    const uploads: string[] = html.match(/uploads\/series\/[^\s"\\]+/g) ?? [];
    const uploadsQuoted: string[] = html.match(/uploads\/series\/[^"\\]+/g) ?? [];
    return Array.from(new Set(uploads.concat(uploadsQuoted)));
  }

  private buildUploadUrls(paths: string[], base: string): string[] {
    const urls = paths.flatMap((p) => {
      const encoded = encodeURI(p);
      if (/\.(jpe?g|png|webp)$/i.test(p)) {
        return [`${base}${encoded}`];
      }
      return [
        `${base}${encodeURI(`${p}.jpg`)}`,
        `${base}${encodeURI(`${p}.png`)}`,
        `${base}${encodeURI(`${p}.webp`)}`,
      ];
    });
    const unique = Array.from(new Set(urls));
    unique.sort((a, b) => {
      const aNum = this.extractPageNumber(a);
      const bNum = this.extractPageNumber(b);
      if (aNum == null || bNum == null) return 0;
      return aNum - bNum;
    });
    return unique;
  }

  private mergePageUrls(primary: string[], secondary: string[], preferredBase?: string): string[] {
    const all = [...primary, ...secondary].map((url) => encodeURI(url));
    const chosen = new Map<string, string>();

    const getKey = (url: string): string => {
      const pageNum = this.extractPageNumber(url);
      if (pageNum != null) return `num-${pageNum}`;
      const match = url.match(/\/([^/?#]+)$/);
      return (match?.[1] ?? url).toLowerCase();
    };

    const score = (url: string): number => {
      if (preferredBase && url.startsWith(preferredBase)) return 4;
      let s = 0;
      if (url.startsWith("https://media.omegascans.org/")) s += 3;
      if (url.startsWith(API_DOMAIN)) s -= 1;
      const lowered = url.toLowerCase();
      if (lowered.includes(" copy.") || lowered.includes("%20copy.")) s += 2;
      s += Math.min(url.length, 200) / 200; // tiny preference for longer (more specific) names
      return s;
    };

    for (const url of all) {
      const key = getKey(url);
      const current = chosen.get(key);
      if (!current || score(url) > score(current)) {
        chosen.set(key, url);
      }
    }

    const unique = Array.from(chosen.values());
    unique.sort((a, b) => {
      const aNum = this.extractPageNumber(a);
      const bNum = this.extractPageNumber(b);
      if (aNum == null || bNum == null) return 0;
      return aNum - bNum;
    });
    return unique;
  }

  private async resolveUploadBase(path: string, referer: string): Promise<string> {
    // The site serves chapter pages from the media host; prefer that consistently.
    // This avoids API host 404s seen for some series.
    return "https://media.omegascans.org/file/zFSsXt/";
  }

  private extractPageNumber(url: string): number | null {
    const filenameMatch = url.match(/\/([^/?#]+)$/);
    const filename = filenameMatch?.[1];
    if (!filename) return null;
    const stem = filename.split("?")[0] ?? filename;
    // Prefer a number right before the extension, even with extra words (e.g. "01 copy.jpg")
    const extMatch = stem.match(/(\d+)(?=[^0-9]*\.(?:jpe?g|png|webp|gif)$)/i);
    if (extMatch?.[1]) {
      return parseInt(extMatch[1], 10);
    }
    // Fallback: last number anywhere in the filename
    const anyMatch = stem.match(/(\d+)(?!.*\d)/);
    if (anyMatch?.[1]) {
      return parseInt(anyMatch[1], 10);
    }
    return null;
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
