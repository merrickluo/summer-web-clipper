import { SettingsFormProps } from "@components/types";
import { FC } from "react";
import { Doc } from "./readbility";
import { Settings } from "./settings";

import NotionSummarizer from "./summarizers/notion";
import OpenAISummarizer from "./summarizers/openai";

export interface Summarizer {
  id: string;
  name: string;
  SettingsComp: FC<SettingsFormProps>;

  summarize(doc: Doc, options: any): Promise<string>;
}

export const availableSummarizers = [NotionSummarizer, OpenAISummarizer];

export const selectedSummarizer = (settings: Settings) => {
  return availableSummarizers.find((s) => s.id == settings.selectedSummarizer);
};
