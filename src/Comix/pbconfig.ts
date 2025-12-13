/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright © 2025 Inkdex */

import { ContentRating, SourceIntents, type ExtensionInfo } from "@paperback/types";

export default {
  name: "Comix",
  description: "Extension for Comix - A manga/comic reading website at comix.to",
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
