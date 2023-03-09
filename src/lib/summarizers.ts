import { SettingsFormProps } from "@components/types";
import { FC } from "react";
import { Settings } from "./settings";

import NotionSummarizer from "./summarizers/notion";

export interface Summarizer {
  id: string;
  name: string;
  SettingsComp: FC<SettingsFormProps>;

  summarize(title: string, content: string, options: any): Promise<string>;
}

export const availableSummarizers = [NotionSummarizer];

export const selectedSummarizer = (settings: Settings) => {
  return availableSummarizers.find((s) => s.id == settings.selectedSummarizer);
};
