import { fetchNotionSpaces } from "@lib/api/notion";
import {
  addMessageListener,
  BackgroundMessage,
  MessageResponse,
} from "@lib/browser";
import { Doc } from "@lib/readbility";
import { loadSettings } from "@lib/settings";
import { selectedSummarizer } from "@lib/summarizers";
import { findExporter } from "@lib/exporters";

interface SummarizePayload {
  title: string;
  content: string;
}

const doSummarize = async ({ title, content }: SummarizePayload) => {
  const settings = await loadSettings();

  const summarizer = selectedSummarizer(settings);
  if (!summarizer) {
    throw new Error("no available summarizer");
  }

  return await summarizer.summarize(
    title,
    content,
    settings.summarizers?.[summarizer.id]
  );
};

interface ExportPayload {
  exporterId: string;
  doc: Doc;
  summary: string;
}

const doExport = async (payload: ExportPayload) => {
  const settings = await loadSettings();
  const { exporterId, doc, summary } = payload;

  const exporter = findExporter(exporterId);
  if (!exporter) {
    throw new Error("no matching exporter found");
  }

  return await exporter.export(
    { doc: doc, summary: summary },
    settings?.exporters?.[exporterId]
  );
};

const handleMessageAsync = async (
  msg: BackgroundMessage,
  sendResponse: (response: MessageResponse) => void
) => {
  try {
    let payload: any;

    switch (msg.action) {
      case "summarize":
        payload = await doSummarize({
          title: msg.payload.title,
          content: msg.payload.content,
        });

        break;
      case "export":
        payload = await doExport({
          exporterId: msg.payload.exporterId,
          doc: msg.payload.doc,
          summary: msg.payload.summary,
        });
        break;

      case "notion/getSpaces":
        payload = await fetchNotionSpaces();
        break;
    }

    sendResponse({ type: "success", payload });
  } catch (e) {
    return sendResponse({ type: "error", payload: e });
  }
};

addMessageListener((msg, _, sendResponse) => {
  handleMessageAsync(msg, sendResponse);
  // indicates we need to call sendResponse asynchronously
  return true;
});
