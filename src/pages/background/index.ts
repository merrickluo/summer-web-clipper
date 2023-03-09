import { fetchNotionSpaces } from "@lib/api/notion";
import { addMessageListener, BackgroundMessage } from "@lib/browser";
import { loadSettings, Settings } from "@lib/settings";
import { selectedSummarizer } from "@lib/summarizers";
import { findExporter } from "@src/lib/exporters";

addMessageListener(async (msg: BackgroundMessage): Promise<any> => {
  let settings: Settings;
  switch (msg.action) {
    case "summarize":
      settings = await loadSettings();

      const summarizer = selectedSummarizer(settings);
      if (!summarizer) {
        throw new Error("no available summarizer");
      }

      return await summarizer.summarize(
        msg.payload.title,
        msg.payload.content,
        settings.summarizers?.[summarizer.id]
      );
    case "export":
      settings = await loadSettings();

      const { exporterId, article, summary } = msg.payload;

      const exporter = findExporter(exporterId);
      if (!exporter) {
        throw new Error("no matching exporter found");
      }

      return await exporter.export(
        { article: article, summary: summary },
        settings?.exporters?.[exporterId]
      );

    case "notion/getSpaces":
      return fetchNotionSpaces();
  }
});
