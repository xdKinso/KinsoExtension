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
    
    // MangaBats uses the same structure as MangaBox (keiyoushi implementation)
    // Containers: .list-truyen-item-wrap or .list-comic-item-wrap
    const $items = $('div.list-truyen-item-wrap, div.list-comic-item-wrap, .story_item, .manga-item');
    
    $items.each((_, element) => {
        const $el = $(element);
        
        // Get URL and title from h3 > a (or alternative selectors)
        const $link = $el.find('h3 a, .story_title a, .manga-title a').first();
        if (!$link.length) return;
        
        const url = $link.attr('href')?.trim();
        const title = $link.attr('title')?.trim() || $link.text().trim();
        
        // Get image
        const $img = $el.find('img').first();
        const imageUrl = $img.attr('src')?.trim() || $img.attr('data-src')?.trim() || '';
        
        if (url && title && !seen.has(url)) {
            seen.add(url);
            results.push({
                mangaId: url,
                imageUrl: imageUrl,
                title,
            });
        }
    });

    return results;
}

export function parseMangaDetails($: CheerioAPI, mangaId: string): SourceManga {
    // Get title from various possible selectors
    let title = $('h1.manga-title, h1.post-title, .manga-info-top h1, h1').first().text().trim();
    if (!title) {
        title = $('meta[property="og:title"]').attr('content')?.trim() || 'Unknown';
    }
    
    // Get cover image - use MangaBox selectors
    let thumbnailUrl = '';
    let $img = $('div.manga-info-pic img, span.info-image img, .manga-cover img').first();
    
    // Fallback to any img with relevant src
    if (!$img.length) {
        $img = $('img[src*="thumb"], img[src*="cover"], img[alt*="cover"]').first();
    }
    
    if ($img.length) {
        thumbnailUrl = $img.attr('src')?.trim() || $img.attr('data-src')?.trim() || '';
    }
    
    // Fallback to og:image meta tag
    if (!thumbnailUrl) {
        thumbnailUrl = $('meta[property="og:image"]').attr('content')?.trim() || '';
    }
    
    // Get description/synopsis
    let synopsis = '';
    let $desc = $('div#noidungm, div#panel-story-info-description, div#contentBox, .manga-summary, .manga-description').first();
    
    if ($desc.length) {
        synopsis = $desc.text().trim();
    }
    
    // Fallback to meta description
    if (!synopsis) {
        synopsis = $('meta[name="description"], meta[property="og:description"]').attr('content')?.trim() || '';
    }
    
    // Get genres/tags
    const tags: { id: string; title: string }[] = [];
    const seenTags = new Set<string>();
    
    // Try various genre selectors (MangaBox compatible)
    $('div.manga-info-top li:contains(genres) a, a[href*="genre"], a[href*="tag"], [class*="genre"] a, [class*="tag"] a').each((_, elem) => {
        const text = $(elem).text().trim();
        if (text && text.length > 0 && !text.toLowerCase().includes('genre') && !text.toLowerCase().includes('tag')) {
            if (!seenTags.has(text.toLowerCase())) {
                seenTags.add(text.toLowerCase());
                const slugId = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
                tags.push({ id: slugId, title: text });
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
