import { ContentRating, SourceIntents, type SourceInfo } from "@paperback/types";

export default {
  name: "Mangaball",
  description: "Extension that pulls content from mangaball.net.",
  version: "0.0.05",
  icon: "icon.png",
  language: "multi",
  contentRating: ContentRating.ADULT,
  capabilities: [
    SourceIntents.DISCOVER_SECIONS_PROVIDING,
    SourceIntents.SEARCH_RESULTS_PROVIDING,
    SourceIntents.CHAPTER_PROVIDING,
  ],
  badges: [],
  developers: [
    {
      name: "Kinso",
    },
  ],
} satisfies SourceInfo;
