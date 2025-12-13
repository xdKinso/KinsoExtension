/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright © 2025 Inkdex */

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
  type SearchFilter,
  type SearchQuery,
  type SearchResultItem,
  type SearchResultsProviding,
  type SettingsFormProviding,
  type SourceManga,
  type Tag,
} from "@paperback/types";

import { SettingsForm } from "./forms";
import { MainInterceptor } from "./network";

const MANGAPARK_DOMAIN = "https://mangapark.net";

type MangaParkImplementation = SettingsFormProviding &
  Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding;

export class MangaParkExtension implements MangaParkImplementation {
  mainRateLimiter = new BasicRateLimiter("main", {
    numberOfRequests: 4,
    bufferInterval: 1,
    ignoreImages: true,
  });

  mainInterceptor = new MainInterceptor("main");

  async initialise(): Promise<void> {
    this.mainRateLimiter.registerInterceptor();
    this.mainInterceptor.registerInterceptor();
  }

  async getSettingsForm(): Promise<Form> {
    return new SettingsForm();
  }

  async getDiscoverSections(): Promise<DiscoverSection[]> {
    return [
      {
        id: "latest-updates",
        title: "Latest Updates",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "popular",
        title: "Popular",
        type: DiscoverSectionType.simpleCarousel,
      },
    ];
  }

  async getDiscoverSectionItems(
    sectionId: string,
    metadata: unknown,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    const page = (metadata as { page?: number })?.page ?? 1;
    
    // TODO: Implement actual scraping logic for mangapark.net
    const url = `${MANGAPARK_DOMAIN}/${sectionId === "popular" ? "popular" : "latest"}?page=${page}`;

    try {
      const request = new Request(url);
      const response = await request.send();
      const $ = Application.Cheerio.load(response.data);

      const items: DiscoverSectionItem[] = [];
      
      // TODO: Parse the HTML and extract manga items
      // This is a placeholder structure
      
      return {
        items,
        metadata: { page: page + 1 },
      };
    } catch (error) {
      console.error(`Error fetching discover section ${sectionId}:`, error);
      return { items: [], metadata };
    }
  }

  async getSearchFilters(): Promise<SearchFilter[]> {
    return [];
  }

  async getSearchResults(
    query: SearchQuery,
    metadata: unknown,
  ): Promise<PagedResults<SearchResultItem>> {
    const page = (metadata as { page?: number })?.page ?? 1;
    const searchTerm = query.title ?? "";

    // TODO: Implement search functionality
    const url = `${MANGAPARK_DOMAIN}/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;

    try {
      const request = new Request(url);
      const response = await request.send();
      const $ = Application.Cheerio.load(response.data);

      const results: SearchResultItem[] = [];
      
      // TODO: Parse search results
      
      return {
        items: results,
        metadata: { page: page + 1 },
      };
    } catch (error) {
      console.error("Error during search:", error);
      return { items: [], metadata };
    }
  }

  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    const url = `${MANGAPARK_DOMAIN}/title/${mangaId}`;

    try {
      const request = new Request(url);
      const response = await request.send();
      const $ = Application.Cheerio.load(response.data);

      // TODO: Parse manga details from the page
      
      return {
        mangaId,
        titles: ["Title"],
        coverUrl: "",
        author: "",
        artist: "",
        synopsis: "",
        status: "Unknown",
        contentRating: ContentRating.EVERYONE,
        tags: [],
      };
    } catch (error) {
      console.error(`Error fetching manga details for ${mangaId}:`, error);
      throw error;
    }
  }

  async getChapters(mangaId: string): Promise<Chapter[]> {
    const url = `${MANGAPARK_DOMAIN}/title/${mangaId}`;

    try {
      const request = new Request(url);
      const response = await request.send();
      const $ = Application.Cheerio.load(response.data);

      const chapters: Chapter[] = [];
      
      // TODO: Parse chapters from the page
      
      return chapters;
    } catch (error) {
      console.error(`Error fetching chapters for ${mangaId}:`, error);
      return [];
    }
  }

  async getChapterDetails(chapterId: string): Promise<ChapterDetails> {
    const url = `${MANGAPARK_DOMAIN}/chapter/${chapterId}`;

    try {
      const request = new Request(url);
      const response = await request.send();
      const $ = Application.Cheerio.load(response.data);

      const pages: string[] = [];
      
      // TODO: Parse chapter pages
      
      return {
        chapterId,
        pages,
      };
    } catch (error) {
      console.error(`Error fetching chapter details for ${chapterId}:`, error);
      throw error;
    }
  }
}
