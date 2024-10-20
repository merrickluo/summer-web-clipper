import { addMessageListener, ContentMessage } from "@lib/browser";
import { parseDocument } from "@lib/readbility";

if (!window.contentInjected) {
  window.contentInjected = true;

  const RE_YOUTUBE =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const isYoutube = window.location.href.match(RE_YOUTUBE);

  addMessageListener((msg: ContentMessage, _, respond) => {
    switch (msg.action) {
      case "parse_document":
        parseDocument(isYoutube).then((doc) => {
          respond({ type: "success", payload: doc });
        });
        return true;
      case "open_url":
        window.open(msg.payload as string, "_self");
        return true;
    }
  });
}
