import { ContentRating, type SourceInfo, SourceIntents } from "@paperback/types";

export default {
  name: "mangapark",
  description: "Extension that pulls content from mangapark.net.",
  version: "0.0.01",
  icon: "icon.png",
  language: "multi",
  contentRating: ContentRating.EVERYONE,
  capabilities: [
    SourceIntents.DISCOVER_SECIONS,
    SourceIntents.MANGA_SEARCH,
    SourceIntents.MANGA_CHAPTERS,
    SourceIntents.SETTINGS_UI,
  ],
  badges: [],
  developers: [
    {
      name: "Kinso",
      github: "guithub.com/xdkinso",
    }
  ],
} satisfies SourceInfo;
