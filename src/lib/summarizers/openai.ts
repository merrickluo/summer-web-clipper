import OpenAISettings from "@components/settings/summarizers/openai";
import { Doc } from "@lib/readbility";
import { getCompletion } from "../api/openai";
import { Summarizer } from "../summarizers";
import { sanitizeContent, systemPrompt } from "./utils";

interface OpenAIProvider {
  name: string;
  baseurl: string;
  models: string[];
}

export const providers: OpenAIProvider[] = [
  {
    name: "openai",
    baseurl: "https://api.openai.com",
    models: ["gpt-4.1-mini", "gpt-4.1", "o4-mini", "o3"],
  },
  {
    name: "groq",
    baseurl: "https://api.groq.com/openai",
    models: ["llama-3.3-70b-versatile"],
  },
  {
    name: "mistral",
    baseurl: "https://api.mistral.ai",
    models: ["mistral-large-latest"],
  },
  {
    name: "deepseek",
    baseurl: "https://api.deepseek.com",
    models: ["deepseek-chat", "deepseek-reasoner"],
  },
];

const summarize = async (doc: Doc, options: any): Promise<string> => {
  if (!options?.baseurl || !options?.apikey || !options?.model) {
    throw new Error(
      "OpenAI backend is not properly configured, pls review it in Options."
    );
  }

  let language = options.language || doc.language;
  let maxwords = Number(options.maxwords) || 12000;

  return await getCompletion(options.baseurl, options.apikey, options.model, [
    {
      role: "system",
      content: systemPrompt(language),
    },
    {
      role: "user",
      content: sanitizeContent(`${doc.title}\n${doc.textContent}`, maxwords),
    },
  ]);
};

export default {
  id: "openai",
  name: "OpenAI Compatible",
  SettingsComp: OpenAISettings,
  summarize,
} as Summarizer;
