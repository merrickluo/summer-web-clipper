import { Doc, parseDocument } from "@lib/readbility";
import { useMutation, useQuery } from "react-query";
import { BiRefresh } from "react-icons/bi";
import { useMemo } from "react";
import { loadSettings } from "@lib/settings";
import { selectedSummarizer } from "@lib/summarizers";
import { sendMessage } from "@lib/browser";
import { availableExporters } from "@lib/exporters";
import Summary from "@components/summary";

const RE_YOUTUBE =
  /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;

const fetchDoc = async (): Promise<Doc> => {
  const isYoutube = window.location.href.match(RE_YOUTUBE);
  return parseDocument(isYoutube);
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
    <div className="swc-p-3 swc-overflow-y-auto swc-flex swc-flex-col">
      <div className="swc-flex swc-justify-between swc-items-end">
        <h1 className="swc-p-0 swc-text-base swc-font-bold swc-ml-1 swc-mt-1">
          {doc.isLoading
            ? "Parsing page..."
            : doc.isError
            ? "Failed to parse page."
            : doc.data?.title}
        </h1>
        <BiRefresh
          onClick={() => summary.refetch()}
          className={`swc-w-6 swc-h-6 hover:swc-text-blue-600 swc-mr-2 ${
            summary.isFetching ? "swc-animate-spin" : ""
          }`}
        />
      </div>
      <div className="swc-w-full swc-flex-1 swc-text-base swc-bg-white swc-mt-2 swc-p-2 swc-rounded-lg swc-border-1 swc-border-gray-300">
        <Summary
          summary={summary}
          valid={!!hasSelectedSummarizer}
          auto={settings?.general?.autoSummary}
        />
      </div>
      <div className="swc-mt-6 swc-mb-3 swc-mr-3 swc-flex swc-justify-end swc-items-center">
        <p className="swc-text-sm swc-text-gray-300">Save clip to...</p>
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
              className="swc-w-6 swc-h-6 swc-ml-3 hover:swc-text-blue-600"
            />
          ))}
        </>
      </div>
    </div>
  );
};

export default Main;
