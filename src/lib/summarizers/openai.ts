import OpenAISettings from "@components/settings/summarizers/OpenAI";
import { getCompletion } from "../api/openai";
import { Summarizer } from "../summarizers";
import { sanitizeContent } from "./utils";

const defaultPrompts = [
  {
    role: "user",
    content:
      "I want you to act like a you are a professional editor who understands multiple languages." +
      "You will summarize the content so readers can get the essence of the article, while keep it short and precise." +
      "You will only reply with the summary, and nothing else.",
  },
];

const summarize = async (
  title: string,
  content: string,
  options: any
): Promise<string> => {
  if (!options?.apikey) {
    throw new Error("openai api key not set.");
  }

  return await getCompletion(options.apikey, [
    ...defaultPrompts,
    { role: "user", content: sanitizeContent(`${title}\n${content}`, 3000) },
    {
      role: "user",
      content: "you must response with the same language used in the content",
    },
  ]);
};

export default {
  id: "openai",
  name: "OpenAI",
  SettingsComp: OpenAISettings,
  summarize,
} as Summarizer;
