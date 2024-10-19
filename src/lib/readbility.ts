import { isProbablyReaderable, Readability } from "@mozilla/readability";
import { YoutubeTranscript } from "youtube-transcript";

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

  let language = "en";

  // use the first possible language
  const langInfo = await chrome.i18n.detectLanguage(parsedDoc.textContent);
  if (langInfo.languages.length > 1) {
    language = langInfo.languages[0].language;
  }

  return { url: window.location.href, readable, language, ...parsedDoc };
};

const getYoutubeTranscript = async (): Promise<Doc> => {
  const resp = await YoutubeTranscript.fetchTranscript(window.location.href);
  if (resp.length <= 0) {
    throw new Error("transcript not found");
  }

  const language = resp[0].lang || "en";
  const textContent = resp.map((it) => it.text).join(" ");

  console.debug("got Youtube transcript: ", textContent);

  // TODO: maybe fill other attributes. right now only language, title, textContent is used.
  return {
    url: window.location.href,
    readable: true,
    youtube: true,
    title: document.title,
    language,
    textContent,
  };
};
