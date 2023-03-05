import { Readability, isProbablyReaderable } from "@mozilla/readability";
import { runtime } from "webextension-polyfill";

const parseDocument = () => {
  // skip unreadable content for now
  // TODO: add action to handle it
  if (isProbablyReaderable(document)) {
    const doc = document.cloneNode(true) as Document;
    const article = new Readability(doc).parse();

    return article;
  }

  return {};
};

runtime.onMessage.addListener(async (msg) => {
  switch (msg.action) {
    case "parse":
      return parseDocument();
  }
});
