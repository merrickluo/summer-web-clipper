import OpenAISettings from "@components/settings/summarizers/openai";
import { Doc } from "@lib/readbility";
import { getCompletion } from "../api/openai";
import { Summarizer } from "../summarizers";
import { sanitizeContent, systemPrompt } from "./utils";

interface OpenAIProvider {
  name: string;
  baseURL: string;
  models: string[];
}

export const providers: OpenAIProvider[] = [
  {
    name: "openai",
    baseURL: "https://api.openai.com",
    models: ["gpt-4o-mini", "gpt-4o", "o3-mini", "o1", "o1-mini"],
  },
  {
    name: "groq",
    baseURL: "https://api.groq.com/openai",
    models: ["llama-3.3-70b-versatile"],
  },
  {
    name: "mistral",
    baseURL: "https://api.mistral.ai",
    models: ["mistral-large-latest"],
  },
  {
    name: "deepseek",
    baseURL: "https://api.deepseek.com",
    models: ["deepseek-chat", "deepseek-reasoner"],
  },
];

const defaultPrompts = [
  {
    role: "system",
    content: systemPrompt,
  },
];

const summarize = async (doc: Doc, options: any): Promise<string> => {
  if (!options?.apikey) {
    throw new Error("api key not set.");
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
  name: "OpenAI Compatible",
  SettingsComp: OpenAISettings,
  summarize,
} as Summarizer;
