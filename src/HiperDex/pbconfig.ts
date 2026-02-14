/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright © 2026 Inkdex */

import { ContentRating, type ExtensionInfo, SourceIntents } from "@paperback/types";
import { getVersion } from "../generic/utils";

export default {
  name: "HiperDex",
  description: "Extension that pulls content from hiperdex.com.",
  version: "0.0.1",
  icon: "icon.png",
  language: "en",
  contentRating: ContentRating.ADULT,
  badges: [],
  capabilities:
    SourceIntents.CHAPTER_PROVIDING |
    SourceIntents.DISCOVER_SECIONS_PROVIDING |
    SourceIntents.SETTINGS_FORM_PROVIDING |
    SourceIntents.SEARCH_RESULTS_PROVIDING |
    SourceIntents.CLOUDFLARE_BYPASS_PROVIDING,
  developers: [
    {
      name: "xdKinso",
      github: "https://github.com/XdKinso",
    },
  ],
} satisfies ExtensionInfo;
