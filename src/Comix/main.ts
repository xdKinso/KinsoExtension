/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright © 2025 Inkdex */

import {
  BasicRateLimiter,
  ContentRating,
  DiscoverSectionType,
  Form,
  type Chapter,
  type ChapterDetails,
  type ChapterProviding,
  type DiscoverSection,
  type DiscoverSectionItem,
  type DiscoverSectionProviding,
  type Extension,
  type MangaProviding,
  type PagedResults,
  type SearchFilter,
  type SearchQuery,
  type SearchResultItem,
  type SearchResultsProviding,
  type SettingsFormProviding,
  type SourceManga,
  type Tag,
} from "@paperback/types";

import { SettingsForm } from "./forms";
import { MainInterceptor } from "./network";

const COMIX_DOMAIN = "https://comix.to";

type ComixImplementation = SettingsFormProviding &
  Extension &
  DiscoverSectionProviding &
  SearchResultsProviding &
  MangaProviding &
  ChapterProviding;

export class ComixExtension implements ComixImplementation {
  mainRateLimiter = new BasicRateLimiter("main", {
    numberOfRequests: 4,
    bufferInterval: 1,
    ignoreImages: true,
  });

  mainInterceptor = new MainInterceptor("main");

  async initialise(): Promise<void> {
    this.mainRateLimiter.registerInterceptor();
    this.mainInterceptor.registerInterceptor();
  }

  async getSettingsForm(): Promise<Form> {
    return new SettingsForm();
  }

  async getDiscoverSections(): Promise<DiscoverSection[]> {
    return [
      {
        id: "latest-updates",
        title: "Latest Updates",
        type: DiscoverSectionType.simpleCarousel,
      },
      {
        id: "popular",
        title: "Popular",
        type: DiscoverSectionType.simpleCarousel,
      },
    ];
  }

  async getDiscoverSectionItems(
    sectionId: string,
    metadata: unknown,
  ): Promise<PagedResults<DiscoverSectionItem>> {
    const page = (metadata as { page?: number })?.page ?? 1;
    
    const url = `${COMIX_DOMAIN}/home`;

    try {
      const request = new Request(url);
      const response = await request.send();
      const $ = Application.Cheerio.load(response.data);

      const items: DiscoverSectionItem[] = [];
      
      // Parse manga items from the home page
      $('a[href*="/title/"]').each((_, element) => {
        const href = $(element).attr('href');
        if (!href) return;
        
        const match = href.match(/\/title\/([^\/]+)/);
        if (!match) return;
        
        const mangaId = match[1];
        const title = $(element).text().trim();
        
        const img = $(element).find('img').first();
        const coverUrl = img.attr('src') || img.attr('data-src') || '';
        
        if (title && mangaId && !items.find(item => item.id === mangaId)) {
          items.push({
            id: mangaId,
            title: title,
            coverUrl: coverUrl,
          });
        }
      });
      
      return {
        items: items.slice(0, 20),
        metadata: { page: page + 1 },
      };
    } catch (error) {
      console.error(`Error fetching discover section ${sectionId}:`, error);
      return { items: [], metadata };
    }
  }

  async getSearchFilters(): Promise<SearchFilter[]> {
    return [];
  }

  async getSearchResults(
    query: SearchQuery,
    metadata: unknown,
  ): Promise<PagedResults<SearchResultItem>> {
    const page = (metadata as { page?: number })?.page ?? 1;
    const searchTerm = query.title ?? "";

    if (!searchTerm) {
      return { items: [], metadata };
    }

    const url = `${COMIX_DOMAIN}/search?q=${encodeURIComponent(searchTerm)}`;

    try {
      const request = new Request(url);
      const response = await request.send();
      const $ = Application.Cheerio.load(response.data);

      const results: SearchResultItem[] = [];
      
      $('a[href*="/title/"]').each((_, element) => {
        const href = $(element).attr('href');
        if (!href) return;
        
        const match = href.match(/\/title\/([^\/]+)/);
        if (!match) return;
        
        const mangaId = match[1];
        const title = $(element).text().trim();
        
        const img = $(element).find('img').first();
        const coverUrl = img.attr('src') || img.attr('data-src') || '';
        
        if (title && mangaId && !results.find(item => item.id === mangaId)) {
          results.push({
            id: mangaId,
            title: title,
            coverUrl: coverUrl,
          });
        }
      });
      
      return {
        items: results,
        metadata: { page: page + 1 },
      };
    } catch (error) {
      console.error("Error during search:", error);
      return { items: [], metadata };
    }
  }

  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    const url = `${COMIX_DOMAIN}/title/${mangaId}`;

