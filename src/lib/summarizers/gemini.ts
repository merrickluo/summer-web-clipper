import  { GoogleGenerativeAI } from "@google/generative-ai";
import { sanitizeContent, systemPrompt } from "./utils";
import { Summarizer } from "../summarizers";
import GeminiSettings from "@components/settings/summarizers/Gemini";


const getCompletion = async (
  apikey: string,
  content: string,
): Promise<string> => {
  const genAI = new GoogleGenerativeAI(apikey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002"});
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: content
          }],
      }
    ],
    systemInstruction: systemPrompt,
  });
  return result.response.text();
};

const summarize = async (doc: Doc, options: any): Promise<string> => {
  if (!options?.apikey) {
    throw new Error("Google api key not set.");
  }

  const sanitized = sanitizeContent(`${doc.title}\n${doc.textContent}`, 20000);
  return await getCompletion(options.apikey, sanitized);
};

export default {
  id: "gemini",
  name: "Gemini",
  SettingsComp: GeminiSettings,
  summarize,
} as Summarizer;
