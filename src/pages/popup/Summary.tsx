import { useQuery } from "react-query";
import { Article } from "@src/lib/readbility";
import { runtime } from "webextension-polyfill";
import { loadSettings } from "@src/lib/settings";
import { selectedSummarizer } from "@src/lib/summarizer";
import { useMemo } from "react";

const fetchSummary = (article: Article) => {
  // FIXME: don't understand why error all become Unexpected
  // is it not a Promise???
  return async (): Promise<string> => {
    return await runtime.sendMessage({
      action: "summarize",
      title: article.title,
      content: article.textContent,
    });
  };
};

const Summary = ({ article }: { article: Article | undefined }) => {
  const { data: settings } = useQuery("settings", loadSettings);

  const hasSelectedSummarizer = useMemo(() => {
    return settings && !!selectedSummarizer(settings);
  }, [settings]);

  const { data, error } = useQuery("summary", fetchSummary(article!), {
    enabled: !!article && hasSelectedSummarizer,
  });

  if (!hasSelectedSummarizer) {
    return <p>No summary provider selected, please check the settings.</p>;
  }

  if (error && (error as any)?.message) {
    return <p>{(error as any)?.message}</p>;
  }

  if (data) {
    return <p>{data}</p>;
  }

  return <p>Generating summary, please be patient...</p>;
};

export default Summary;
