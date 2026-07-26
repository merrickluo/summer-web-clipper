import { Doc } from "@lib/readbility";
import { getCompletion } from "../api/openai";
import { sanitizeContent, systemPrompt } from "./utils";

const summarize = async (doc: Doc, options: any): Promise<string> => {
  if (!options?.baseurl || !options?.apikey || !options?.model) {
    throw new Error(
      "OpenAI backend is not properly configured, pls review it in Options."
    );
  }

  const language = options.language || doc.language;

  return await getCompletion(
    options.baseurl,
    options.apikey,
    options.model,
    [
      {
        role: "system",
        content: systemPrompt(language),
      },
      {
        role: "user",
        content: sanitizeContent(`${doc.title}\n${doc.textContent}`),
      },
    ],
    {
      serviceTier: options.serviceTier,
      lowVerbosity: options.lowVerbosity,
    },
  );
};

export default {
  id: "openai",
  summarize,
};
