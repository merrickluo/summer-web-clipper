import { isProbablyReaderable, Readability } from "@mozilla/readability";

export interface Doc {
  title: string;
  byline: string;
  dir: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  siteName: string;

  readable: boolean;
  url: string;
}

// this needs to be run in content script
export const parseDocument = (): Article => {
  const readable = isProbablyReaderable(document);
  const cloneDoc = document.cloneNode(true) as Document;
  const parsedDoc = new Readability(cloneDoc).parse();

  if (parsedDoc == null) {
    throw new Error("readability parse failed");
  }

  const languages = await chrome.i18n.detectLanguage(parsedDoc.textContent);
  for (const l of languages.languages) {
    console.log(l);
  }

  return { url: window.location.href, readable, ...parsedDoc };
};
