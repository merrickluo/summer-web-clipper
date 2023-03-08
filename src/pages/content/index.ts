import { addMessageListener, ContentMessage } from "@src/lib/browser";
import { parseDocument } from "@src/lib/readbility";

addMessageListener(async (msg: ContentMessage) => {
  switch (msg.action) {
    case "parse_document":
      return parseDocument(document);
  }
});
