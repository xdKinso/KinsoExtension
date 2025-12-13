import { ContentRating, SourceIntents, type SourceInfo } from "@paperback/types";

export default {
  name: "MangaFire",
  description: "Extension that pulls content from mangafire.to.",
  version: "0.0.05",
  icon: "icon.png",
  language: "multi",
  contentRating: ContentRating.EVERYONE,
  capabilities: [
    SourceIntents.DISCOVER_SECIONS,
    SourceIntents.MANGA_SEARCH,
    SourceIntents.MANGA_CHAPTERS,
    SourceIntents.SETTINGS_UI,
    SourceIntents.CLOUDFLARE_BYPASS_PROVIDING,
  ],
  badges: [],
  developers: [
    {
      name: "Kinso",
      github: "https://github.com/Kinso",
    },
  ],
} satisfies SourceInfo;
