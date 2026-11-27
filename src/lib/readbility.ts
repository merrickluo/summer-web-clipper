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

interface ParsedDoc {
  title?: string | null;
  byline?: string | null;
  content?: string | null;
  textContent?: string | null;
  length?: number | null;
  excerpt?: string | null;
  siteName?: string | null;
}

interface YoutubeTranscriptResponse {
  transcript?: Array<{ text?: string }>;
  metadata?: { title?: string };
}

const orEmpty = (value: string | null | undefined): string => value ?? "";

export const normalizeDoc = (
  parsed: ParsedDoc,
  url: string,
  readable: boolean,
  language: string,
): Doc => ({
  title: orEmpty(parsed.title),
  byline: orEmpty(parsed.byline),
  content: orEmpty(parsed.content),
  textContent: orEmpty(parsed.textContent),
  length: parsed.length ?? 0,
  excerpt: orEmpty(parsed.excerpt),
  siteName: orEmpty(parsed.siteName),
  url,
  readable,
  language,
});

// this needs to be run in content script
export const parseDocument = async (isYoutube: boolean): Promise<Doc> => {
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

  return normalizeDoc(parsedDoc, window.location.href, readable, language);
};

const getYoutubeTranscript = async (): Promise<Doc> => {
  const response = await chrome.runtime.sendMessage({
    action: "fetch_youtube_transcript",
    payload: window.location.href
  });

  if (response.type === "error") {
    throw new Error(response.payload);
  }

  const j = response.payload as YoutubeTranscriptResponse;
  if (!j.transcript || !j.transcript.length || !j.transcript[0].text) {
    throw new Error("invalid transcript found");
  }
  const textContent = j.transcript.map((s) => s.text).join(" ");

  return {
    url: window.location.href,
    readable: true,
    youtube: true,
    title: j.metadata?.title ?? document.title,
    language: "en",
    textContent,
    byline: "",
    content: "",
    excerpt: "",
    siteName: "",
    length: textContent.length,
  };
};
