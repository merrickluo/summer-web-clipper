import { SettingsFormProps } from "@src/components/settings/types";
import { FC } from "react";
import { Settings } from "./settings";

import NotionSummarizer from "./summarizer/notion";

export interface Summarizer {
  id: string;
  name: string;
  SettingsComp: FC<SettingsFormProps>;

  summarize(title: string, content: string, options: any): Promise<string>;
}

export const avaiableSummarizers = [NotionSummarizer];

export const selectedSummarizer = (settings: Settings) => {
  return avaiableSummarizers.find((s) => s.id == settings.selectedSummarizer);
};
