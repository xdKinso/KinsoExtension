import {
    ContentRating,
    type Chapter,
    type SearchResultItem,
    type SourceManga,
} from '@paperback/types';
import type { CheerioAPI } from 'cheerio';

export function parseSearchResults($: CheerioAPI, baseUrl: string): SearchResultItem[] {
    const results: SearchResultItem[] = [];
    
    // Try multiple possible selectors for search/browse results
    const selectors = [
        'div.popular-item-wrap div.popular-item-info > h3 > a', // Popular manga
        'div.panel-story-list div.story-item-wrap h3 > a', // Story list
        'div.list-story-item h3 a', // Generic list
    ];

    selectors.forEach(selector => {
        $(selector).each((_, element) => {
            const $link = $(element);
            const url = $link.attr('href');
            const title = $link.attr('title') || $link.text().trim();
            
            // Find the nearest image
            const $parent = $link.closest('div.popular-item-wrap, div.story-item-wrap, div.list-story-item');
            const imageUrl = $parent.find('img').attr('src') || '';

            if (url && title && !results.find(r => r.mangaId === url)) {
                results.push({
                    mangaId: url,
                    imageUrl,
                    title,
                });
            }
        });
    });

    return results;
}

export function parseMangaDetails($: CheerioAPI, mangaId: string): SourceManga {
    // Try multiple possible selectors
    const title = $('div.manga-info-top h1, div.panel-story-info h1, h1.manga-name').first().text().trim() || 'Unknown';
    const thumbnailUrl = $('div.manga-info-pic img, div.panel-story-info img, img.manga-cover').first().attr('src') || '';
    
    // Synopsis
    let synopsis = '';
    const synopsisSelectors = [
        'div#panel-story-info-description',
        'div.manga-info-text',
        'div.description-summary div.description',
    ];
    for (const sel of synopsisSelectors) {
        synopsis = $(sel).text().replace(/Description\s*:?/i, '').trim();
        if (synopsis) break;
    }

    // Tags/Genres
    const tags: { id: string; title: string }[] = [];
    $('div.manga-info-text li, td.table-label:contains("Genres") + td a, div.genres-content a').each((_, elem) => {
        const $elem = $(elem);
        const text = $elem.text().trim();
        
        // Check if this is a genre line
        if (text.toLowerCase().includes('genre') || $elem.is('a')) {
            const genreText = $elem.is('a') ? text : text.split(':').pop()?.trim();
            if (genreText && !genreText.toLowerCase().includes('genre')) {
                genreText.split(',').forEach(g => {
                    const genre = g.trim();
                    if (genre) {
                        tags.push({ id: genre.toLowerCase(), title: genre });
                    }
                });
            }
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

    // Try multiple chapter list selectors
    const selectors = [
        'div.row-content-chapter li.a-h',
        'div.chapter-list li',
        'ul.row-content-chapter li',
        'div.manga-info-chapter li',
    ];

    selectors.forEach(selector => {
        $(selector).each((_, element) => {
            const $elem = $(element);
            const $link = $elem.find('a').first();
            const url = $link.attr('href');
            const title = $link.text().trim();
            const dateText = $elem.find('span.chapter-time, span.chapter-release-date, span.date').attr('title') 
                || $elem.find('span.chapter-time, span.chapter-release-date, span.date').text().trim();

            if (url && title && !chapters.find(c => c.chapterId === url)) {
                let publishDate = new Date(0);
                if (dateText) {
                    try {
                        publishDate = new Date(dateText);
                        if (isNaN(publishDate.getTime())) {
                            publishDate = new Date(0);
                        }
                    } catch {
                        publishDate = new Date(0);
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
    });

    return chapters;
}

export function parseChapterPages($: CheerioAPI): string[] {
    const pages: string[] = [];
    
    // Try multiple image container selectors
    const selectors = [
        'div.container-chapter-reader img',
        'div.reading-content img',
        'div#chapter-reader img',
        'div.chapter-content img',
    ];

    selectors.forEach(selector => {
        $(selector).each((_, element) => {
            const src = $(element).attr('src') || $(element).attr('data-src');
            if (src && !pages.includes(src)) {
                pages.push(src);
            }
        });
    });

    return pages;
}
