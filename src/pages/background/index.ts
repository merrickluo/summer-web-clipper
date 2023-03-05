import { runtime } from "webextension-polyfill";
import { NotionSummarizer } from "../../lib/notion";

const token = "";
const spaceId = "";

runtime.onMessage.addListener(async (msg) => {
  const summarizer = new NotionSummarizer(spaceId, token);

  switch (msg.action) {
    case "summarize":
      const data = await summarizer.summarize(msg.title, msg.content);
      return data;
  }
});
