import { SettingsFormProps } from "@components/types";
import { FC } from "react";
import { Doc } from "./readbility";
import { Settings } from "./settings";

import OpenAISummarizer from "./summarizers/openai";
import ClaudeSummarizer from "./summarizers/claude";
import GeminiSummarizer from "./summarizers/gemini";

export interface Summarizer {
  id: string;
  name: string;
  SettingsComp: FC<SettingsFormProps>;

  summarize(doc: Doc, options: any): Promise<string>;
}

export const availableSummarizers = [
  ClaudeSummarizer,
  OpenAISummarizer,
  GeminiSummarizer,
];

export const selectedSummarizer = (settings: Settings) => {
  return availableSummarizers.find((s) => s.id == settings.selectedSummarizer);
};
