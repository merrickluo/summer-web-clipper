import { fetchNotionSpaces } from "@lib/api/notion";
import { addMessageListener, BackgroundMessage } from "@lib/browser";
import { loadSettings } from "@lib/settings";
import { selectedSummarizer } from "@lib/summarizers";

addMessageListener((msg: BackgroundMessage): Promise<any> => {
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
          msg.payload.title,
          msg.payload.content,
          settings.summarizers?.[summarizer.id]
        );

        resolve(summary);
      });
    case "notion/getSpaces":
      return fetchNotionSpaces();
  }
});
