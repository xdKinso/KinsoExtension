import {
  BasicRateLimiter,
  CloudflareError,
  ContentRating,
  CookieStorageInterceptor,
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
  type SearchFilter,
  type SearchQuery,
  type SearchResultItem,
  type SearchResultsProviding,
  type SourceManga,
  type Tag,
  type Cookie,
} from "@paperback/types";
import * as cheerio from "cheerio";
import { type CheerioAPI } from "cheerio";
import { type Metadata } from "./models";

const DOMAIN = "https://theblank.net";
const ITEMS_PER_PAGE = 10;
const FORCE_CF_BYPASS = false; // Set to true to debug Cloudflare bypass

class TheBlankImageInterceptor extends PaperbackInterceptor {
  constructor(
    interceptorId: string,
    private getUserAgent: () => Promise<string>,
  ) {
    super(interceptorId);
  }

  override async interceptRequest(request: Request): Promise<Request> {
    const isImageRequest = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(request.url);
    if (!isImageRequest) return request;
    request.headers = {
      ...request.headers,
      referer: `${DOMAIN}/`,
      origin: DOMAIN,
      "user-agent": await this.getUserAgent(),
      accept: "image/webp,image/apng,image/*,*/*;q=0.8",
    };
    return request;
  }

  override async interceptResponse(
    _request: Request,
    _response: any,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    return data;
  }
}

class TheBlankRequestLoggerInterceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
    if (request.url.includes("theblank.net")) {
      const cookieNames = request.cookies ? Object.keys(request.cookies) : [];
      const headerCookie = request.headers?.cookie ?? "(none)";
      console.log(
        `[TheBlank] Outgoing cookies for ${request.url}: ${
          cookieNames.length ? cookieNames.join(", ") : "(none)"
        }`,
      );
      console.log(`[TheBlank] Outgoing cookie header for ${request.url}: ${headerCookie}`);
    }
    return request;
  }

  override async interceptResponse(
    _request: Request,
    _response: any,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    return data;
  }
}

type TheBlankImplementation = Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding &
  CloudflareBypassRequestProviding;

export class TheBlankExtension implements TheBlankImplementation {
  private cookieStorageInterceptor = new CookieStorageInterceptor({
    storage: "stateManager",
  });
  private requestLoggerInterceptor = new TheBlankRequestLoggerInterceptor(
    "theblank-request-logger",
  );
  private imageInterceptor = new TheBlankImageInterceptor(
    "theblank-images",
    this.getUserAgent.bind(this),
  );
  private lastCloudflareUrl: string | undefined;
  private cachedUserAgent: string | undefined;

  rateLimiter = new BasicRateLimiter("rateLimiter", {
    numberOfRequests: 3,
    bufferInterval: 5,
    ignoreImages: true,
  });

  async initialise(): Promise<void> {
    this.cookieStorageInterceptor.registerInterceptor();
    this.requestLoggerInterceptor.registerInterceptor();
    this.imageInterceptor.registerInterceptor();
    this.rateLimiter.registerInterceptor();
  }

  // --- Request helpers ---

