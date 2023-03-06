import { ParseDocumentCommand } from "@src/lib/constants";
import { Article } from "@src/lib/readbility";
import { useEffect, useState } from "react";
import { runtime, tabs } from "webextension-polyfill";
import { Either, Left, match } from "@src/lib/types";
import Settings from "./Settings";

type SummaryState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };

const fetchArticle = async (): Promise<Either<Article>> => {
  const tab = await tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (!tab || tab.length <= 0) {
    return Left(Error("no active tab"));
  }

  if (!tab[0].id) {
    return Left(Error("no tab id"));
  }

  try {
    return tabs.sendMessage(tab[0].id, ParseDocumentCommand);
  } catch (e) {
    return Left(Error("unexpected error"));
  }
};

const Page = () => {
  const [summary, setSummary] = useState<SummaryState>({ status: "loading" });

  useEffect(() => {
    const fetchSummary = async () => {
      match(
        await fetchArticle(),
        (error) => {
          setSummary({ status: "error", message: error.message });
        },
        async (article) => {
          const summary = await runtime.sendMessage({
            action: "summarize",
            title: article.title,
            content: article.textContent,
          });
          match<string, void>(
            summary,
            (error) => {
              setSummary({ status: "error", message: error.message });
            },
            (data) => {
              setSummary({ status: "success", data: data });
            }
          );
        }
      );
    };

    fetchSummary();
  }, [setSummary]);

  return (
    <div className="m-2">
      <div className="mb-4">
        <h1 className="text-lg">Settings</h1>
        <Settings />
      </div>
      <h1 className="text-xl">Summary</h1>
      {summary.status === "loading" && <p>Generating Summary, please wait</p>}
      {summary.status === "error" && (
        <p>failed to generate summary: {summary.message}</p>
      )}
      {summary.status === "success" && <p>{summary.data}</p>}
    </div>
  );
};

export default Page;
