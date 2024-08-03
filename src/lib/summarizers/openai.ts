import OpenAISettings from "@components/settings/summarizers/OpenAI";
import { Doc } from "@lib/readbility";
import { getCompletion } from "../api/openai";
import { Summarizer } from "../summarizers";
import { sanitizeContent, systemPrompt } from "./utils";

const defaultPrompts = [
  {
    role: "system",
    content: systemPrompt,
  },
];

const summarize = async (doc: Doc, options: any): Promise<string> => {
  if (!options?.apikey) {
    throw new Error("openai/groq api key not set.");
  }

  let language = options.language || doc.language;
  let maxwords = Number(options.maxwords) || 12000;
  let model = options.model || "gpt-4o-mini";

  return await getCompletion(options.apikey, model, [
    ...defaultPrompts,
    {
      role: "user",
      content: sanitizeContent(`${doc.title}\n${doc.textContent}`, maxwords),
    },
    {
      role: "user",
      content: `summarize the above document in ${language}.`,
    },
  ]);
};

export default {
  id: "openai",
  name: "OpenAI",
  SettingsComp: OpenAISettings,
  summarize,
} as Summarizer;
