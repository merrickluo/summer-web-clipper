import { storage } from "webextension-polyfill";
import { notionSettingsKey } from "./constants";
import { Either } from "./types";
import { NotionSummarizer } from "./summarizer/notion";

export interface Summarizer {
  summarize(title: string, content: string): Promise<Either<string>>;
}

const avaiableSummarizer = (): Summarizer[] => {
  return [];
};

export const newNotionSummarizer = async (): Promise<NotionSummarizer> => {
  const settings = await storage.local.get(notionSettingsKey);

  return new NotionSummarizer(settings[notionSettingsKey].spaceId);
};
