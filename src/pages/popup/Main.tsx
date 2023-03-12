import { Article } from "@lib/readbility";
import { useMutation, useQuery } from "react-query";
import { BiRefresh } from "react-icons/bi";
import { useMemo } from "react";
import { loadSettings } from "@lib/settings";
import { selectedSummarizer } from "@lib/summarizers";
import { sendMessage } from "@lib/browser";
import { availableExporters } from "@lib/exporters";

import Summary from "./Summary";

const fetchArticle = async (): Promise<Article> => {
  return await sendMessage({
    to: "current_tab",
    message: { action: "parse_document" },
  });
};

const fetchSummary = async (article: Article) => {
  return await sendMessage({
    to: "background",
    message: {
      action: "summarize",
      payload: { title: article.title, content: article.textContent },
    },
  });
};

interface ExportParams {
  exporterId: string;
  article?: Article;
  summary?: string;
}

const doExport = async ({ exporterId, article, summary }: ExportParams) => {
  return await sendMessage({
    to: "background",
    message: {
      action: "export",
      payload: {
        exporterId,
        article: article,
        summary: summary,
      },
    },
  });
};

const Main = () => {
  const article = useQuery("article", fetchArticle, { retry: false });
  const { data: settings } = useQuery("settings", loadSettings, {
    retry: false,
  });

  const hasSelectedSummarizer = useMemo(() => {
    return settings && !!selectedSummarizer(settings);
  }, [settings]);

  const summary = useQuery("summary", () => fetchSummary(article.data!), {
    enabled: !!article.data && hasSelectedSummarizer,
  });

  const mutation = useMutation(doExport);

  return (
    <div className="p-3">
      <section>
        <div className="flex justify-between items-end">
          <h1 className="text-base font-bold ml-1 mt-1 max-w-xs">
            {article.isLoading
              ? "Parsing page..."
              : article.isError
              ? "Failed to parse page."
              : article.data?.title}
          </h1>
          <BiRefresh
            onClick={() => summary.refetch()}
            className={`w-6 h-6 hover:text-blue-600 mr-2 ${
              summary.isFetching ? "animate-spin" : ""
            }`}
          />
        </div>
        <div className="w-full text-base bg-white mt-2 p-2 rounded-lg border-1 border-gray-300">
          <Summary summary={summary} valid={!!hasSelectedSummarizer} />
        </div>
      </section>
      <div className="mt-6 mb-3 mr-3 flex justify-end items-center">
        <p className="text-sm text-gray-300">Save clip to...</p>
        <>
          {availableExporters.map((exp) => (
            <exp.Icon
              key={exp.id}
              onClick={() => {
                mutation.mutate({
                  exporterId: exp.id,
                  article: article.data,
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
