// Paperback extension configuration for MangaDemon
import {
    ContentRating,
    SourceIntents,
    type SourceInfo,
} from "@paperback/types";

export default {
    name: "MangaDemon",
    description: "Extension that pulls content from demonicscans.org.",
    version: "0.0.02",
    icon: "icon.png",
    language: "🇺🇸",
    contentRating: ContentRating.EVERYONE,
    badges: [],
    capabilities:
        SourceIntents.MANGA_CHAPTERS |
        SourceIntents.DISCOVER_SECIONS |
        SourceIntents.SETTINGS_UI |
        SourceIntents.MANGA_SEARCH |
        SourceIntents.CLOUDFLARE_BYPASS_REQUIRED,
    developers: [
        {
            name: "Kinso",
            github: "https://github.com/xdKinso",
        },
    ],
} satisfies SourceInfo;
