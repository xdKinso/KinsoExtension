/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright © 2025 Inkdex */

// TODO:
// - Fix exclude search
// - Add the English name to the title view
// - Add additional info to the title view
// - Make getChapterDetails only return new chapters
// - Add content settings support to search

import {
  BasicRateLimiter,
  ContentRating,
  DiscoverSectionType,
  Form,
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
  type SettingsFormProviding,
  type SourceManga,
  type TagSection,
} from "@paperback/types";
import * as cheerio from "cheerio";
// Extension forms file
import { SettingsForm } from "./forms";
// Extension network file
import { MainInterceptor } from "./network";

const BASE_URL = "https://allmanga.to";
const LIST_URL = `${BASE_URL}/manga?cty=ALL`;
const API_URL = "https://api.allanime.day/api";
const IMAGE_BASE = "https://aln.youtube-anime.com/";
const FALLBACK_IMAGE = `${BASE_URL}/pics/avatar.png`;
const LIST_CACHE_TTL_MS = 5 * 60 * 1000;
const DEFAULT_PAGE_SIZE = 40;

// Should match the capabilities which you defined in pbconfig.ts
type AllMangaImplementation = SettingsFormProviding &
  Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding;

// Main extension class
export class AllMangaExtension implements AllMangaImplementation {
  // Implementation of the main rate limiter
  mainRateLimiter = new BasicRateLimiter("main", {
    numberOfRequests: 15,
    bufferInterval: 10,
    ignoreImages: true,
  });

  // Implementation of the main interceptor
  mainInterceptor = new MainInterceptor("main");

  private cachedUserAgent: string | undefined;
  private listCache:
    | {
        fetchedAt: number;
        sections: Record<string, AllMangaListItem[]>;
        allItems: AllMangaListItem[];
      }
    | undefined;

  // Method from the Extension interface which we implement, initializes the rate limiter, interceptor, discover sections and search filters
  async initialise(): Promise<void> {
    this.mainRateLimiter.registerInterceptor();
    this.mainInterceptor.registerInterceptor();
  }

  // Implements the settings form, check SettingsForm.ts for more info
  async getSettingsForm(): Promise<Form> {
    return new SettingsForm();
  }

  async getDiscoverSections(): Promise<DiscoverSection[]> {
    return [
      {
        id: "latest-updates",
        title: "Latest Updates",
        subtitle: "Latest manga updates",
        type: DiscoverSectionType.featured,
      },
      {
        id: "popular-manga",
        title: "Popular Manga",
        subtitle: "Most read titles",
        type: DiscoverSectionType.prominentCarousel,
      },
      {
        id: "recent-releases",
        title: "Recent Releases",
        subtitle: "Freshly listed titles",
        type: DiscoverSectionType.simpleCarousel,
      },
    ];
  }

  // Populates both the discover sections
  async getDiscoverSectionItems(
    section: DiscoverSection,
    metadata: number | undefined,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    const page = metadata ?? 1;
    if (section.id === "popular-manga") {
      const popularData = await this.fetchMangaDiscover("Popular", page, DEFAULT_PAGE_SIZE);
      return {
        items: popularData.items.map((item) =>
          this.toDiscoverSectionItem(item, "prominentCarouselItem"),
        ),
        metadata: popularData.nextPage,
      };
    }

    const listData = await this.getListData();
    const sectionKey = section.id === "latest-updates" ? "0" : "1";
    const sectionItems = listData.sections[sectionKey] ?? [];
    const { items, nextPage } = this.paginate(sectionItems, page, DEFAULT_PAGE_SIZE);
    const type =
      section.id === "latest-updates" ? "chapterUpdatesCarouselItem" : "simpleCarouselItem";

    return {
      items: items.map((item) => this.toDiscoverSectionItem(item, type)),
      metadata: nextPage,
    };
  }

  // Populate search filters
  async getSearchFilters(): Promise<SearchFilter[]> {
    return [];
  }

