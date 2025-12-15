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

const baseUrl = 'https://www.mangabats.com';

type MangaBatImplementation = Extension &
    SearchResultsProviding &
    ChapterProviding;

export class MangaBatExtension implements MangaBatImplementation {
    requestManager = new Interceptor('main');
    
    globalRateLimiter = new BasicRateLimiter('rateLimiter', {
        numberOfRequests: 1,
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
                const searchQuery = query.title.trim().replace(/\s+/g, '_');
                searchUrl = `${baseUrl}/search/story/${encodeURIComponent(searchQuery)}?page=${page}`;
            } else {
                searchUrl = `${baseUrl}/manga_list?type=latest&category=all&state=all&page=${page}`;
            }

            const request = {
                url: searchUrl,
                method: 'GET',
            };

            const [_response, data] = await Application.scheduleRequest(request);
            const htmlStr = Application.arrayBufferToUTF8String(data);
            const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));
            const items = parseSearchResults($, baseUrl);
            
            const hasNextPage = $('div.group-page a.page-select + a').length > 0;

            return {
                items,
                metadata: hasNextPage ? { page: page + 1 } : undefined,
            };
        } catch (error) {
            console.error('[MangaBat] Search error:', error);
            return { items: [] };
        }
    }

    async getMangaDetails(mangaId: string): Promise<SourceManga> {
        const url = mangaId.startsWith('http') ? mangaId : `${baseUrl}${mangaId}`;
        const request = {
            url,
            method: 'GET',
        };

        const [_response, data] = await Application.scheduleRequest(request);
        const htmlStr = Application.arrayBufferToUTF8String(data);
        const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));

        return parseMangaDetails($, mangaId);
    }

    async getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
        const mangaId = sourceManga.mangaId;
        const url = mangaId.startsWith('http') ? mangaId : `${baseUrl}${mangaId}`;

        const request = {
            url,
            method: 'GET',
        };

        const [_response, data] = await Application.scheduleRequest(request);
        const htmlStr = Application.arrayBufferToUTF8String(data);
        const $ = cheerio.load(htmlparser2.parseDocument(htmlStr));

        return parseChapters($, sourceManga);
    }

    async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
        const chapterId = chapter.chapterId;
        const url = chapterId.startsWith('http') ? chapterId : `${baseUrl}${chapterId}`;

        const request = {
            url,
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

export const MangaBat = new MangaBatExtension();
