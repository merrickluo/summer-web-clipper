import { fetchNotionSpaces } from "@src/lib/api/notion";
import { loadSettings } from "@src/lib/settings";
import { selectedSummarizer } from "@src/lib/summarizer";
import { runtime } from "webextension-polyfill";

runtime.onMessage.addListener(async (msg) => {
  switch (msg.action) {
    case "summarize":
      const settings = await loadSettings();

      const summarizer = selectedSummarizer(settings);
      if (!summarizer) {
        throw "no available summarizer";
      }

      return summarizer.summarize(
        msg.title,
        msg.content,
        settings.summarizers?.[summarizer.name]
      );
    case "notion/getSpaces":
      return await fetchNotionSpaces();
  }
});
