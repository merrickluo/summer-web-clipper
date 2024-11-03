import { addMessageListener, ContentMessage } from "@lib/browser";
import { parseDocument } from "@lib/readbility";

import "./style.css";

const addEventListeners = () => {
  if (window.contentInjected) {
    return;
  }

  addMessageListener((msg: ContentMessage, _, respond) => {
    switch (msg.action) {
      case "parse_document":
        parseDocument(msg.payload.isYoutube).then((doc) => {
          respond({ type: "success", payload: doc });
        });
        return true;
      case "open_url":
        window.open(msg.payload as string, "_self");
        return true;
    }
  });
};

addEventListeners();

let containerId = "swc-frame";
let oldContainer = document.getElementById(containerId);
if (oldContainer) {
  oldContainer.remove();
}

const container = document.createElement("div");
container.id = containerId;

document.body.appendChild(container);

const frame = document.createElement("iframe");
frame.src = chrome.runtime.getURL("index.html");

container.appendChild(frame);
