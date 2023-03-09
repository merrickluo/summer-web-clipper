import { addMessageListener, ContentMessage } from "@lib/browser";
import { parseDocument } from "@lib/readbility";

addMessageListener(async (msg: ContentMessage) => {
  switch (msg.action) {
    case "parse_document":
      return parseDocument(document);
  }
});
