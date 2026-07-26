import { GoogleGenerativeAI } from "@google/generative-ai";
import { Doc } from "@lib/readbility";
import { sanitizeContent, systemPrompt } from "./utils";

const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

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
  summarize,
};
