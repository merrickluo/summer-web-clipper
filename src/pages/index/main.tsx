import { Doc, parseDocument } from "@lib/readbility";
import { useMutation, useQuery } from "react-query";
import { BiRefresh } from "react-icons/bi";
import { useMemo } from "react";
import { loadSettings } from "@lib/settings";
import { selectedSummarizer } from "@lib/summarizers";
import { sendMessage } from "@lib/browser";
import { availableExporters } from "@lib/exporters";
import Summary from "@components/summary";

const fetchDoc = async (): Promise<Doc> => {
  return await sendMessage({
    to: "current_tab",
    message: { action: "parse_document" },
  });
};

const fetchSummary = async (doc: Doc) => {
  return await sendMessage({
    to: "background",
    message: {
      action: "summarize",
      payload: doc,
    },
  });
};

interface ExportParams {
  exporterId: string;
  doc?: Doc;
  summary?: string;
}

const doExport = async ({ exporterId, doc, summary }: ExportParams) => {
  return await sendMessage({
    to: "background",
    message: {
      action: "export",
      payload: {
        exporterId,
        doc: doc,
        summary: summary,
      },
    },
  });
};

const Main = () => {
  const doc = useQuery("doc", fetchDoc, { retry: false });
  const { data: settings } = useQuery("settings", loadSettings, {
    retry: false,
  });

  const hasSelectedSummarizer = useMemo(() => {
    return settings && !!selectedSummarizer(settings);
  }, [settings]);

  const summary = useQuery("summary", () => fetchSummary(doc.data!), {
    enabled:
      !!doc.data && hasSelectedSummarizer && settings?.general?.autoSummary,
  });

  const mutation = useMutation(doExport);

  return (
    <div className="p-3 overflow-y-auto flex flex-col">
      <div className="flex justify-between items-end">
        <h1 className="p-0 text-base font-bold ml-1 mt-1">
          {doc.isLoading
            ? "Parsing page..."
            : doc.isError
            ? "Failed to parse page."
            : doc.data?.title}
        </h1>
        <BiRefresh
          onClick={() => summary.refetch()}
          className={`w-6 h-6 hover:text-blue-600 mr-2 ${
            summary.isFetching ? "animate-spin" : ""
          }`}
        />
      </div>
      <div className="w-full flex-1 text-base bg-white mt-2 p-2 rounded-lg border-1 border-gray-300">
        <Summary
          summary={summary}
          valid={!!hasSelectedSummarizer}
          auto={settings?.general?.autoSummary}
        />
      </div>
      <div className="mt-6 mb-3 mr-3 flex justify-end items-center">
        <p className="text-sm text-gray-300">Save clip to...</p>
        <>
          {availableExporters.map((exp) => (
            <exp.Icon
              key={exp.id}
              onClick={() => {
                mutation.mutate({
                  exporterId: exp.id,
                  doc: doc.data,
                  summary: summary.data,
                });
              }}
              className="w-6 h-6 ml-3 hover:text-blue-600"
            />
          ))}
        </>
      </div>
    </div>
  );
};

export default Main;
