import OpenAISettings from "@components/settings/summarizers/OpenAI";
import { Doc } from "@lib/readbility";
import { getCompletion } from "../api/openai";
import { Summarizer } from "../summarizers";
import { sanitizeContent } from "./utils";

const defaultPrompts = [
  {
    role: "user",
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

  let language = doc.language;

  return await getCompletion(options.apikey, [
    ...defaultPrompts,
    {
      role: "user",
      content: sanitizeContent(`${doc.title}\n${doc.textContent}`, 2048),
    },
    {
      role: "user",
      content: `summarize the above document in ${language}.`,
    },
  ]);
};

export default {
  id: "openai",
  name: "ChatGPT",
  SettingsComp: OpenAISettings,
  summarize,
} as Summarizer;
