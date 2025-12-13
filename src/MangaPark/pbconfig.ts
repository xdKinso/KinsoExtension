/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright © 2025 Inkdex */

import { ContentRating, SourceIntents, type ExtensionInfo } from "@paperback/types";

export default {
  name: "MangaPark",
  description: "Extension for MangaPark - A manga reading website at mangapark.net",
  version: "1.0.0",
  icon: "icon.png",
  language: "en",
  contentRating: ContentRating.MATURE,
  capabilities:
    SourceIntents.SETTINGS_FORM_PROVIDING |
    SourceIntents.DISCOVER_SECIONS_PROVIDING |
    SourceIntents.SEARCH_RESULTS_PROVIDING |
    SourceIntents.CHAPTER_PROVIDING,
  badges: [],
  developers: [
    {
      name: "Kinso",
      github: "https://github.com/xdKinso",
    },
  ],
} satisfies ExtensionInfo;
