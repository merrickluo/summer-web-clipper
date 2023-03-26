import NotionSummarizerSettings from "@components/settings/summarizers/Notion";
import { Doc } from "@lib/readbility";
import { getCompletion } from "../api/notion";
import { Summarizer } from "../summarizers";
import { sanitizeContent } from "./utils";

const defaultModel = "openai-3";

const summarize = async (doc: Doc, options: any): Promise<string> => {
  if (!options.spaceId) {
    throw new Error("space not set.");
  }

  const responseText = await getCompletion(
    options.spaceId,
    defaultModel,
    doc.title,
    sanitizeContent(doc.textContent)
  );

  const lines = responseText.split("\n");
  return lines.map(parseLine).join("").trim();
};

const parseLine = (line: string): string => {
  try {
    const data = JSON.parse(line);
    if (data.type == "success") {
      return data.completion;
    }
  } catch (e) {
    // ignore invalid json
  }
  return "";
};

export default {
  id: "notion",
  name: "Notion AI",
  SettingsComp: NotionSummarizerSettings,
  summarize,
} as Summarizer;
