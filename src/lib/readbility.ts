import { isProbablyReaderable, Readability } from "@mozilla/readability";

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

  summary?: string;
}

// this needs to be run in content script
export const parseDocument = async (): Promise<Doc> => {
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