    try {
      const request = new Request(url);
      const response = await request.send();
      const $ = Application.Cheerio.load(response.data);

      const primaryTitle = $('h1').first().text().trim() || 
                          $('title').text().replace(' - Comix', '').trim();
      
      const secondaryTitles: string[] = [];
      $('h3').first().text().split('/').forEach(title => {
        const cleaned = title.trim();
        if (cleaned && cleaned !== primaryTitle) {
          secondaryTitles.push(cleaned);
        }
      });
      
      const coverUrl = $('img[src*="static.comix.to"]').first().attr('src') || '';
      
      const synopsis = $('p').filter((_, el) => {
        const text = $(el).text();
        return text.length > 100;
      }).first().text().trim();
      
      const ratingText = $('.rating, [class*="rating"]').text();
      const rating = parseFloat(ratingText) || 0;
      
      const tags: Tag[] = [];
      $('a[href*="/genres/"], a[href*="/tags/"]').each((_, el) => {
        const tagName = $(el).text().trim();
        if (tagName) {
          tags.push({
            id: tagName.toLowerCase().replace(/\s+/g, '-'),
            label: tagName,
          });
        }
      });
      
      let contentRating = ContentRating.EVERYONE;
      const tagLabels = tags.map(t => t.label.toLowerCase());
      if (tagLabels.some(t => ['ecchi', 'mature', 'adult'].includes(t))) {
        contentRating = ContentRating.MATURE;
      }
      
      return {
        mangaId,
        titles: [primaryTitle, ...secondaryTitles],
        coverUrl: coverUrl,
        author: '',
        artist: '',
        synopsis: synopsis,
        status: "Ongoing",
        contentRating: contentRating,
        tags: tags,
      };
    } catch (error) {
      console.error(`Error fetching manga details for ${mangaId}:`, error);
      throw error;
    }
  }

  async getChapters(mangaId: string): Promise<Chapter[]> {
    const url = `${COMIX_DOMAIN}/title/${mangaId}`;

    try {
      const request = new Request(url);
      const response = await request.send();
      const $ = Application.Cheerio.load(response.data);

      const chapters: Chapter[] = [];
      
      $('a[href*="/title/"]').each((_, element) => {
        const href = $(element).attr('href');
        if (!href) return;
        
        const match = href.match(/\/title\/[^\/]+\/(\d+)-chapter-([0-9.]+)/);
        if (!match) return;
        
        const chapterId = match[1];
        const chapterNum = parseFloat(match[2]);
        
        const chapterText = $(element).text().trim();
        const title = chapterText.replace(/^Ch\.?\s*/i, '').trim();
        
        const dateText = $(element).closest('div, li, tr').find('[class*="time"], [class*="date"]').text().trim();
        let timestamp = Date.now();
        
        if (dateText) {
          const timeMatch = dateText.match(/(\d+)\s*(d|h|m|s)/i);
          if (timeMatch) {
            const value = parseInt(timeMatch[1]);
            const unit = timeMatch[2].toLowerCase();
            const multiplier = {
              's': 1000,
              'm': 60 * 1000,
              'h': 60 * 60 * 1000,
              'd': 24 * 60 * 60 * 1000,
            }[unit] || 0;
            timestamp = Date.now() - (value * multiplier);
          }
        }
        
        if (!chapters.find(ch => ch.id === chapterId)) {
          chapters.push({
            id: `${mangaId}/${chapterId}`,
            mangaId: mangaId,
            name: title || `Chapter ${chapterNum}`,
            chapterNumber: chapterNum,
            volume: 0,
            language: 'en',
            timestamp: timestamp,
          });
        }
      });
      
      return chapters.sort((a, b) => (b.chapterNumber ?? 0) - (a.chapterNumber ?? 0));
    } catch (error) {
      console.error(`Error fetching chapters for ${mangaId}:`, error);
      return [];
    }
  }

  async getChapterDetails(chapterId: string): Promise<ChapterDetails> {
    const url = `${COMIX_DOMAIN}/title/${chapterId}`;

    try {
      const request = new Request(url);
      const response = await request.send();
      const $ = Application.Cheerio.load(response.data);

      const pages: string[] = [];
      
      $('script').each((_, script) => {
        const scriptContent = $(script).html();
        if (!scriptContent) return;
        
        const imageMatches = scriptContent.match(/https?:\/\/[^\s"']+\.(?:jpg|jpeg|png|webp)/gi);
        if (imageMatches) {
          imageMatches.forEach(url => {
            if (!pages.includes(url)) {
              pages.push(url);
            }
          });
        }
      });
      
      $('img[src*="static.comix.to"]').each((_, img) => {
        const src = $(img).attr('src') || $(img).attr('data-src');
        if (src && !pages.includes(src)) {
          pages.push(src);
        }
      });
      
      $('img[data-src]').each((_, img) => {
        const src = $(img).attr('data-src');
        if (src && !pages.includes(src)) {
          pages.push(src);
        }
      });
      
      return {
        chapterId,
        pages,
      };
    } catch (error) {
      console.error(`Error fetching chapter details for ${chapterId}:`, error);
      throw error;
    }
  }
}
