import { addMessageListener, ContentMessage } from "@lib/browser";
import { parseDocument } from "@lib/readbility";
import { createRoot } from "react-dom/client";

import "./style.css";
import Root from "./root";

const rootId = "swc-root";

const init = () => {
  if (window.contentInjected) {
    return;
  }
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
      case "toggle_overlay":
        window.dispatchEvent(new CustomEvent("swc:toggle-overlay"));
        respond({ type: "success" });
        return true;
    }
  });

  let contentRoot = document.getElementById(rootId);
  if (!contentRoot) {
    contentRoot = document.createElement("div");
    contentRoot.id = rootId;
    document.body.appendChild(contentRoot);
  }

  createRoot(contentRoot).render(<Root />);
};

init();
