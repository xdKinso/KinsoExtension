import {
    BasicRateLimiter,
    DiscoverSectionType,
    type Chapter,
    type ChapterDetails,
    type ChapterProviding,
    type CloudflareBypassRequestProviding,
    type DiscoverSection,
    type DiscoverSectionItem,
    type DiscoverSectionProviding,
    type Extension,
    type PagedResults,
    type Request,
    type SearchQuery,
    type SearchResultItem,
    type SearchResultsProviding,
    type SourceManga,
    type SortingOption,
} from '@paperback/types';
import * as cheerio from 'cheerio';
import * as htmlparser2 from 'htmlparser2';

import { Interceptor } from './interceptors';
import {
    parseSearchResults,
    parseMangaDetails,
    parseChapters,
    parseChapterPages,
} from './parsers';

const baseUrl = 'https://demonicscans.org';

type MangaDemonImplementation = Extension &
    SearchResultsProviding &
    ChapterProviding &
    CloudflareBypassRequestProviding &
    DiscoverSectionProviding;

export class MangaDemonExtension implements MangaDemonImplementation {
    requestManager = new Interceptor('main');
    
    globalRateLimiter = new BasicRateLimiter('rateLimiter', {
        numberOfRequests: 2,
        bufferInterval: 1,
        ignoreImages: true,
    });

    async initialise(): Promise<void> {
        this.requestManager.registerInterceptor();
        this.globalRateLimiter.registerInterceptor();
    }

    async getSearchResults(
        query: SearchQuery,
        metadata?: any,
        _sortingOption?: SortingOption,
    ): Promise<PagedResults<SearchResultItem>> {
        const page = metadata?.page || 1;

        try {
            let searchUrl: string;
            
            if (query.title && query.title.trim() !== '') {
                searchUrl = `${baseUrl}/search.php?manga=${encodeURIComponent(query.title)}`;
            } else {
                searchUrl = `${baseUrl}/advanced.php?list=${page}&status=all&orderby=VIEWS%20DESC`;
            }

            const request = {
                url: searchUrl,
                method: 'GET',
            };

            const [_response, data] = await Application.scheduleRequest(request);
            const htmlStr = Application.arrayBufferToUTF8String(data);
            const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));
            const items = parseSearchResults($, baseUrl);

            return { items, metadata: { page } };
        } catch (error) {
            console.error('[MangaDemon] Search error:', error);
            return { items: [] };
        }
    }

    async getMangaDetails(mangaId: string): Promise<SourceManga> {
        const url = decodeURIComponent(mangaId);
        const request = {
            url: url.startsWith('http') ? url : `${baseUrl}${url}`,
            method: 'GET',
        };

        const [_response, data] = await Application.scheduleRequest(request);
        const htmlStr = Application.arrayBufferToUTF8String(data);
        const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));

        return parseMangaDetails($, mangaId);
    }

    async getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
        const mangaId = sourceManga.mangaId;
        const url = decodeURIComponent(mangaId);

        const request = {
            url: url.startsWith('http') ? url : `${baseUrl}${url}`,
            method: 'GET',
        };

        const [_response, data] = await Application.scheduleRequest(request);
        const htmlStr = Application.arrayBufferToUTF8String(data);
        const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));

        return parseChapters($, sourceManga);
    }

    async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
        const url = decodeURIComponent(chapter.chapterId);

        const request = {
            url: url.startsWith('http') ? url : `${baseUrl}${url}`,
            method: 'GET',
        };

        const [_response, data] = await Application.scheduleRequest(request);
        const htmlStr = Application.arrayBufferToUTF8String(data);
        const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));

        const pages = parseChapterPages($);
        
        return {
            id: chapter.chapterId,
            mangaId: chapter.sourceManga.mangaId,
            pages,
        };
    }

    async getSearchFilters(): Promise<any[]> {
        return [];
    }

    async getSortingOptions(): Promise<any[]> {
        return [];
    }

    async getCloudflareBypassRequest(): Promise<Request> {
        const { generateBrowserHeaders } = await import('../MangaPark/browserHeaders');
        const headers = generateBrowserHeaders(baseUrl);
        
        return {
            url: baseUrl,
            method: 'GET',
            headers,
        };
    }

    async saveCloudflareBypassCookies(_cookies: any[]): Promise<void> {
        // Cloudflare cookies are handled automatically by the interceptor
    }

    async getDiscoverSections(): Promise<DiscoverSection[]> {
        return [
            {
                id: 'most_viewed_today',
                title: 'Most Viewed Today',
                type: DiscoverSectionType.featured,
            },
            {
                id: 'latest_translations',
                title: 'Latest Translations',
                type: DiscoverSectionType.simpleCarousel,
            },
            {
                id: 'latest_updates',
                title: 'Latest Updates',
                type: DiscoverSectionType.simpleCarousel,
            },
        ];
    }

    async getDiscoverSectionItems(
        section: DiscoverSection,
        _metadata?: any,
    ): Promise<PagedResults<DiscoverSectionItem>> {
        try {
            const request = {
                url: baseUrl,
                method: 'GET',
            };

            const [_response, data] = await Application.scheduleRequest(request);
            const htmlStr = Application.arrayBufferToUTF8String(data);
            const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));

            let items: DiscoverSectionItem[] = [];

            if (section.id === 'most_viewed_today') {
                const { parseMostViewedToday } = await import('./parsers');
                items = parseMostViewedToday($, baseUrl);
            } else if (section.id === 'latest_translations') {
                const { parseLatestTranslations } = await import('./parsers');
                items = parseLatestTranslations($, baseUrl);
            } else if (section.id === 'latest_updates') {
                const { parseLatestUpdates } = await import('./parsers');
                items = parseLatestUpdates($, baseUrl);
            }

            return { items };
        } catch (error) {
            console.error(`[MangaDemon] Error loading section ${section.id}:`, error);
            return { items: [] };
        }
    }
}

export const MangaDemon = new MangaDemonExtension();
