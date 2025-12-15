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
    parseLatestUpdates,
    parseDirectSearch,
    parseMangaDetails,
    parseChapters,
    parseChapterPages,
} from './parsers';
import { getGenreTags, getStatusTags, getSortTags } from './forms';
import type { SearchDetails } from './models';
import { requestInterceptor, responseInterceptor } from './interceptors';

import * as cheerio from 'cheerio';

type MangaDemonImplementation = Extension &
    SearchResultsProviding &
    ChapterProviding &
    HomePageSectionsProviding;

export class MangaDemon implements MangaDemonImplementation {
    constructor(private cheerio: typeof cheerio) {}

    // Rate limiter: 2 requests per second (from Mihon source)
    globalRateLimiter = new BasicRateLimiter('rateLimiter', {
        numberOfRequests: 2,
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
            // Most Viewed section
            const popularRequest = App.createRequest({
                url: `${baseUrl}/advanced.php?list=1&status=all&orderby=VIEWS%20DESC`,
                method: 'GET',
            });

            const popularResponse = await popularRequest.send();
            const popularData = await popularResponse.text();
            const $popular = this.cheerio.load(popularData);
            const popularMangas = parseSearchResults($popular, baseUrl);

            sections.push({
                id: 'most_viewed',
                title: 'Most Viewed',
                items: popularMangas,
                type: 'singleRowNormal',
            });

            // Latest Updates section
            const latestRequest = App.createRequest({
                url: `${baseUrl}/lastupdates.php?list=1`,
                method: 'GET',
            });

            const latestResponse = await latestRequest.send();
            const latestData = await latestResponse.text();
            const $latest = this.cheerio.load(latestData);
            const latestMangas = parseLatestUpdates($latest, baseUrl);

            sections.push({
                id: 'latest_updates',
                title: 'Latest Updates',
                items: latestMangas,
                type: 'singleRowNormal',
            });
        } catch (error) {
            console.error('[MangaDemon] Error loading home sections:', error);
        }

        return sections;
    }

    async getSearchResults(
        searchQuery: SearchRequest,
        metadata: SearchDetails | undefined,
    ): Promise<PagedResults<PartialSourceManga>> {
        const baseUrl = info.websiteBaseURL;
        const page = metadata?.orderby ? parseInt(String(metadata.orderby).split('_')[1] || '1') : 1;

        try {
            // Direct search by query
            if (searchQuery.title && searchQuery.title.trim() !== '') {
                const searchUrl = `${baseUrl}/search.php?manga=${encodeURIComponent(searchQuery.title)}`;
                const request = App.createRequest({
                    url: searchUrl,
                    method: 'GET',
                });

                const response = await this.requestManager.schedule(request, 1);
                const data = await response.text();
                const $ = this.cheerio.load(data);

                const results = parseDirectSearch($, baseUrl);

                return {
                    results,
                    metadata: { ...metadata, orderby: `page_${page}` } as SearchDetails,
                };
            }

            // Advanced search with filters
            let searchUrl = `${baseUrl}/advanced.php?list=${page}`;
            
            if (searchQuery.tags) {
                searchQuery.tags.forEach(tagSection => {
                    if (tagSection.id === 'genre' && tagSection.tags) {
                        tagSection.tags.forEach(tag => {
                            searchUrl += `&genre[]=${encodeURIComponent(tag.id)}`;
                        });
                    } else if (tagSection.id === 'status' && tagSection.tags?.[0]) {
                        searchUrl += `&status=${encodeURIComponent(tagSection.tags[0].id)}`;
                    } else if (tagSection.id === 'orderby' && tagSection.tags?.[0]) {
                        searchUrl += `&orderby=${encodeURIComponent(tagSection.tags[0].id)}`;
                    }
                });
            } else {
                searchUrl += '&status=all&orderby=VIEWS%20DESC';
            }

            const request = App.createRequest({
                url: searchUrl,
                method: 'GET',
            });

            const response = await request.send();
            const data = await response.text();
            const $ = this.cheerio.load(data);

            const results = parseSearchResults($, baseUrl);
            const hasNextPage = $('div.pagination > ul > a > li:contains(Next)').length > 0;

            return {
                results,
                metadata: hasNextPage ? { ...metadata, orderby: `page_${page + 1}` } as SearchDetails : undefined,
            };
        } catch (error) {
            console.error('[MangaDemon] Search error:', error);
            return {
                results: [],
                metadata: undefined,
            };
        }
    }

    async getMangaDetails(mangaId: string): Promise<SourceManga> {
        const baseUrl = info.websiteBaseURL;
        const url = decodeURIComponent(mangaId);

        const request = App.createRequest({
            url: url.startsWith('http') ? url : `${baseUrl}${url}`,
            method: 'GET',
        });

        const response = await request.send();
        const data = await response.text();
        const $ = this.cheerio.load(data);

        return parseMangaDetails($, mangaId);
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const baseUrl = info.websiteBaseURL;
        const url = decodeURIComponent(mangaId);

        const request = App.createRequest({
            url: url.startsWith('http') ? url : `${baseUrl}${url}`,
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
        const url = decodeURIComponent(chapterId);

        const request = App.createRequest({
            url: url.startsWith('http') ? url : `${baseUrl}${url}`,
            method: 'GET',
        });

        const response = await request.send();
        const data = await response.text();
        const $ = this.cheerio.load(data);

        return parseChapterPages($);
    }

    async getSearchTags(): Promise<import('@paperback/types').TagSection[]> {
        return [getGenreTags(), getStatusTags(), getSortTags()];
    }
}