  // Populates search
  async getSearchResults(
    query: SearchQuery,
    metadata?: number,
  ): Promise<PagedResults<SearchResultItem>> {
    const page = metadata ?? 1;
    const queryTitle = (query.title ?? "").trim().toLowerCase();
    if (!queryTitle) {
      const listData = await this.getListData();
      const { items, nextPage } = this.paginate(listData.allItems, page, DEFAULT_PAGE_SIZE);
      return {
        items: items.map((item) => this.toSearchResultItem(item)),
        metadata: nextPage,
      };
    }

    const searchData = await this.fetchMangaSearchResults(queryTitle, page, DEFAULT_PAGE_SIZE);
    const items = searchData.items.map((item) => this.toSearchResultItemBase(item));
    return {
      items,
      metadata: searchData.nextPage,
    };
  }

  // Populates the title details
  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    const html = await this.fetchHtml(`${BASE_URL}/manga/${mangaId}`);
    const nuxt = this.parseNuxtPayload(html);
    const manga = nuxt?.fetch?.["manga:0"]?.manga;
    if (!manga) {
      throw new Error("No title with this id exists");
    }

    const genres = this.buildTagSection("genres", "Genres", manga.genres ?? []);
    const tags = this.buildTagSection("tags", "Tags", manga.tags ?? []);
    const contentRating = manga.isAdult ? ContentRating.ADULT : ContentRating.EVERYONE;
    const status = this.mapStatus(String(manga.status ?? ""));
    const synopsis = this.stripHtml(String(manga.description ?? "")).trim() || "No synopsis.";
    const thumb = this.normalizeImageUrl(manga.thumbnail ?? manga.thumbnails?.[0] ?? "");
    const banner = this.normalizeImageUrl(manga.banner ?? "");
    const secondaryTitles = (manga.altNames ?? []).filter(Boolean);
    if (manga.englishName && manga.englishName !== manga.name) {
      secondaryTitles.unshift(manga.englishName);
    }
    if (manga.nativeName) {
      secondaryTitles.unshift(manga.nativeName);
    }

