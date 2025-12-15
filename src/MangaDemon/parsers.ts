import {
    ContentRating,
    type Chapter,
    type SearchResultItem,
    type SourceManga,
    type DiscoverSectionItem,
} from '@paperback/types';
import type { CheerioAPI } from 'cheerio';

export function parseSearchResults($: CheerioAPI, baseUrl: string): SearchResultItem[] {
    const results: SearchResultItem[] = [];
    
    $('div.advanced-element, div.updates-element, body > a[href]').each((_, element) => {
        const $elem = $(element);
        const $link = $elem.find('a, h1 a').first();
        const url = $link.attr('href') || $elem.attr('href');
        const title = $link.text().trim() || $elem.find('h1, div.seach-right > div').first().text().trim();
        const imageUrl = $elem.find('img').attr('src') || '';

        if (url && title) {
            results.push({
                mangaId: encodeURIComponent(url),
                imageUrl: imageUrl,
                title: title,
            });
        }
    });

    return results;
}

export function parseMangaDetails($: CheerioAPI, mangaId: string): SourceManga {
    const $container = $('div#manga-info-container');
    
    const title = $container.find('h1.big-fat-titles').first().text().trim() || 'Unknown';
    const thumbnailUrl = $container.find('div#manga-page img').attr('src') || '';
    const synopsis = $container.find('div#manga-info-rightColumn > div > div.white-font').text().trim();
    
    let author = 'Unknown';
    $container.find('div#manga-info-stats > div').each((_, elem) => {
        const $div = $(elem);
        const firstLi = $div.find('li').first().text().trim();
        if (firstLi.includes('Author')) {
            author = $div.find('li').eq(1).text().trim();
        }
    });

    const tags: { id: string; title: string }[] = [];
    $container.find('div.genres-list > li').each((_, elem) => {
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
            contentRating: ContentRating.MATURE,
            status: 'ONGOING',
            tagGroups: tags.length > 0 ? [{ id: 'genre', title: 'Genres', tags }] : [],
        },
    };
}

export function parseChapters($: CheerioAPI, sourceManga: SourceManga): Chapter[] {
    const chapters: Chapter[] = [];

    $('div#chapters-list a.chplinks').each((_, element) => {
        const $elem = $(element);
        const url = $elem.attr('href');
        const title = $elem.clone().children().remove().end().text().trim();
        const dateText = $elem.find('span').text().trim();

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
                chapterId: encodeURIComponent(url),
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
    $('div > img.imgholder').each((_, element) => {
        const src = $(element).attr('src');
        if (src) pages.push(src);
    });
    return pages;
}

export function parseMostViewedToday($: CheerioAPI, baseUrl: string): DiscoverSectionItem[] {
    const results: DiscoverSectionItem[] = [];
    
    // The "Most Viewed Today" section contains direct anchor tags with images
    $('h1:contains("Most Viewed Today")').parent().find('a[href*="/manga/"]').each((_, element) => {
        const $elem = $(element);
        const url = $elem.attr('href');
        const $img = $elem.find('img');
        const imageUrl = $img.attr('src');
        const title = $img.attr('alt') || $elem.text().trim();

        if (url && title && imageUrl) {
            results.push({
                mangaId: encodeURIComponent(url),
                imageUrl,
                title,
            } as DiscoverSectionItem);
        }
    });

    return results;
}

export function parseLatestTranslations($: CheerioAPI, baseUrl: string): DiscoverSectionItem[] {
    const results: DiscoverSectionItem[] = [];
    
    // The "Our Latest Translations" section contains direct anchor tags
    $('h1:contains("Our Latest Translations")').parent().find('a[href*="/manga/"]').each((_, element) => {
        const $elem = $(element);
        const url = $elem.attr('href');
        const $img = $elem.find('img');
        const imageUrl = $img.attr('src');
        const title = $img.attr('alt') || $elem.text().trim();

        if (url && title && imageUrl) {
            results.push({
                mangaId: encodeURIComponent(url),
                imageUrl,
                title,
            } as DiscoverSectionItem);
        }
    });

    return results;
}

export function parseLatestUpdates($: CheerioAPI, baseUrl: string): DiscoverSectionItem[] {
    const results: DiscoverSectionItem[] = [];
    
    // Find the "Latest Updates" heading and get everything after it until the next major section
    let foundLatestUpdates = false;
    let foundNextSection = false;
    
    $('h1, h2').each((_, element) => {
        const $elem = $(element);
        const text = $elem.text().trim();
        
        // Mark when we find Latest Updates section
        if ($elem.is('h1') && text === 'Latest Updates') {
            foundLatestUpdates = true;
            return; // continue to next iteration
        }
        
        // Stop when we hit another h1 section after Latest Updates
        if (foundLatestUpdates && $elem.is('h1') && text !== 'Latest Updates') {
            foundNextSection = true;
            return false; // break the loop
        }
        
        // Process h2 elements within Latest Updates section
        if (foundLatestUpdates && !foundNextSection && $elem.is('h2')) {
            const $link = $elem.find('a[href*="/manga/"]').first();
            const url = $link.attr('href');
            const title = $link.text().trim();
            
            if (url && title) {
                // Try to find the manga's thumbnail by fetching from the manga details page structure
                // For now, use a placeholder or try to find nearby images
                const $section = $elem.closest('section, article, div[class]');
                let imageUrl = $section.find('img[src]').first().attr('src');
                
                // If no image found in section, look in siblings before this h2
                if (!imageUrl) {
                    imageUrl = $elem.prevAll().find('img[src]').first().attr('src');
                }
                
                // Still no image? Check parent's images
                if (!imageUrl) {
                    imageUrl = $elem.parent().find('img[src]').first().attr('src');
                }
                
                if (imageUrl) {
                    const encodedUrl = encodeURIComponent(url);
                    if (!results.some(r => 'mangaId' in r && r.mangaId === encodedUrl)) {
                        results.push({
                            mangaId: encodedUrl,
                            imageUrl,
                            title,
                        } as DiscoverSectionItem);
                    }
                }
            }
        }
    });

    return results;
}
