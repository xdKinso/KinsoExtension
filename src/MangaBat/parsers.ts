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
    
    // MangaBats has a consistent structure: img followed by h3 with link
    // Look for all img tags first, then get the associated link
    $('img[src*="thumb"]').each((_, imgElement) => {
        const $img = $(imgElement);
        const imageUrl = $img.attr('src')?.trim() || $img.attr('data-src')?.trim() || '';
        
        // Find the link - usually following the img or in parent container
        let $link = $img.closest('a');
        if ($link.length === 0) {
            $link = $img.closest('div, li, article').find('a[href*="/manga/"]').first();
        }
        if ($link.length === 0) {
            $link = $img.next('a, div').find('a[href*="/manga/"]').first();
        }
        
        if ($link.length > 0) {
            const url = $link.attr('href')?.trim();
            let title = $link.attr('title')?.trim() || $link.text().trim();
            
            // Try to get title from h3 or other heading if link doesn't have good text
            if (!title || title.length === 0) {
                const $heading = $link.closest('div, li, article').find('h3').first();
                if ($heading.length) {
                    title = $heading.text().trim();
                }
            }
            
            if (url && title && !seen.has(url)) {
                seen.add(url);
                results.push({
                    mangaId: url,
                    imageUrl: imageUrl,
                    title,
                });
            }
        }
    });
    
    // Fallback: Look for h3 with links if no images found
    if (results.length === 0) {
        $('h3 a[href*="/manga/"]').each((_, element) => {
            const $link = $(element);
            const url = $link.attr('href')?.trim();
            const title = $link.attr('title')?.trim() || $link.text().trim();
            
            let imageUrl = '';
            const $parent = $link.closest('div, li, article');
            const $img = $parent.find('img').first();
            if ($img.length) {
                imageUrl = $img.attr('src')?.trim() || $img.attr('data-src')?.trim() || '';
            }
            
            if (url && title && !seen.has(url)) {
                seen.add(url);
                results.push({
                    mangaId: url,
                    imageUrl: imageUrl,
                    title,
                });
            }
        });
    }

    return results;
}

export function parseMangaDetails($: CheerioAPI, mangaId: string): SourceManga {
    // Try to find title from main heading
    let title = $('h1.manga-title, h1.post-title').first().text().trim();
    
    // If no specific class, try first h1
    if (!title) {
        title = $('h1').first().text().trim();
    }
    
    // Last resort: look for title in meta or from document
    if (!title) {
        title = $('meta[property="og:title"]').attr('content')?.trim() || 'Unknown';
    }
    
    // Cover image - try multiple selectors
    let thumbnailUrl = '';
    
    // Try common image selectors in order of likelihood
    let $img = $('img.manga-cover, img.post-cover, img.manga-poster, figure img').first();
    
    if (!$img.length || !$img.attr('src')) {
        // Try images with alt text
        $img = $('img[alt*="cover"], img[alt*="manga"], img[alt*="poster"]').first();
    }
    
    if (!$img.length || !$img.attr('src')) {
        // Try images with specific src patterns
        $img = $('img[src*="thumb"], img[src*="cover"]').first();
    }
    
    if (!$img.length || !$img.attr('src')) {
        // Try og:image meta tag
        thumbnailUrl = $('meta[property="og:image"]').attr('content')?.trim() || '';
    }
    
    if ($img.length && !thumbnailUrl) {
        thumbnailUrl = $img.attr('src')?.trim() || $img.attr('data-src')?.trim() || '';
    }
    
    // Ensure we have a valid image URL
    if (thumbnailUrl && !thumbnailUrl.startsWith('http')) {
        if (!thumbnailUrl.startsWith('/')) {
            thumbnailUrl = '';
        }
    }
    
    // Synopsis - look for description in multiple places
    let synopsis = '';
    
    // Try description containers
    let $desc = $('[class*="description"], [class*="synopsis"], .manga-excerpt, .summary');
    if ($desc.length) {
        synopsis = $desc.first().text().trim();
    }
    
    // If no description found, try meta description
    if (!synopsis) {
        synopsis = $('meta[name="description"], meta[property="og:description"]').attr('content')?.trim() || '';
    }
    
    // Last resort: find paragraphs with substantial content
    if (!synopsis) {
        $('p').each((_, el) => {
            const text = $(el).text().trim();
            if (text.length > 50 && text.length < 2000) {
                synopsis = text;
                return false; // break
            }
        });
    }

    // Tags/Genres
    const tags: { id: string; title: string }[] = [];
    const seenTags = new Set<string>();
    
    $('a[href*="genre"], a[href*="tag"], [class*="genre"] a, [class*="tag"] a').each((_, elem) => {
        const text = $(elem).text().trim();
        if (text && text.length > 0 && !text.toLowerCase().includes('genre') && !text.toLowerCase().includes('tag')) {
            const genre = text.trim();
            if (genre && !seenTags.has(genre.toLowerCase())) {
                seenTags.add(genre.toLowerCase());
                // Create slug format ID
                const slugId = genre.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
                tags.push({ id: slugId, title: genre });
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
