import { ContentRating, SourceIntents, type SourceInfo } from "@paperback/types";

export default {
  name: "TheBlank",
  description:
    "Extension that pulls content from theblank.net. If you hit Cloudflare, open the source in-app and complete the WebView challenge once to continue.",
  version: "0.0.01",
  icon: "icon.png",
  language: "en",
  contentRating: ContentRating.EVERYONE,
  capabilities: [
    SourceIntents.DISCOVER_SECIONS,
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
