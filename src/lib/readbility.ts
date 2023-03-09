import { isProbablyReaderable, Readability } from "@mozilla/readability";

export interface Article {
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
export const parseDocument = (doc: Document): Article => {
  const readable = isProbablyReaderable(doc);
  const cloneDoc = document.cloneNode(true) as Document;
  const parsedDoc = new Readability(cloneDoc).parse();

  if (parsedDoc == null) {
    throw "readability parse failed";
  }

  return { url: window.location.href, readable, ...parsedDoc };
};
