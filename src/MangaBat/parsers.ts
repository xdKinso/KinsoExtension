import type {
    Chapter,
    PartialSourceManga,
    SourceManga,
    Tag,
} from '@paperback/types';
import * as cheerio from 'cheerio';

export function parseSearchResults($: cheerio.CheerioAPI, baseUrl: string): PartialSourceManga[] {
    const results: PartialSourceManga[] = [];
    
    $('div.list-story-item').each((_, element) => {
        const $elem = $(element);
        const $link = $elem.find('h3 a').first();
        const url = $link.attr('href');
        const title = $link.attr('title') || $link.text().trim();
        const image = $elem.find('img').attr('src');

        if (url && title) {
            results.push({
                mangaId: url,
                title: title,
                image: image || '',
            });
        }
    });

    return results;
}

export function parseMangaDetails($: cheerio.CheerioAPI, mangaId: string): SourceManga {
    const $infoPanel = $('div.panel-story-info');
    
    const title = $infoPanel.find('h1').first().text().trim();
    const image = $infoPanel.find('span.info-image img').attr('src') || '';
    
    const altTitles: string[] = [];
    $infoPanel.find('td.table-label:contains("Alternative")').next().find('h2').each((_, elem) => {
        const altTitle = $(elem).text().trim();
        if (altTitle) altTitles.push(altTitle);
    });

    const author = $infoPanel.find('td.table-label:contains("Author")').next().text().trim();
    const statusText = $infoPanel.find('td.table-label:contains("Status")').next().text().trim();
    
    const tags: Tag[] = [];
    $infoPanel.find('td.table-label:contains("Genres")').next().find('a').each((_, elem) => {
        const genreText = $(elem).text().trim();
        if (genreText) {
            tags.push({
                id: genreText.toLowerCase(),
                label: genreText,
            });
        }
    });

    const description = $('div#panel-story-info-description').text()
        .replace('Description :', '')
        .trim();

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
        titles: [title, ...altTitles],
        image,
        status,
        author: author || 'Unknown',
        tags: [{ id: 'genre', label: 'Genres', tags }],
        desc: description,
    };
}

export function parseChapters($: cheerio.CheerioAPI, mangaId: string): Chapter[] {
    const chapters: Chapter[] = [];

    $('div.row-content-chapter li.a-h').each((_, element) => {
        const $elem = $(element);
        const $link = $elem.find('a').first();
        const url = $link.attr('href');
        const name = $link.text().trim();
        const dateText = $elem.find('span.chapter-time').attr('title') || '';

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
                chapterId: url,
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

    $('div.container-chapter-reader img').each((_, element) => {
        const src = $(element).attr('src');
        if (src) {
            pages.push(src);
        }
    });

    return pages;
}

export function parseHotManga($: cheerio.CheerioAPI, baseUrl: string): PartialSourceManga[] {
    const results: PartialSourceManga[] = [];
    
    $('div.item').each((_, element) => {
        const $elem = $(element);
        const $link = $elem.find('a').first();
        const url = $link.attr('href');
        const title = $elem.find('h3').text().trim();
        const image = $elem.find('img').attr('src');

        if (url && title) {
            results.push({
                mangaId: url,
                title: title,
                image: image || '',
            });
        }
    });

    return results;
}

export function parseLatestUpdates($: cheerio.CheerioAPI, baseUrl: string): PartialSourceManga[] {
    const results: PartialSourceManga[] = [];
    
    $('div.item').each((_, element) => {
        const $elem = $(element);
        const $link = $elem.find('a').first();
        const url = $link.attr('href');
        const title = $elem.find('h3').text().trim();
        const image = $elem.find('img').attr('src');

        if (url && title) {
            results.push({
                mangaId: url,
                title: title,
                image: image || '',
            });
        }
    });

    return results;
}
