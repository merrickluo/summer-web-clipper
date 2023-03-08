import { fetchNotionSpaces } from "@src/lib/api/notion";
import { loadSettings } from "@src/lib/settings";
import { selectedSummarizer } from "@src/lib/summarizer";
import { runtime } from "webextension-polyfill";

runtime.onMessage.addListener((msg): Promise<any> | undefined => {
  switch (msg.action) {
    case "summarize":
      return new Promise(async (resolve, reject) => {
        const settings = await loadSettings();

        const summarizer = selectedSummarizer(settings);
        if (!summarizer) {
          reject("no available summarizer");
          return;
        }

        const summary = await summarizer.summarize(
          msg.title,
          msg.content,
          settings.summarizers?.[summarizer.id]
        );

        resolve(summary);
      });
    case "notion/getSpaces":
      return fetchNotionSpaces();
  }
});