  private absolutizeUrl(url: string): string {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("//")) return `https:${url}`;
    if (url.startsWith("/")) return `${DOMAIN}${url}`;
    return `${DOMAIN}/${url}`;
  }

  private async makeRequest(url: string): Promise<Request> {
    const ua = await this.getUserAgent();
    return {
      url,
      method: "GET",
      headers: {
        "user-agent": ua,
        referer: DOMAIN,
        origin: DOMAIN,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
      },
    };
  }

  private normalizeImageUrl(url: string): string {
    let cleaned = (url || "").trim();
    while (cleaned && /[)\]},'"]$/.test(cleaned)) {
      cleaned = cleaned.slice(0, -1);
    }
    const absolute = this.absolutizeUrl(cleaned);
    return absolute || "";
  }

  private hasClearanceCookie(): boolean {
    const cookies: readonly Cookie[] = this.cookieStorageInterceptor?.cookies ?? [];
    return cookies.some((cookie) => (cookie.name || "").toLowerCase() === "cf_clearance");
  }

  private async getUserAgent(): Promise<string> {
    if (!this.cachedUserAgent) {
      this.cachedUserAgent = await Application.getDefaultUserAgent();
    }
    return this.cachedUserAgent;
  }

  private hasCookie(name: string): boolean {
    const target = name.toLowerCase();
    return (this.cookieStorageInterceptor?.cookies ?? []).some(
      (cookie) => (cookie.name || "").toLowerCase() === target,
    );
  }

  private async ensureAntiBotCookies(targetUrl: string): Promise<void> {
    if (this.hasCookie("asgfp2")) return;
    try {
      const seedRequest = await this.makeRequest(DOMAIN);
      const [response] = await Application.scheduleRequest(seedRequest);
      const responseCookieNames = response.cookies
        .map((cookie) => cookie.name)
        .filter(Boolean)
        .join(", ");
      console.log(
        `[TheBlank] Seed request for antibot cookies returned ${response.status}${
          responseCookieNames ? ` (set: ${responseCookieNames})` : ""
        }`,
      );
      if (this.hasCookie("asgfp2")) return;
    } catch (error) {
      console.log(`[TheBlank] Seed request failed: ${String(error)}`);
    }

    // If we still don't have the antibot cookie, trigger a WebView bypass.
    this.lastCloudflareUrl = targetUrl;
    throw new CloudflareError({ url: targetUrl, method: "GET" }, "Missing antibot cookie (asgfp2)");
  }

  private parseChapterInfo(
    rawTitle: string,
    fallbackNumber: number | string | undefined,
  ): { chapNum: number; title: string } {
    const cleanedRaw = (rawTitle || "").replace(/\s+/g, " ").trim();
    const cleaned = cleanedRaw.replace(/^\s*vol\.?\s*[^,]+,\s*/i, "");
    const chapterMatch = cleaned.match(/chapter\s+(\d+(\.\d+)?)(?:\s*[-:]\s*(.*))?/i);
    const chMatch = cleaned.match(/ch\.?\s*(\d+(\.\d+)?)(?:\s*[-:]\s*(.*))?/i);
    const picked = chapterMatch ?? chMatch;

    let chapNum = 0;
    if (picked?.[1]) chapNum = parseFloat(picked[1]);
    else if (fallbackNumber !== undefined) {
      const parsed = parseFloat(String(fallbackNumber));
      chapNum = Number.isNaN(parsed) ? 0 : parsed;
    }

    if (picked?.[1]) {
      const extra = picked?.[3]?.trim();
      return {
        chapNum,
        title: extra ? `Chapter ${picked[1]} - ${extra}` : `Chapter ${picked[1]}`,
      };
    }

    if (cleaned) {
      return { chapNum, title: cleaned };
    }

    return { chapNum, title: `Chapter ${chapNum || "?"}` };
  }

  private decodeHtmlEntities(input: string): string {
    return input
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&");
  }

  private extractDataPage($: CheerioAPI): any | null {
    const tryParse = (value: string | undefined): any | null => {
      if (!value) return null;
      try {
        const decoded = this.decodeHtmlEntities(value);
        return JSON.parse(decoded);
      } catch {
        return null;
      }
    };

    const attrValue = $("#app").attr("data-page");
    const parsedAttr = tryParse(attrValue);
    if (parsedAttr) return parsedAttr;

    const html = $.html();
    const doubleMatch = html.match(/id="app"[^>]*data-page="([^"]+)"/);
    if (doubleMatch?.[1]) {
      const parsed = tryParse(doubleMatch[1]);
      if (parsed) return parsed;
    }

    const singleMatch = html.match(/id="app"[^>]*data-page='([^']+)'/);
    if (singleMatch?.[1]) {
      const parsed = tryParse(singleMatch[1]);
      if (parsed) return parsed;
    }

    return null;
  }

  private async fetchPageData(url: string): Promise<{ props: any | null; $: CheerioAPI | null }> {
    await this.ensureAntiBotCookies(url);
    if (FORCE_CF_BYPASS) {
      this.lastCloudflareUrl = url;
      throw new CloudflareError({ url, method: "GET" }, "Forced Cloudflare bypass (debug)");
    }
    const request = await this.makeRequest(url);
    const cookieNames = (this.cookieStorageInterceptor?.cookies ?? [])
      .map((cookie) => cookie.name)
      .filter(Boolean)
      .join(", ");
    console.log(
      `[TheBlank] Requesting ${url} with cookies${cookieNames ? `: ${cookieNames}` : ""}`,
    );
    const [response, data] = await Application.scheduleRequest(request);
    const raw = Application.arrayBufferToUTF8String(data).trim();

    const looksLikeChallenge =
      raw.includes("cf-browser-verification") ||
      raw.includes("challenge-platform") ||
      raw.toLowerCase().includes("just a moment");

    if (response.status === 403 || response.status === 503 || looksLikeChallenge) {
      this.lastCloudflareUrl = request.url;
      console.log(
        `[TheBlank] Cloudflare challenge detected (${response.status}) for ${request.url}`,
      );
      throw new CloudflareError(
        {
          url: request.url,
          method: "GET",
        },
        `Cloudflare protection encountered (${response.status})`,
      );
    }

    if (raw.startsWith("{") || raw.startsWith("[")) {
      try {
        const parsed = JSON.parse(raw);
        const props = parsed?.props ?? parsed?.page?.props ?? parsed?.data?.props ?? parsed;
        return { props, $: null };
      } catch {
        // Fall through to HTML parsing
      }
    }

    const $ = cheerio.load(raw);
    const dataPage = this.extractDataPage($);
    return { props: dataPage?.props ?? null, $ };
  }

  private async fetchCheerio(urlOrRequest: string | Request): Promise<CheerioAPI> {
    const request =
      typeof urlOrRequest === "string" ? await this.makeRequest(urlOrRequest) : urlOrRequest;

    await this.ensureAntiBotCookies(request.url);
    if (FORCE_CF_BYPASS) {
      this.lastCloudflareUrl = request.url;
      throw new CloudflareError(
        { url: request.url, method: "GET" },
        "Forced Cloudflare bypass (debug)",
      );
    }
    const cookieNames = (this.cookieStorageInterceptor?.cookies ?? [])
      .map((cookie) => cookie.name)
      .filter(Boolean)
      .join(", ");
    console.log(
      `[TheBlank] Requesting ${request.url} with cookies${cookieNames ? `: ${cookieNames}` : ""}`,
    );
    const [response, data] = await Application.scheduleRequest(request);
    const html = Application.arrayBufferToUTF8String(data);

    // Detect Cloudflare by status OR common challenge markup (sometimes served with 200)
    const looksLikeChallenge =
      html.includes("cf-browser-verification") ||
      html.includes("challenge-platform") ||
      html.toLowerCase().includes("just a moment");

    if (response.status === 403 || response.status === 503 || looksLikeChallenge) {
      this.lastCloudflareUrl = request.url;
      console.log(
        `[TheBlank] Cloudflare challenge detected (${response.status}) for ${request.url}`,
      );
      // Throw with the same request headers (important for CF fingerprint consistency)
      throw new CloudflareError(
        {
          url: request.url,
          method: "GET",
        },
        `Cloudflare protection encountered (${response.status})`,
      );
    }

    return cheerio.load(html);
  }

  // --- Paperback interfaces ---

  async getSearchFilters(): Promise<SearchFilter[]> {
    // TheBlank search is JS/AJAX-based, not supported via direct HTTP.
    return [];
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
    const page = metadata?.page ?? 1;

    const { props, $ } = await this.fetchPageData(DOMAIN);
    if (props?.trendingSerie && section.id === "trending") {
      for (const entry of props.trendingSerie) {
        const mangaId = this.resolveMangaIdFromEntry(entry);
        if (!mangaId || !entry.title) continue;
        const imageUrl = this.normalizeImageUrl(entry.image || "");
        items.push({
          type: "prominentCarouselItem",
          mangaId,
          title: entry.title,
          imageUrl,
        });
      }
    } else if (props?.newSerie && section.id === "new-series") {
      for (const entry of props.newSerie) {
        const mangaId = this.resolveMangaIdFromEntry(entry);
        if (!mangaId || !entry.title) continue;
        const imageUrl = this.normalizeImageUrl(entry.image || "");
        items.push({
          type: "simpleCarouselItem",
          mangaId,
          title: entry.title,
          imageUrl,
        });
      }
    } else if (props?.latestChapters?.data && section.id === "last-chapters") {
      for (const entry of props.latestChapters.data) {
        const mangaId = this.resolveMangaIdFromEntry(entry);
        const chapter = entry.chapters?.[0];
        if (!mangaId || !entry.title || !chapter?.slug) continue;
        const imageUrl = this.normalizeImageUrl(entry.image || "");
        items.push({
          type: "chapterUpdatesCarouselItem",
          mangaId,
          title: entry.title,
          imageUrl,
          chapterId: chapter.slug,
        });
      }
    } else if (section.id === "trending") {
      $?.("section").each((_, sectionElem) => {
        const $section = $(sectionElem);
        const label = $section.find("label").first().text().trim().toLowerCase();
        if (label === "trending") {
          $section.find("a[href^='/serie/']").each((_, elem) => {
            const $elem = $(elem);
            const href = $elem.attr("href");
            const $img = $elem.find("img");
            const title = $img.attr("alt")?.trim() || $elem.find("span").last().text().trim();
            const imageUrl = this.normalizeImageUrl(
              $img.attr("data-src") || $img.attr("src") || "",
            );

            if (!href || !title) return;

            const mangaId = this.extractMangaId(href);
            if (!mangaId) return;

            items.push({
              type: "prominentCarouselItem",
              mangaId,
              title,
              imageUrl,
            });
          });
        }
      });
    } else if (section.id === "new-series") {
      $?.("section").each((_, sectionElem) => {
        const $section = $(sectionElem);
        const label = $section.find("label").first().text().trim().toLowerCase();
        if (label === "new series") {
          $section.find("a[href^='/serie/']").each((_, elem) => {
            const $elem = $(elem);
            const href = $elem.attr("href");
            const $img = $elem.find("img");
            const title = $img.attr("alt")?.trim() || $elem.find("span").last().text().trim();
            const imageUrl = this.normalizeImageUrl(
              $img.attr("data-src") || $img.attr("src") || "",
            );

            if (!href || !title) return;

            const mangaId = this.extractMangaId(href);
            if (!mangaId) return;

            items.push({
              type: "simpleCarouselItem",
              mangaId,
              title,
              imageUrl,
            });
          });
        }
      });
    } else if (section.id === "last-chapters") {
      $?.("section").each((_, sectionElem) => {
        const $section = $(sectionElem);
        const label = $section.find("label").first().text().trim().toLowerCase();
        if (label === "last chapters") {
          $section.find("a[href*='/chapter/']").each((_, elem) => {
            const $elem = $(elem);
            const href = $elem.attr("href");

            const $card = $elem.find("div.flex.items-center");
            const $img = $card.find("img").first();
            const title = $img.attr("alt")?.trim() || $elem.find("span.text-xs").text().trim();
            const imageUrl = this.normalizeImageUrl(
              $img.attr("data-src") || $img.attr("src") || "",
            );

            if (!href || !title) return;

            const match = href.match(/\/serie\/([^/]+)\/chapter\/([^/]+)/);
            if (!match?.[1] || !match?.[2]) return;

            items.push({
              type: "chapterUpdatesCarouselItem",
              mangaId: match[1],
              title,
              imageUrl,
              chapterId: match[2],
            });
          });
        }
      });
    }

    // Pagination
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedItems = items.slice(startIndex, endIndex);
    const hasMorePages = items.length > endIndex;

    return {
      items: paginatedItems,
      metadata: hasMorePages ? { page: page + 1 } : undefined,
    };
  }

  async getSearchResults(
    _query: SearchQuery,
    _metadata: Metadata | undefined,
  ): Promise<PagedResults<SearchResultItem>> {
    // Not supported (JS-driven on the site)
    return {
      items: [],
      metadata: undefined,
    };
  }

  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    const url = `${DOMAIN}/serie/${mangaId}/`;
    const { props, $ } = await this.fetchPageData(url);

    const serie = props?.serie ?? props?.series ?? props?.manga ?? props?.data?.serie ?? null;

    const title =
      serie?.title ||
      serie?.name ||
      serie?.slug?.replace(/-/g, " ") ||
      $?.("meta[property='og:title']").attr("content")?.trim() ||
      $?.("h1").first().text().trim() ||
      $?.("div.text-2xl").text().trim() ||
      mangaId.replace(/-/g, " ");

    const image =
      this.normalizeImageUrl(
        serie?.image ||
          serie?.cover ||
          serie?.thumbnail ||
          $?.("meta[property='og:image']").attr("content") ||
          $?.("img").first().attr("src") ||
          "",
      ) || `${DOMAIN}/theblank.png`;

    const author =
      serie?.author?.name ||
      serie?.author?.title ||
      serie?.author ||
      serie?.artist?.name ||
      serie?.artist?.title ||
      serie?.artist ||
      serie?.authors
        ?.map((a: any) => a?.name || a?.title || a)
        .filter(Boolean)
        .join(", ") ||
      $?.("div:contains('Author')").next().text().trim() ||
      "Unknown";

    const description =
      serie?.description ||
      serie?.summary ||
      $?.("meta[property='og:description']").attr("content")?.trim() ||
      $?.("div.text-sm, div.description").first().text().trim() ||
      "";

    let status: "ONGOING" | "COMPLETED" = "ONGOING";
    const statusText =
      (serie?.status || serie?.state || "").toString().toLowerCase() ||
      $?.("div:contains('Status')").next().text().toLowerCase() ||
      "";
    if (statusText.includes("completed") || statusText.includes("complete")) {
      status = "COMPLETED";
    }

    const tags: Tag[] = [];
    const rawTags =
      serie?.genres ||
      serie?.tags ||
      serie?.categories ||
      $?.("a[href*='/genre/']")
        .map((_, elem) => $(elem).text().trim())
        .get() ||
      [];
    const makeTagId = (value: string): string =>
      value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9._\-@()\[\]%?#+=/&:]/g, "");

    for (const rawTag of rawTags as any[]) {
      const tag = typeof rawTag === "string" ? rawTag : rawTag?.name || rawTag?.title;
      if (tag) tags.push({ id: makeTagId(tag), title: tag });
    }

    return {
      mangaId,
      mangaInfo: {
        primaryTitle: title,
        secondaryTitles: [],
        thumbnailUrl: image,
        author,
        artist: author,
        synopsis: description,
        status,
        contentRating: ContentRating.EVERYONE,
        tagGroups: tags.length > 0 ? [{ id: "genres", title: "Genres", tags }] : [],
      },
    };
  }

  async getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
    const url = `${DOMAIN}/serie/${sourceManga.mangaId}/`;
    const { props, $ } = await this.fetchPageData(url);

    const chapterEntries =
      props?.chapters?.data ||
      props?.chapters ||
      props?.serie?.chapters?.data ||
      props?.serie?.chapters ||
      [];

    const chapters: Chapter[] = [];

    if (Array.isArray(chapterEntries) && chapterEntries.length > 0) {
      for (const entry of chapterEntries) {
        const slug = entry?.slug || entry?.id || entry?.chapter_slug;
        if (!slug) continue;
        const chapterId = slug.toString();
        const numberValue =
          entry?.number ||
          entry?.chapter_number ||
          (typeof entry?.chapter === "number" ? entry?.chapter : undefined) ||
          0;
        const rawTitle =
          entry?.chapter_title || entry?.name || entry?.title || entry?.chapter || "";
        const hasDistinctTitle =
          typeof entry?.title === "string" &&
          entry?.title.trim().length > 0 &&
          !/chapter|ch\./i.test(entry?.title);
        const { chapNum, title } = hasDistinctTitle
          ? {
              chapNum:
                typeof numberValue === "number" ? numberValue : parseFloat(numberValue || "0"),
              title: `Chapter ${numberValue || "?"} - ${entry?.title.trim()}`,
            }
          : this.parseChapterInfo(rawTitle.toString(), numberValue);

        chapters.push({
          chapterId,
          sourceManga,
          langCode: "en",
          chapNum,
          title,
          publishDate: undefined,
        });
      }
    } else {
      $?.("a[href*='/chapter/']").each((_, elem) => {
        const $elem = $(elem);
        const href = $elem.attr("href");
        const chapterTitle = $elem.find("span").first().text().trim();

        if (!href) return;

        const chapterId = this.extractChapterId(href);
        if (!chapterId) return;

        const chapterMatch = chapterTitle.match(/chapter\s+(\d+(\.\d+)?)/i);
        const chapNum = chapterMatch && chapterMatch[1] ? parseFloat(chapterMatch[1]) : 0;

        chapters.push({
          chapterId,
          sourceManga,
          langCode: "en",
          chapNum,
          title: chapterTitle || `Chapter ${chapNum || "?"}`,
          publishDate: undefined,
        });
      });
    }

    // Often sites list newest first; reverse to oldest->newest for Paperback
    return chapters.reverse();
  }

  async getImageRequest(url: string): Promise<Request> {
    const ua = await this.getUserAgent();
    return {
      url,
      method: "GET",
      headers: {
        referer: `${DOMAIN}/`,
        origin: DOMAIN,
        "user-agent": ua,
        accept: "image/webp,image/apng,image/*,*/*;q=0.8",
      },
    };
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    const url = `${DOMAIN}/serie/${chapter.sourceManga.mangaId}/chapter/${chapter.chapterId}/`;
    const $ = await this.fetchCheerio(url);

    const pages: string[] = [];

    // More robust: collect all relevant images
    $("img").each((_, elem) => {
      const src = $(elem).attr("src") || $(elem).attr("data-src");
      if (!src) return;

      // Keep your original filter, but loosen it a bit in case CDN changes
      // If you know the exact CDN path, adjust this.
      if (src.includes("mangaid") || src.includes("/storage/") || src.includes("/uploads/")) {
        pages.push(this.normalizeImageUrl(src));
      }
    });

    return {
      id: chapter.chapterId,
      mangaId: chapter.sourceManga.mangaId,
      pages,
    };
  }

  async getCloudflareBypassRequest(): Promise<Request> {
    const url = this.lastCloudflareUrl ?? DOMAIN;
    return await this.makeRequest(url);
  }

  async saveCloudflareBypassCookies(cookies: Cookie[]): Promise<void> {
    // Persist all cookies set during the bypass, not just Cloudflare ones.
    const cookieNames = cookies
      .map((cookie) => cookie.name)
      .filter(Boolean)
      .join(", ");
    console.log(
      `[TheBlank] Saving ${cookies.length} bypass cookies${cookieNames ? `: ${cookieNames}` : ""}`,
    );
    for (const cookie of cookies) {
      const name = cookie.name || "unknown";
      const domain = cookie.domain || "unknown-domain";
      const path = cookie.path || "/";
      const expiresValue = cookie.expires;
      let expires = "session";
      if (typeof expiresValue === "number" && expiresValue > 0) {
        expires = new Date(expiresValue).toISOString();
      } else if (expiresValue instanceof Date) {
        expires = expiresValue.toISOString();
      } else if (expiresValue != null) {
        const asString = String(expiresValue).trim();
        if (asString.length > 0) expires = asString;
      }
      console.log(
        `[TheBlank] Cookie detail: ${name} domain=${domain} path=${path} expires=${expires}`,
      );
    }
    for (const cookie of cookies) {
      this.cookieStorageInterceptor.deleteCookie(cookie);
      this.cookieStorageInterceptor.setCookie(cookie);
    }
    const storedCookies = this.cookieStorageInterceptor.cookies ?? [];
    const storedNames = storedCookies
      .map((cookie) => cookie.name)
      .filter(Boolean)
      .join(", ");
    console.log(
      `[TheBlank] Stored cookies count: ${storedCookies.length}${
        storedNames ? ` (${storedNames})` : ""
      }`,
    );
  }

  // --- URL helpers ---

  private extractMangaId(url: string): string | null {
    if (!url) return null;
    const cleaned = url.split("?")[0]?.split("#")[0] ?? url;
    const match = cleaned.match(/\/(serie|series|manga)\/([^/]+)/i);
    if (match?.[2]) return match[2];

    // If the link is already a slug (no slashes), return it.
    const trimmed = cleaned.replace(/^\/+|\/+$/g, "");
    if (trimmed && !trimmed.includes("/")) return trimmed;

    // Fallback to the last path segment.
    const parts = trimmed.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? null;
  }

  private extractChapterId(url: string): string | null {
    const match = url.match(/\/chapter\/([^/]+)/);
    if (match?.[1]) return match[1];

    const match2 = url.match(/\/([^/]+)\/?$/);
    return match2?.[1] ?? null;
  }

  private resolveMangaIdFromEntry(entry: any): string | null {
    const fromLink = this.extractMangaId(entry?.link || entry?.url || "");
    if (fromLink) return fromLink;
    const fromSlug = entry?.slug || entry?.id || entry?.manga_id;
    if (fromSlug) return String(fromSlug);
    return null;
  }
}

export const TheBlank = new TheBlankExtension();