    return {
      mangaId,
      mangaInfo: {
        thumbnailUrl: thumb,
        synopsis,
        primaryTitle: manga.englishName ?? manga.name ?? "Unknown Title",
        secondaryTitles,
        contentRating,
        status,
        author: (manga.authors ?? []).filter(Boolean).join(", "),
        rating: manga.score ?? manga.averageScore ?? undefined,
        tagGroups: [genres, tags],
        artworkUrls: [banner || thumb].filter(Boolean),
        shareUrl: `${BASE_URL}/manga/${mangaId}`,
      },
    };
  }

  // Populates the chapter list
  async getChapters(sourceManga: SourceManga, sinceDate?: Date): Promise<Chapter[]> {
    // Can be used to only return new chapters. Not used here, instead the whole chapter list gets returned
    void sinceDate;

    const html = await this.fetchHtml(`${BASE_URL}/manga/${sourceManga.mangaId}`);
    const nuxt = this.parseNuxtPayload(html);
    const available =
      nuxt?.fetch?.["manga:0"]?.manga?.availableChaptersDetail?.sub ??
      ([] as Array<string | number>);
    if (!available.length) {
      throw new Error("No chapters available for this title");
    }

    const chapterLabels = available.map((chapterString: string | number) => String(chapterString));
    const uploadDates = await this.fetchChapterUploadDates(
      sourceManga.mangaId,
      chapterLabels,
      "sub",
    );

    return chapterLabels.map((chapterLabel: string, index: number) => {
      const chapNum = this.parseChapterNumber(chapterLabel, index + 1);
      const publishDate = uploadDates.get(chapterLabel);
      return {
        chapterId: this.buildChapterId(sourceManga.mangaId, chapterLabel, "sub"),
        sourceManga,
        langCode: "EN",
        chapNum,
        title: `Chapter ${chapterLabel}`,
        publishDate,
      };
    });
  }

  // Populates a chapter with images
  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    const { mangaId, chapterString, translation } = this.parseChapterId(chapter.chapterId);
    const url = `${BASE_URL}/manga/${mangaId}/chapter-${chapterString}-${translation}`;
    const html = await this.fetchHtml(url);
    const nuxt = this.parseNuxtPayload(html);
    const chapterData = nuxt?.fetch?.["chapter:0"];
    if (!chapterData) {
      throw new Error("No chapter with this id exists");
    }

    let pages: string[] = [];
    if (Array.isArray(chapterData.selectedPicturesServer)) {
      pages = chapterData.selectedPicturesServer
        .map((entry: { url?: string }) => this.normalizeImageUrl(entry.url ?? ""))
        .filter(Boolean);
    }

    if (!pages.length && Array.isArray(chapterData.chapters) && chapterData.chapters[0]) {
      const chapterEntry = chapterData.chapters[0];
      const head = this.normalizeImageUrl(chapterEntry.pictureUrlHead ?? IMAGE_BASE);
      pages = (chapterEntry.pictureUrls ?? [])
        .map((entry: { url?: string }) => this.normalizeImageUrl(head + (entry.url ?? "")))
        .filter(Boolean);
    }

    if (!pages.length) {
      throw new Error("No pages found for this chapter");
    }

    return {
      id: chapter.chapterId,
      mangaId,
      pages,
    };
  }

  private async getUserAgent(): Promise<string> {
    if (!this.cachedUserAgent) {
      this.cachedUserAgent = await Application.getDefaultUserAgent();
    }
    return this.cachedUserAgent;
  }

  private async makeRequest(url: string): Promise<Request> {
    const userAgent = await this.getUserAgent();
    return {
      url,
      method: "GET",
      headers: {
        "user-agent": userAgent,
        referer: BASE_URL,
        origin: BASE_URL,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
      },
    };
  }

  private async fetchHtml(url: string): Promise<string> {
    const request = await this.makeRequest(url);
    const [, data] = await Application.scheduleRequest(request);
    return Application.arrayBufferToUTF8String(data);
  }

  private async fetchGraphQL<T>(query: string, variables: unknown): Promise<T> {
    const userAgent = await this.getUserAgent();
    const request: Request = {
      url: API_URL,
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "user-agent": userAgent,
        origin: BASE_URL,
        referer: BASE_URL,
      },
      body: JSON.stringify({ query, variables }),
    };
    const [, data] = await Application.scheduleRequest(request);
    const jsonStr = Application.arrayBufferToUTF8String(data);
    return JSON.parse(jsonStr) as T;
  }

  private async fetchMangaSearchResults(
    query: string,
    page: number,
    limit: number,
  ): Promise<{ items: AllMangaItemBase[]; nextPage?: number }> {
    const graphqlQuery =
      "query($search: SearchInput, $page:Int, $limit:Int){mangas(search:$search,page:$page,limit:$limit){pageInfo{hasNextPage nextPage} edges{_id name englishName nativeName thumbnail}}}";
    const response = await this.fetchGraphQL<AllMangaSearchResponse>(graphqlQuery, {
      search: { query, isManga: true },
      page,
      limit,
    });
    const connection = response?.data?.mangas;
    const items = (connection?.edges ?? []).filter(Boolean);
    const nextPage = connection?.pageInfo?.hasNextPage ? connection.pageInfo.nextPage : undefined;
    return { items, nextPage };
  }

  private async fetchMangaDiscover(
    sortBy: string,
    page: number,
    limit: number,
  ): Promise<{ items: AllMangaItemBase[]; nextPage?: number }> {
    const graphqlQuery =
      "query($search: SearchInput, $page:Int, $limit:Int){mangas(search:$search,page:$page,limit:$limit){pageInfo{hasNextPage nextPage} edges{_id name englishName nativeName thumbnail}}}";
    const response = await this.fetchGraphQL<AllMangaSearchResponse>(graphqlQuery, {
      search: { isManga: true, sortBy },
      page,
      limit,
    });
    const connection = response?.data?.mangas;
    const items = (connection?.edges ?? []).filter(Boolean);
    const nextPage = connection?.pageInfo?.hasNextPage ? connection.pageInfo.nextPage : undefined;
    return { items, nextPage };
  }

  private async fetchChapterUploadDates(
    mangaId: string,
    chapterStrings: string[],
    translationType: "sub" | "dub" | "raw",
  ): Promise<Map<string, Date>> {
    const dates = new Map<string, Date>();
    const batchSize = 25;
    for (let i = 0; i < chapterStrings.length; i += batchSize) {
      const batch = chapterStrings.slice(i, i + batchSize);
      const fields = batch
        .map((chapterString, index) => {
          const escaped = this.escapeGraphQLString(chapterString);
          return `c${index}: chaptersForRead(mangaId:$mangaId, chapterString:"${escaped}", translationType:$translationType){edges{chapterString uploadDate}}`;
        })
        .join("\n");
      const query = `query($mangaId:String!,$translationType:VaildTranslationTypeMangaEnumType!){${fields}}`;
      const response = await this.fetchGraphQL<AllMangaChaptersForReadResponse>(query, {
        mangaId,
        translationType,
      });
      const data = response?.data ?? {};
      for (const value of Object.values(data)) {
        const connection = value as AllMangaChaptersConnection | null;
        const edges = connection?.edges ?? [];
        for (const edge of edges) {
          if (!edge?.chapterString) continue;
          const parsed = this.parseUploadDate(edge.uploadDate);
          if (parsed) {
            dates.set(edge.chapterString, parsed);
            break;
          }
        }
      }
    }
    return dates;
  }

  private parseNuxtPayload(html: string): any | undefined {
    const marker = "window.__NUXT__=";
    const start = html.indexOf(marker);
    if (start === -1) return undefined;
    const scriptStart = start + marker.length;
    const scriptEnd = html.indexOf("</script>", scriptStart);
    if (scriptEnd === -1) return undefined;
    const script = html.slice(scriptStart, scriptEnd).trim().replace(/;$/, "");
    try {
      return Function(`"use strict";return (${script});`)();
    } catch (error) {
      console.log(`[AllManga] Failed to parse Nuxt payload: ${String(error)}`);
      return undefined;
    }
  }

  private async getListData(): Promise<{
    sections: Record<string, AllMangaListItem[]>;
    allItems: AllMangaListItem[];
  }> {
    const now = Date.now();
    if (this.listCache && now - this.listCache.fetchedAt < LIST_CACHE_TTL_MS) {
      return {
        sections: this.listCache.sections,
        allItems: this.listCache.allItems,
      };
    }

    const html = await this.fetchHtml(LIST_URL);
    const nuxt = this.parseNuxtPayload(html);
    const sections: Record<string, AllMangaListItem[]> = {};
    const allItems: AllMangaListItem[] = [];
    const seen = new Set<string>();

    if (nuxt?.fetch) {
      for (const [key, value] of Object.entries(nuxt.fetch)) {
        const typed = value as { scrollDatas?: AllMangaListItem[] };
        if (!typed?.scrollDatas?.length) continue;
        sections[key] = typed.scrollDatas;
        for (const item of typed.scrollDatas) {
          if (!item?._id || seen.has(item._id)) continue;
          seen.add(item._id);
          allItems.push(item);
        }
      }
    }

    this.listCache = { fetchedAt: now, sections, allItems };
    return { sections, allItems };
  }

  private toDiscoverSectionItem(
    item: AllMangaListItem,
    type: DiscoverSectionItem["type"],
  ): DiscoverSectionItem {
    const title = item.englishName ?? item.name ?? "Unknown Title";
    const subtitle = item.nativeName ?? undefined;
    const baseItem = {
      mangaId: item._id,
      title,
      subtitle,
      imageUrl: this.normalizeImageUrl(item.thumbnail ?? ""),
      type,
    } as DiscoverSectionItem;

    if (type === "chapterUpdatesCarouselItem") {
      const chapterString = item.lastChapterInfo?.sub?.chapterString ?? "";
      const chapterId = chapterString
        ? this.buildChapterId(item._id, String(chapterString), "sub")
        : "";
      return {
        ...baseItem,
        chapterId,
      } as DiscoverSectionItem;
    }

    return baseItem;
  }

  private toSearchResultItem(item: AllMangaListItem): SearchResultItem {
    return this.toSearchResultItemBase(item);
  }

  private toSearchResultItemBase(item: AllMangaItemBase): SearchResultItem {
    const title = item.englishName ?? item.name ?? "Unknown Title";
    const subtitle = item.nativeName ?? undefined;
    return {
      mangaId: item._id,
      title,
      subtitle,
      imageUrl: this.normalizeImageUrl(item.thumbnail ?? ""),
    };
  }

  private normalizeImageUrl(url: string): string {
    if (!url) return FALLBACK_IMAGE;
    const trimmed = url.trim();
    if (!trimmed) return FALLBACK_IMAGE;
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    if (trimmed.startsWith("//")) {
      return `https:${trimmed}`;
    }
    const cleaned = trimmed.replace(/^\/+/, "");
    return cleaned ? `${IMAGE_BASE}${cleaned}` : FALLBACK_IMAGE;
  }

  private buildTagSection(id: string, title: string, tags: string[]): TagSection {
    return {
      id: this.toTagId(id),
      title,
      tags: tags.filter(Boolean).map((tag) => ({
        id: this.toTagId(tag),
        title: tag,
      })),
    };
  }

  private mapStatus(status: string): "ONGOING" | "COMPLETED" | "UNKNOWN" {
    const normalized = status.toLowerCase();
    if (normalized.includes("releasing") || normalized.includes("ongoing")) return "ONGOING";
    if (normalized.includes("completed") || normalized.includes("finished")) return "COMPLETED";
    return "UNKNOWN";
  }

  private stripHtml(html: string): string {
    const $ = cheerio.load(html || "");
    return $.text();
  }

  private parseChapterNumber(chapterString: string, fallback: number): number {
    const parsed = parseFloat(String(chapterString).replace(/[^0-9.]/g, ""));
    return Number.isNaN(parsed) ? fallback : parsed;
  }

  private parseUploadDate(uploadDate?: AllMangaUploadDate | null): Date | undefined {
    if (!uploadDate) return undefined;
    if (typeof uploadDate.year !== "number" || typeof uploadDate.month !== "number") {
      return undefined;
    }
    const year = uploadDate.year;
    const month = uploadDate.month;
    const date = uploadDate.date ?? 1;
    const hour = uploadDate.hour ?? 0;
    const minute = uploadDate.minute ?? 0;
    const second = uploadDate.second ?? 0;
    return new Date(year, month, date, hour, minute, second);
  }

  private escapeGraphQLString(value: string): string {
    return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  private toTagId(raw: string): string {
    const cleaned = String(raw ?? "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return cleaned || "tag";
  }

  private buildChapterId(mangaId: string, chapterString: string, translation: string): string {
    return `${mangaId}-${chapterString}-${translation}`;
  }

  private parseChapterId(chapterId: string): {
    mangaId: string;
    chapterString: string;
    translation: string;
  } {
    const [mangaId, chapterString, translation] = chapterId.split("-");
    if (!mangaId || !chapterString || !translation) {
      throw new Error("Invalid chapter id");
    }
    return { mangaId, chapterString, translation };
  }

  private paginate<T>(
    items: T[],
    page: number,
    pageSize: number,
  ): { items: T[]; nextPage: number | undefined } {
    const start = (page - 1) * pageSize;
    const sliced = items.slice(start, start + pageSize);
    const nextPage = start + pageSize < items.length ? page + 1 : undefined;
    return { items: sliced, nextPage };
  }
}

export const AllManga = new AllMangaExtension();

type AllMangaItemBase = {
  _id: string;
  name?: string | null;
  englishName?: string | null;
  nativeName?: string | null;
  thumbnail?: string | null;
};

type AllMangaSearchResponse = {
  data?: {
    mangas?: {
      edges?: AllMangaItemBase[];
      pageInfo?: {
        hasNextPage?: boolean;
        nextPage?: number;
      };
    };
  };
};

type AllMangaUploadDate = {
  year?: number;
  month?: number;
  date?: number;
  hour?: number;
  minute?: number;
  second?: number;
};

type AllMangaChapterEntry = {
  chapterString?: string;
  uploadDate?: AllMangaUploadDate | null;
};

type AllMangaChaptersConnection = {
  edges?: AllMangaChapterEntry[];
};

type AllMangaChaptersForReadResponse = {
  data?: Record<string, AllMangaChaptersConnection | null>;
};

type AllMangaListItem = {
  _id: string;
  name?: string | null;
  englishName?: string | null;
  nativeName?: string | null;
  thumbnail?: string | null;
  lastChapterInfo?: {
    sub?: {
      chapterString?: string;
      notes?: string;
      pictureUrlsProcessed?: number;
    };
  };
  availableChapters?: {
    sub?: number;
    raw?: number;
  };
  countryOfOrigin?: string;
};
