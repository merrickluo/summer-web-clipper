export interface ContentMessage {
  action: "parse_document";
}

export interface BackgroundMessage {
  action: "notion/getSpaces" | "summarize";
  payload?: any;
}

type Message = ContentMessage | BackgroundMessage;

// HACK: esbuild seems to have issues bundling webextesion-polyfill
// @ts-ignore
import browser = require("webextension-polyfill");

type MessageTarget =
  | { to: "content_script"; tabId: number }
  | { to: "current_tab" }
  | { to: "background" };

export const sendMessage = async (
  target: MessageTarget,
  msg: Message
): Promise<any> => {
  switch (target.to) {
    case "content_script":
      return await browser.tabs.sendMessage(target.tabId, msg);
    case "current_tab":
      const tab = await getCurrentTab();
      return await browser.tabs.sendMessage(tab.id!, msg);
    case "background":
      return await browser.runtime.sendMessage(msg);
  }
};

export const addMessageListener = (callback: (msg: any) => Promise<any>) => {
  browser.runtime.onMessage.addListener(callback);
};

export const localStorageGet = () => {
  return browser.storage.local.get();
};

export const localStorageSet = (data: any) => {
  return browser.storage.local.set(data);
};

const getCurrentTab = async () => {
  const tabs = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (!tabs || tabs.length <= 0) {
    throw "no active tab found";
  }

  return tabs[0];
};
