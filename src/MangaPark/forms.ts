/* SPDX-License-Identifier: GPL-3.0-or-later */
/* Copyright © 2025 Inkdex */

import { Form, Section, type FormSectionElement } from "@paperback/types";

export class SettingsForm extends Form {
  override getSections(): FormSectionElement[] {
    return [
      Section("info", [
        // Add settings rows here if needed
      ]),
    ];
  }
}
