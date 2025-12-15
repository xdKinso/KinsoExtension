import {
    BasicRateLimiter,
    type Chapter,
    type ChapterDetails,
    type ChapterProviding,
    type Extension,
    type PagedResults,
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
    ChapterProviding;

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
}

export const MangaDemon = new MangaDemonExtension();
