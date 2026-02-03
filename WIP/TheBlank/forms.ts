import { ButtonRow, Form, LabelRow, Section, type FormSectionElement } from "@paperback/types";
import type { TheBlankExtension } from "./main";

export class TheBlankSettingsForm extends Form {
  constructor(private source: TheBlankExtension) {
    super();
  }

  override getSections(): FormSectionElement[] {
    return [
      Section("cookies", [
        ButtonRow("resetCookies", {
          title: "Reset Bypass Cookies",
          onSelect: Application.Selector(this.source as TheBlankExtension, "resetBypassCookies"),
        }),
        LabelRow("resetCookiesInfo", {
          title:
            "Clears all stored cookies/state for this source. You will need to complete the WebView bypass again.",
        }),
      ]),
    ];
  }
}
