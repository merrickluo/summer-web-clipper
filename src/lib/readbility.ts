import { isProbablyReaderable, Readability } from "@mozilla/readability";
import { Either, Left, Right } from "./types";

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
}

export const parseDocument = (doc: Document): Either<Article> => {
  const readable = isProbablyReaderable(doc);
  const cloneDoc = document.cloneNode(true) as Document;
  const parsedDoc = new Readability(cloneDoc).parse();

  if (parsedDoc == null) {
    return Left(Error("readability parse failed"));
  }

  return Right({ readable, ...parsedDoc });
};
