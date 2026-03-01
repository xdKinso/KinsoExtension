import { ContentRating, SourceIntents, type ExtensionInfo } from "@paperback/types";

export default {
  name: "ComixGallery",
  description: "Extension that pulls content from Comix.to.",
  version: "0.0.11",
  icon: "icon.png",
  language: "en",
  contentRating: ContentRating.EVERYONE,
  capabilities:
    SourceIntents.SETTINGS_FORM_PROVIDING |
    SourceIntents.DISCOVER_SECIONS_PROVIDING |
    SourceIntents.SEARCH_RESULTS_PROVIDING |
    SourceIntents.CHAPTER_PROVIDING |
    SourceIntents.CLOUDFLARE_BYPASS_PROVIDING,
  badges: [],
  developers: [
    {
      name: "xdKinso",
      github: "https://github.com/xdKinso",
    },
  ],
} satisfies ExtensionInfo;
