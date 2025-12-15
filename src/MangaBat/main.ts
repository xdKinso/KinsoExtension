import {
    BasicRateLimiter,
    type Chapter,
    type ChapterProviding,
    type HomePageSectionsProviding,
    type PagedResults,
    type PartialSourceManga,
    type Request,
    type SearchRequest,
    type SearchResultsProviding,
    type SourceInfo,
    type SourceManga,
    type HomeSection,
    type Extension,
} from '@paperback/types';

import info from './pbconfig';
import {
    parseSearchResults,
    parseMangaDetails,
    parseChapters,
    parseChapterPages,
    parseHotManga,
    parseLatestUpdates,
} from './parsers';
import type { SearchDetails } from './models';
import { requestInterceptor, responseInterceptor } from './interceptors';

import * as cheerio from 'cheerio';

type MangaBatImplementation = Extension &
    SearchResultsProviding &
    ChapterProviding &
    HomePageSectionsProviding;

export class MangaBat implements MangaBatImplementation {
    constructor(private cheerio: typeof cheerio) {}

    // Rate limiter: Conservative 1 request per second
    globalRateLimiter = new BasicRateLimiter('rateLimiter', {
        numberOfRequests: 1,
        bufferInterval: 1,
        ignoreImages: true,
    });

    stateManager = App.createSourceStateManager();

    getSourceInfo(): SourceInfo {
        return info;
    }

    async getHomePageSections(): Promise<HomeSection[]> {
        const sections: HomeSection[] = [];
        const baseUrl = info.websiteBaseURL;

        try {
            // Hot Manga section
            const hotRequest = App.createRequest({
                url: `${baseUrl}`,
                method: 'GET',
            });

            const hotResponse = await hotRequest.send();
            const hotData = await hotResponse.text();
            const $hot = this.cheerio.load(hotData);
            const hotMangas = parseHotManga($hot, baseUrl);

            if (hotMangas.length > 0) {
                sections.push({
                    id: 'hot_manga',
                    title: 'Hot Manga',
                    items: hotMangas,
                    type: 'singleRowNormal',
                });
            }

            // Latest Updates section
            const latestMangas = parseLatestUpdates($hot, baseUrl);

            if (latestMangas.length > 0) {
                sections.push({
                    id: 'latest_updates',
                    title: 'Latest Updates',
                    items: latestMangas,
                    type: 'singleRowNormal',
                });
            }
        } catch (error) {
            console.error('[MangaBat] Error loading home sections:', error);
        }

        return sections;
    }

    async getSearchResults(
        searchQuery: SearchRequest,
        metadata: SearchDetails | undefined,
    ): Promise<PagedResults<PartialSourceManga>> {
        const baseUrl = info.websiteBaseURL;
        const page = metadata?.page || 1;

        try {
            let searchUrl: string;

            if (searchQuery.title && searchQuery.title.trim() !== '') {
                // Search by title
                const query = searchQuery.title.trim().replace(/\s+/g, '_');
                searchUrl = `${baseUrl}/search/story/${encodeURIComponent(query)}?page=${page}`;
            } else {
                // Browse all manga
                searchUrl = `${baseUrl}/manga_list?type=latest&category=all&state=all&page=${page}`;
            }

            const request = App.createRequest({
                url: searchUrl,
                method: 'GET',
            });

            const response = await request.send();
            const data = await response.text();
            const $ = this.cheerio.load(data);

            const results = parseSearchResults($, baseUrl);
            
            // Check for next page
            const hasNextPage = $('div.group-page a.page-select + a').length > 0;

            return {
                results,
                metadata: hasNextPage ? { page: page + 1 } : undefined,
            };
        } catch (error) {
            console.error('[MangaBat] Search error:', error);
            return {
                results: [],
                metadata: undefined,
            };
        }
    }

    async getMangaDetails(mangaId: string): Promise<SourceManga> {
        const baseUrl = info.websiteBaseURL;
        const url = mangaId.startsWith('http') ? mangaId : `${baseUrl}${mangaId}`;

        const request = App.createRequest({
            url,
            method: 'GET',
        });

        const response = await request.send();
        const data = await response.text();
        const $ = this.cheerio.load(data);

        return parseMangaDetails($, mangaId);
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const baseUrl = info.websiteBaseURL;
        const url = mangaId.startsWith('http') ? mangaId : `${baseUrl}${mangaId}`;

        const request = App.createRequest({
            url,
            method: 'GET',
        });

        const response = await request.send();
        const data = await response.text();
        const $ = this.cheerio.load(data);

        return parseChapters($, mangaId);
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<Chapter> {
        const chapters = await this.getChapters(mangaId);
        return (
            chapters.find((chapter: Chapter) => chapter.chapterId === chapterId) ??
            chapters[0] ??
            ({
                chapterId,
                mangaId,
                name: 'Unknown',
                langCode: '🇬🇧',
                chapNum: 0,
                time: new Date(0),
            } as Chapter)
        );
    }

    async getChapterPages(chapterId: string): Promise<string[]> {
        const baseUrl = info.websiteBaseURL;
        const url = chapterId.startsWith('http') ? chapterId : `${baseUrl}${chapterId}`;

        const request = App.createRequest({
            url,
            method: 'GET',
        });

        const response = await request.send();
        const data = await response.text();
        const $ = this.cheerio.load(data);

        return parseChapterPages($);
    }

    async getSearchTags(): Promise<import('@paperback/types').TagSection[]> {
        return [];
    }
}
