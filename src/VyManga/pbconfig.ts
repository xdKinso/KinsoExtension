import { ContentRating, SourceIntents, type SourceInfo } from "@paperback/types";

export default {
  name: "VyManga",
  description: "Extension that pulls content from vymanga.com.",
  version: "0.0.6",
  icon: "icon.png",
  language: "en",
  contentRating: ContentRating.MATURE,
  capabilities: [
    SourceIntents.DISCOVER_SECIONS_PROVIDING,
    SourceIntents.MANGA_SEARCH,
    SourceIntents.MANGA_CHAPTERS,
  ],
  badges: [],
  developers: [
    {
      name: "Kinso",
      github: "https://github.com/xdKinso",
    },
  ],
} satisfies SourceInfo;
