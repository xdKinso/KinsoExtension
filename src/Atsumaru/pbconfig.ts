import { ContentRating, SourceIntents, type ExtensionInfo } from "@paperback/types";

export default {
  name: "Atsumaru",
  description: "Extension that pulls content from atsu.moe",
  version: "0.0.01",
  icon: "icon.png",
  language: "English",
  contentRating: ContentRating.EVERYONE,
  capabilities: [
    SourceIntents.DISCOVER_SECIONS_PROVIDING,
    SourceIntents.SEARCH_RESULTS_PROVIDING,
    SourceIntents.CHAPTER_PROVIDING,
  ],
  badges: [],
  developers: [
    {
      name: "Kinso",
      github: "https://github.com/xdKinso",
    },
  ],
} satisfies ExtensionInfo;
