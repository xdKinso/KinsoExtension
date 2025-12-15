import {
    ContentRating,
    type Chapter,
    type SearchResultItem,
    type SourceManga,
} from '@paperback/types';
import type { CheerioAPI } from 'cheerio';

export function parseSearchResults($: CheerioAPI, _baseUrl: string): SearchResultItem[] {
    const results: SearchResultItem[] = [];
    
    $('div.list-story-item').each((_, element) => {
        const $elem = $(element);
        const $link = $elem.find('h3 a').first();
        const url = $link.attr('href');
        const title = $link.attr('title') || $link.text().trim();
        const imageUrl = $elem.find('img').attr('src') || '';

        if (url && title) {
            results.push({
                mangaId: url,
                imageUrl,
                title,
                subtitle: undefined,
            });
        }
    });

    return results;
}

export function parseMangaDetails($: CheerioAPI, mangaId: string): SourceManga {
    const $infoPanel = $('div.panel-story-info');
    
    const title = $infoPanel.find('h1').first().text().trim() || 'Unknown';
    const thumbnailUrl = $infoPanel.find('span.info-image img').attr('src') || '';
    const synopsis = $('div#panel-story-info-description').text().replace('Description :', '').trim();
    const author = $infoPanel.find('td.table-label:contains("Author")').next().text().trim();

    const tags: { id: string; title: string }[] = [];
    $infoPanel.find('td.table-label:contains("Genres")').next().find('a').each((_, elem) => {
        const genreText = $(elem).text().trim();
        if (genreText) {
            tags.push({ id: genreText.toLowerCase(), title: genreText });
        }
    });

    return {
        mangaId,
        mangaInfo: {
            primaryTitle: title,
            secondaryTitles: [],
            thumbnailUrl,
            synopsis,
            contentRating: ContentRating.EVERYONE,
            status: 'ONGOING',
            tagGroups: tags.length > 0 ? [{ id: 'genre', title: 'Genres', tags }] : [],
        },
    };
}

export function parseChapters($: CheerioAPI, sourceManga: SourceManga): Chapter[] {
    const chapters: Chapter[] = [];

    $('div.row-content-chapter li.a-h').each((_, element) => {
        const $elem = $(element);
        const $link = $elem.find('a').first();
        const url = $link.attr('href');
        const title = $link.text().trim();
        const dateText = $elem.find('span.chapter-time').attr('title') || '';

        if (url && title) {
            let publishDate = new Date(0);
            if (dateText) {
                try {
                    publishDate = new Date(dateText);
                } catch {
                    // Keep default
                }
            }

            chapters.push({
                chapterId: url,
                sourceManga,
                title,
                langCode: '🇬🇧',
                chapNum: parseFloat(title.match(/\d+(\.\d+)?/)?.[0] || '0'),
                publishDate,
            });
        }
    });

    return chapters;
}

export function parseChapterPages($: CheerioAPI): string[] {
    const pages: string[] = [];
    $('div.container-chapter-reader img').each((_, element) => {
        const src = $(element).attr('src');
        if (src) pages.push(src);
    });
    return pages;
}
