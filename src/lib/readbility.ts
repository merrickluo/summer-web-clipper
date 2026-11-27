import { isProbablyReaderable, Readability } from "@mozilla/readability";
import { normalizeLanguage, pickLanguage } from "./language";

export interface Doc {
  title: string;
  byline: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  siteName: string;

  readable: boolean;
  url: string;
  language: string;

  youtube?: boolean; // indicate document is a youtube video
  summary?: string;
}

// this needs to be run in content script
export const parseDocument = async (isYoutube): Promise<Doc> => {
  if (isYoutube) {
    return getYoutubeTranscript();
  }

  const readable = isProbablyReaderable(document);
  const cloneDoc = document.cloneNode(true) as Document;
  const parsedDoc = new Readability(cloneDoc).parse();

  if (parsedDoc == null) {
    throw new Error("readability parse failed");
  }

  const fallback = normalizeLanguage(document.documentElement.lang) || "en";

  // use the first possible language
  const langInfo = (await chrome.i18n.detectLanguage(
    parsedDoc.textContent ?? "",
  )) as unknown as chrome.i18n.LanguageDetectionResult;
  const language = pickLanguage(langInfo.languages, fallback);

  return { url: window.location.href, readable, language, ...parsedDoc };
};

const getYoutubeTranscript = async (): Promise<Doc> => {
  const response = await chrome.runtime.sendMessage({
    action: "fetch_youtube_transcript",
    payload: window.location.href
  });

  if (response.type === "error") {
    throw new Error(response.payload);
  }

  const j = response.payload;
  if (!j.transcript || !j.transcript.length || !j.transcript[0].text) {
    throw new Error("invalid transcript found");
  }
  const textContent = j.transcript.map((s: any) => s.text).join(" ");
  
  return {
    url: window.location.href,
    readable: true,
    youtube: true,
    title: j.metadata?.title ?? document.title,
    language: "en",
    textContent,
  };
};
