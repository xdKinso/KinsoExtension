import type {
    Chapter,
    PartialSourceManga,
    SourceManga,
    Tag,
} from '@paperback/types';
import * as cheerio from 'cheerio';

export function parseSearchResults($: cheerio.CheerioAPI, baseUrl: string): PartialSourceManga[] {
    const results: PartialSourceManga[] = [];
    
    // For advanced search results
    $('div#advanced-content > div.advanced-element').each((_, element) => {
        const $elem = $(element);
        const $link = $elem.find('a').first();
        const url = $link.attr('href');
        const title = $elem.find('h1').first().text().trim();
        const image = $elem.find('img').attr('src');

        if (url && title) {
            results.push({
                mangaId: encodeURIComponent(url),
                title: title,
                image: image || '',
            });
        }
    });

    return results;
}

export function parseLatestUpdates($: cheerio.CheerioAPI, baseUrl: string): PartialSourceManga[] {
    const results: PartialSourceManga[] = [];
    
    $('div#updates-container > div.updates-element:not(:has(.toffee-badge))').each((_, element) => {
        const $elem = $(element);
        const $link = $elem.find('div.updates-element-info a').first();
        const url = $link.attr('href');
        const title = $link.text().trim();
        const image = $elem.find('div.thumb img').attr('src');

        if (url && title) {
            results.push({
                mangaId: encodeURIComponent(url),
                title: title,
                image: image || '',
            });
        }
    });

    return results;
}

export function parseDirectSearch($: cheerio.CheerioAPI, baseUrl: string): PartialSourceManga[] {
    const results: PartialSourceManga[] = [];
    
    $('body > a[href]').each((_, element) => {
        const $elem = $(element);
        const url = $elem.attr('href');
        const title = $elem.find('div.seach-right > div').first().text().trim();
        const image = $elem.find('img').attr('src');

        if (url && title) {
            results.push({
                mangaId: encodeURIComponent(url),
                title: title,
                image: image || '',
            });
        }
    });

    return results;
}

export function parseMangaDetails($: cheerio.CheerioAPI, mangaId: string): SourceManga {
    const $container = $('div#manga-info-container');
    
    const title = $container.find('h1.big-fat-titles').first().text().trim();
    const image = $container.find('div#manga-page img').attr('src') || '';
    const description = $container.find('div#manga-info-rightColumn > div > div.white-font').text().trim();
    const author = $container.find('div#manga-info-stats > div:has(> li:eq(0):contains(Author)) > li:eq(1)').text().trim();
    const statusText = $container.find('div#manga-info-stats > div:has(> li:eq(0):contains(Status)) > li:eq(1)').text().trim();

    const tags: Tag[] = [];
    $container.find('div.genres-list > li').each((_, elem) => {
        const genreText = $(elem).text().trim();
        if (genreText) {
            tags.push({
                id: genreText.toLowerCase(),
                label: genreText,
            });
        }
    });

    let status = 'ONGOING';
    if (statusText) {
        if (statusText.toLowerCase().includes('completed')) {
            status = 'COMPLETED';
        } else if (statusText.toLowerCase().includes('ongoing')) {
            status = 'ONGOING';
        }
    }

    return {
        mangaId,
        titles: [title],
        image,
        status,
        author: author || 'Unknown',
        tags: [{ id: 'genre', label: 'Genres', tags }],
        desc: description,
    };
}

export function parseChapters($: cheerio.CheerioAPI, mangaId: string): Chapter[] {
    const chapters: Chapter[] = [];

    $('div#chapters-list a.chplinks').each((_, element) => {
        const $elem = $(element);
        const url = $elem.attr('href');
        const name = $elem.clone().children().remove().end().text().trim();
        const dateText = $elem.find('span').text().trim();

        if (url && name) {
            let time = new Date(0);
            if (dateText) {
                try {
                    time = new Date(dateText);
                } catch {
                    // Keep default date
                }
            }

            chapters.push({
                chapterId: encodeURIComponent(url),
                mangaId,
                name,
                langCode: '🇬🇧',
                chapNum: parseFloat(name.match(/\d+(\.\d+)?/)?.[0] || '0'),
                time,
            });
        }
    });

    return chapters;
}

export function parseChapterPages($: cheerio.CheerioAPI): string[] {
    const pages: string[] = [];

    $('div > img.imgholder').each((_, element) => {
        const src = $(element).attr('src');
        if (src) {
            pages.push(src);
        }
    });

    return pages;
}
