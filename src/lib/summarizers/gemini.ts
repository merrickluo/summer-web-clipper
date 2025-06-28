import { GoogleGenerativeAI } from "@google/generative-ai";
import { sanitizeContent, systemPrompt } from "./utils";
import { Summarizer } from "../summarizers";
import GeminiSettings from "@components/settings/summarizers/gemini";
import { Doc } from "@lib/readbility";

export const geminiModels = [
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite-preview-06-17",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-pro",
];

export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash-lite-preview-06-17";

const getCompletion = async (
  apikey: string,
  model: string,
  language: string,
  content: string
): Promise<string> => {
  const genAI = new GoogleGenerativeAI(apikey);
  const generativeModel = genAI.getGenerativeModel({ model });

  const result = await generativeModel.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: content,
          },
        ],
      },
    ],
    systemInstruction: systemPrompt(language),
  });
  return result.response.text();
};

const summarize = async (doc: Doc, options: any): Promise<string> => {
  if (!options?.apikey) {
    throw new Error("Google api key not set.");
  }

  const model = options.model || DEFAULT_GEMINI_MODEL;
  const sanitized = sanitizeContent(`${doc.title}\n${doc.textContent}`, 20000);
  return await getCompletion(options.apikey, model, doc.language, sanitized);
};

export default {
  id: "gemini",
  name: "Gemini",
  SettingsComp: GeminiSettings,
  summarize,
} as Summarizer;
