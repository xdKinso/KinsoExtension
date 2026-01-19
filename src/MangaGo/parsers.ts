import type { CheerioAPI } from "cheerio";
import type { DiscoverSectionItem } from "@paperback/types";

export class MangaGoParser {
  extractMangaId(href: string): string {
    // Try to match /read-manga/ URLs first
    let match = href.match(/\/read-manga\/([^/?]+)/);
    if (match?.[1]) return match[1];

    // Try to match /read/ (chapter) URLs and extract manga ID
    // Example: /read/manga-id/chapter-slug
    match = href.match(/\/read\/([^/?]+)/);
    if (match?.[1]) {
      // Remove any chapter part (usually starts with chapter_ or c_)
      const parts = match[1].split('/');
      return parts[0] ?? "";
    }

    return "";
  }

  parseFeaturedManga($: CheerioAPI): DiscoverSectionItem[] {
    const items: DiscoverSectionItem[] = [];
    const seenIds = new Set<string>();

    const $container = $("div#recommand");
    $container.find("a[href*='/read-manga/']").each((_, element) => {
      const $link = $(element);
      const href = $link.attr("href") || "";
      const mangaId = this.extractMangaId(href);
      if (!mangaId || seenIds.has(mangaId)) return;

      const $img = $link.find("img").first();
      if (!$img.length) return;

      let imageUrl =
        $img.attr("src") || $img.attr("data-src") || $img.attr("data-original") || "";
      let title = $img.attr("alt") || $img.attr("title") || $link.text().trim();
      title = title.replace(" manga", "").trim();

      if (!title || !imageUrl) return;

      seenIds.add(mangaId);
      items.push({
        type: "prominentCarouselItem",
        mangaId: mangaId,
        title: title,
        imageUrl: imageUrl,
      });
    });

    return items;
  }

  parseNewChapters($: CheerioAPI): DiscoverSectionItem[] {
    const items: DiscoverSectionItem[] = [];
    const seenIds = new Set<string>();

    // Look for div.flexl_listitem items
    $("div.flexl_listitem").each((_, element) => {
      const $item = $(element);
      // Prefer the link which points to a manga page; fall back to the first anchor
      const $link =
        $item.find("a[href*='/read-manga/']").first() ||
        $item.find("div.updatesli div.left a.thm-effect").first();

      const href = $link?.attr("href") || "";

      // Skip if no href found
      if (!href) return;

      const mangaId = this.extractMangaId(href);

      // Skip if mangaId extraction failed or already seen
      if (!mangaId || seenIds.has(mangaId)) return;

      const $img = $link.find("img").first();
      if (!$img.length) return;

      let imageUrl =
        $img.attr("src") || $img.attr("data-src") || $img.attr("data-original") || "";
      let title = $img.attr("alt") || $img.attr("title") || $link.attr("title") || "";
      title = title.replace(" manga", "").trim();

      if (!title || !imageUrl) return;

      seenIds.add(mangaId);
      items.push({
        type: "simpleCarouselItem",
        mangaId: mangaId,
        title: title,
        imageUrl: imageUrl,
      });
    });

    return items;
  }

  parsePopularManga($: CheerioAPI, sectionIndex: number): DiscoverSectionItem[] {
    const items: DiscoverSectionItem[] = [];
    const seenIds = new Set<string>();

    const $sections = $("div.left");

    // Get the nth section
    let currentSection = 0;
    $sections.each((_, element) => {
      currentSection++;
      if (currentSection !== sectionIndex) return;

      // Parse items in this section - look for div.flexl_listitem
      const $container = $(element);
      $container.find("div.flexl_listitem").each((_, itemElement) => {
        const $item = $(itemElement);
        const $link =
          $item.find("a[href*='/read-manga/']").first() ||
          $item.find("div.updatesli div.left a.thm-effect").first();
        const href = $link?.attr("href") || "";
        
        if (!href) return;
        
        const mangaId = this.extractMangaId(href);
        if (!mangaId || seenIds.has(mangaId)) return;

        const $img = $link.find("img").first();
        if (!$img.length) return;

        let imageUrl =
          $img.attr("src") || $img.attr("data-src") || $img.attr("data-original") || "";
        let title = $img.attr("alt") || $img.attr("title") || $link.attr("title") || "";
        title = title.replace(" manga", "").trim();

        if (!title || !imageUrl) return;

        seenIds.add(mangaId);
        items.push({
          type: "simpleCarouselItem",
          mangaId: mangaId,
          title: title,
          imageUrl: imageUrl,
        });
      });
    });

    return items;
  }

  extractAuthor($: CheerioAPI): string {
    const $authorLink = $('a[href*="/author/"]').first();
    return $authorLink.text().trim() || "Unknown";
  }

  extractStatus($: CheerioAPI): string {
    const statusText = $(".status, .manga-status").text().trim().toLowerCase();
    if (statusText.includes("ongoing")) return "Ongoing";
    if (statusText.includes("completed")) return "Completed";
    return "Unknown";
  }

  extractGenres($: CheerioAPI): { id: string; title: string }[] {
    const tags: { id: string; title: string }[] = [];
    $('a[href*="/genre/"]').each((_, element) => {
      const $tag = $(element);
      const href = $tag.attr("href") || "";
      const tag = $tag.text().trim();

      if (tag) {
        const genreMatch = href.match(/\/genre\/([^/?]+)/);
        if (genreMatch && genreMatch[1]) {
          const id = genreMatch[1].toLowerCase();
          if (id && /^[a-zA-Z0-9._\-@()\[\]%?#+=/&:]+$/.test(id)) {
            tags.push({ id: id, title: tag });
          }
        }
      }
    });

    return tags;
  }
}
