import { Readability } from "@mozilla/readability";
import { runtime } from "webextension-polyfill";

const parseDocument = () => {
  const doc = document.cloneNode(true) as Document;
  const article = new Readability(doc).parse();

  return article;
};

runtime.onMessage.addListener(async (msg) => {
  switch (msg.action) {
    case "parse":
      return parseDocument();
  }
});
