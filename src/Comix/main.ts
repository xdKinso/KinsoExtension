/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright  2025 Kinso */

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
} from '@paperback/types';

import { SettingsForm } from './forms';
import { MainInterceptor } from './network';

const COMIX_DOMAIN = 'https://comix.to';

type ComixImplementation = SettingsFormProviding &
  Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding;

export class ComixExtension implements ComixImplementation {
  mainRateLimiter = new BasicRateLimiter('main', {
    numberOfRequests: 4,
    bufferInterval: 1,
    ignoreImages: true,
  });

  mainInterceptor = new MainInterceptor('main');

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
        id: 'latest-updates',
        title: 'Latest Updates',
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: 'popular',
        title: 'Popular',
        type: DiscoverSectionType.simpleCarousel,
      },
    ];
  }

  async getDiscoverSectionItems(
    section: DiscoverSection,
    metadata: unknown,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    const items: DiscoverSectionItem[] = [];
    return {
      items,
      metadata,
    };
  }

  async getSearchFilters(): Promise<SearchFilter[]> {
    return [];
  }

  async getSearchResults(
    query: SearchQuery,
    metadata: unknown,
  ): Promise<PagedResults<SearchResultItem>> {
    return {
      items: [],
      metadata,
    };
  }

  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    return {
      mangaId,
      primaryTitle: 'Test Manga',
      secondaryTitles: [],
      coverUrl: '',
      synopsis: 'Loading...',
      status: 'Unknown',
      contentRating: ContentRating.EVERYONE,
      tags: [],
    };
  }

  async getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
    return [];
  }

  async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
    return {
      pages: [],
    };
  }
}
