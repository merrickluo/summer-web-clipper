export interface ContentMessage {
  action: "parse_document" | "open_url";
  payload?: any;
}

export interface BackgroundMessage {
  action: "summarize" | "export";
  payload?: any;
}

export type MessageResponse = {
  type: "error" | "success";
  payload?: any;
};

type MessageListener = (
  msg: any,
  sender: any,
  sendResponse: (r: MessageResponse) => void
) => void;

type Message =
  | { to: "current_tab"; message: ContentMessage }
  | { to: "background"; message: BackgroundMessage };

export const sendMessage = async (target: Message): Promise<any> => {
  let resp: MessageResponse;

  switch (target.to) {
    case "current_tab":
      const tab = await getCurrentTab();
      resp = await chrome.tabs.sendMessage(tab.id!, target.message);
      break;
    case "background":
      resp = await chrome.runtime.sendMessage(target.message);
      break;
  }

  // most of message function here are used for react-query
  // and it requires the function to throw, convert callback
  // result to throw error here
  if (resp.type == "error") {
    throw resp.payload;
  } else {
    return resp.payload;
  }
};

export const addMessageListener = (callback: MessageListener) => {
  chrome.runtime.onMessage.addListener(callback);
};

export const localStorageGet = () => {
  return chrome.storage.local.get();
};

export const localStorageSet = (data: any) => {
  return chrome.storage.local.set(data);
};

// only main frame, current tab
export const injectContentScript = async () => {
  const tab = await getCurrentTab();

  return await chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    files: ["dist/content.js"],
  });
};

export const openNewTab = (url: string) => {
  chrome.tabs.create({ url });
};

const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  return tab;
};
