import OpenAISettings from "@components/settings/summarizers/OpenAI";
import { Doc } from "@lib/readbility";
import { getCompletion } from "../api/openai";
import { Summarizer } from "../summarizers";
import { sanitizeContent } from "./utils";

const defaultPrompts = [
  {
    role: "system",
    content:
      "I want you to act like a you are a professional editor." +
      "You will summarize the document so readers can get the essence of the article, while keep it short and precise." +
      "You will always use an objective tone." +
      "You will only reply with the summary, and nothing else.",
  },
];

const summarize = async (doc: Doc, options: any): Promise<string> => {
  if (!options?.apikey) {
    throw new Error("openai api key not set.");
  }

  let language = options.language || doc.language;
  let maxwords = Number(options.maxwords) || 2048;
  let model = options.model || "gpt-3.5-turbo";

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
