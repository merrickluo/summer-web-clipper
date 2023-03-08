import { Article } from "@src/lib/readbility";
import { SiOrg } from "react-icons/si";
import { useQuery } from "react-query";
import Summary from "./Summary";
import { BiRefresh } from "react-icons/bi";
import { useMemo } from "react";
import { loadSettings } from "@src/lib/settings";
import { selectedSummarizer } from "@src/lib/summarizer";
import { sendMessage } from "@src/lib/browser";

const fetchArticle = async (): Promise<Article> => {
  return sendMessage({ to: "current_tab" }, { action: "parse_document" });
};

const fetchSummary = async (article: Article) => {
  // FIXME: don't understand why error all become Unexpected
  // is it not a Promise???
  return sendMessage(
    { to: "background" },
    {
      action: "summarize",
      payload: { title: article.title, content: article.textContent },
    }
  );
};

const Main = () => {
  const article = useQuery("article", fetchArticle);
  const { data: settings } = useQuery("settings", loadSettings);

  const hasSelectedSummarizer = useMemo(() => {
    return settings && !!selectedSummarizer(settings);
  }, [settings]);

  const summary = useQuery("summary", () => fetchSummary(article.data!), {
    enabled: !!article.data && hasSelectedSummarizer,
  });

  return (
    <div className="p-3">
      <section>
        <div className="flex justify-between items-end">
          <h1 className="font-bold ml-1 mt-1 max-w-xs">
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
        <div className="w-full bg-white mt-2 p-2 rounded-lg border-1 border-gray-300">
          <Summary summary={summary} valid={!!hasSelectedSummarizer} />
        </div>
      </section>
      <div className="mt-6 mb-3 mr-3 flex justify-end items-center">
        <p className="text-sm text-gray-300">Save clip to...</p>
        <SiOrg className="w-6 h-6 ml-3" />
      </div>
    </div>
  );
};

export default Main;
