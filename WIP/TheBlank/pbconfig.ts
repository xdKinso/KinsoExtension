import { ContentRating, SourceIntents, type ExtensionInfo } from "@paperback/types";

export default {
  name: "TheBlank",
  description:
    "Extension that pulls content from theblank.net. If you hit Cloudflare, open the source in-app and complete the WebView challenge once to continue.",
  version: "0.0.03",
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
      name: "Kinso",
      github: "https://github.com/xdKinso",
    },
  ],
} satisfies ExtensionInfo;
