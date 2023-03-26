import { addMessageListener, ContentMessage } from "@lib/browser";
import { parseDocument } from "@lib/readbility";

addMessageListener((msg: ContentMessage, _, respond) => {
  switch (msg.action) {
    case "parse_document":
      parseDocument().then((doc) => {
        respond({ type: "success", payload: doc });
      });
      return true;
    case "open_url":
      window.open(msg.payload as string, "_self");
      return true;
  }
});
