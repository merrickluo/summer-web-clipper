import { newNotionSummarizer } from "@src/lib/summarizer";
import { runtime } from "webextension-polyfill";

runtime.onMessage.addListener(async (msg) => {
  const summarizer = await newNotionSummarizer();

  switch (msg.action) {
    case "summarize":
      return summarizer.summarize(msg.title, msg.content);
  }
});
