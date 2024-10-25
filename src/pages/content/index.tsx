import { addMessageListener, ContentMessage } from "@lib/browser";
import { parseDocument } from "@lib/readbility";
import { createRoot } from "react-dom/client";

import "./style.css";
import Root from "./root";

const injectContentScript = () => {
  if (window.contentInjected) {
    return;
  }

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

  const contentRoot = document.createElement("div");
  document.body.appendChild(contentRoot);

  const root = createRoot(contentRoot);
  root.render(<Root />);
};

injectContentScript();
