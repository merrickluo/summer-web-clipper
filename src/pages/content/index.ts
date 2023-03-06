import { ParseDocumentCommand } from "@src/lib/constants";
import { parseDocument } from "@src/lib/readbility";
import { runtime } from "webextension-polyfill";

runtime.onMessage.addListener(async (msg) => {
  switch (msg.action) {
    case ParseDocumentCommand.action:
      return parseDocument(document);
  }

  return null;
});
