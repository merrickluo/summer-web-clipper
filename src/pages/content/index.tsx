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
        parseDocument().then((doc) => {
          respond({ type: "success", payload: doc });
        });
        break;
      default:
        console.warn("content: unknown message received: ", msg);
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
