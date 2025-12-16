import {
    ContentRating,
    type Chapter,
    type SearchResultItem,
    type SourceManga,
} from '@paperback/types';
import type { CheerioAPI } from 'cheerio';

export function parseSearchResults($: CheerioAPI, baseUrl: string): SearchResultItem[] {
    const results: SearchResultItem[] = [];
    const seen = new Set<string>();
    
    // MangaBats uses h3 > a for manga titles
    $('h3 a, h1.manga-name').each((_, element) => {
        const $link = $(element);
        const url = $link.attr('href')?.trim();
        const title = $link.attr('title')?.trim() || $link.text().trim();
        
        // Find image - look in parent structure
        let imageUrl = '';
        const $parent = $link.closest('[class*="item"], [class*="manga"], div');
        
        // Try multiple image selectors
        imageUrl = $parent.find('img[src*="storage"], img[src*="img"], img').first().attr('src') || '';
        
        // Only add if we have both URL and title, and haven't seen this before
        if (url && title && !seen.has(url)) {
            seen.add(url);
            results.push({
                mangaId: url,
                imageUrl: imageUrl || '',
                title,
            });
        }
    });

    return results;
}

export function parseMangaDetails($: CheerioAPI, mangaId: string): SourceManga {
    // MangaBats structure - title is in h1
    const title = $('h1').first().text().trim() || 'Unknown';
    
    // Cover image
    let thumbnailUrl = '';
    const $img = $('img[alt*="manga"], img[alt*="cover"], img[src*="thumb"]').first();
    if ($img.length) {
        thumbnailUrl = $img.attr('src') || '';
    }
    
    // Synopsis - look for description text
    let synopsis = '';
    const $descElements = $('div:contains("Description"), div:contains("Summary"), p').filter(function() {
        const text = $(this).text();
        return text.length > 50 && text.length < 2000;
    });
    
    if ($descElements.length) {
        synopsis = $descElements.first().text().replace(/Description\s*:?\s*/gi, '').trim();
    }

    // Tags/Genres - look for genre information
    const tags: { id: string; title: string }[] = [];
    $('a[href*="genre"], span:contains("Genre") ~ *, div:contains("Genre") a').each((_, elem) => {
        const text = $(elem).text().trim();
        if (text && !text.toLowerCase().includes('genre')) {
            text.split(',').forEach(g => {
                const genre = g.trim();
                if (genre) {
                    // Create slug format ID: lowercase and replace spaces/special chars with hyphens
                    const slugId = genre.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
                    tags.push({ id: slugId, title: genre });
                }
            });
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
    const seen = new Set<string>();

    // MangaBats has chapters in divs or list items
    // Look for links that have chapter numbers in them
    $('a[href*="/chapter"], li a').each((_, element) => {
        const $link = $(element);
        const href = $link.attr('href')?.trim();
        const title = $link.text().trim();
        
        // Skip if not a chapter link
        if (!href || !title || !href.includes('/chapter')) {
            return;
        }
        
        // Skip duplicates
        if (seen.has(href)) {
            return;
        }
        seen.add(href);

        // Extract chapter number from title (e.g., "Chapter 1", "Ch. 1.5")
        const chapterMatch = title.match(/\d+(?:\.\d+)?/);
        const chapNum = chapterMatch ? parseFloat(chapterMatch[0]) : 0;

        chapters.push({
            chapterId: href,
            sourceManga,
            title,
            langCode: '🇬🇧',
            chapNum,
            publishDate: new Date(0),
        });
    });

    // Sort chapters in descending order (newest first)
    return chapters.sort((a, b) => b.chapNum - a.chapNum);
}

export function parseChapterPages($: CheerioAPI): string[] {
    const pages: string[] = [];
    
    // MangaBats has images in containers
    // Look for img tags with src or data-src attributes
    $('img[src*="storage"], img[src*="img"], img').each((_, element) => {
        const $img = $(element);
        const src = $img.attr('src')?.trim() || $img.attr('data-src')?.trim();
        
        // Skip if no src, or if it's a thumbnail/icon
        if (!src || src.includes('thumb') || src.includes('icon') || src.includes('logo')) {
            return;
        }
        
        // Skip duplicates
        if (!pages.includes(src)) {
            pages.push(src);
        }
    });

    // Filter out very short page arrays (likely not actual pages)
    return pages.length > 0 ? pages : [];
}
