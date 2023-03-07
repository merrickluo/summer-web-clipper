import { ParseDocumentCommand } from "@src/lib/constants";
import { Article } from "@src/lib/readbility";
import { useEffect, useState } from "react";
import { runtime, tabs } from "webextension-polyfill";
import { Either, Left, match } from "@src/lib/types";
import { SiOrg } from "react-icons/si";
import { DataState, renderDataState } from "./DataState";

const summaryPlaceHolder = "Generating summary, please be patient...";

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
    return await tabs.sendMessage(tab[0].id, ParseDocumentCommand);
  } catch (e) {
    return Left(Error("unexpected error"));
  }
};

const Main = () => {
  const [article, setArticle] = useState<DataState>({ status: "loading" });
  const [summary, setSummary] = useState<DataState>({ status: "loading" });

  useEffect(() => {
    const fetchSummary = async () => {
      match(
        await fetchArticle(),
        (error) => {
          setArticle({ status: "error", message: error.message });
        },
        async (article) => {
          setArticle({ status: "success", data: article });
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
  }, [setArticle, setSummary]);

  return (
    <div className="p-3">
      <section>
        {renderDataState(article, ({ data }) => (
          <h1 className="font-bold ml-1 mt-1">{data.title}</h1>
        ))}

        <div className="w-full bg-white mt-2 p-2 rounded-lg border-1 border-gray-300">
          {renderDataState(
            summary,
            // success
            ({ data }: { data: string }) => (
              <p>{data}</p>
            ),
            // loading
            () => (
              <p className="text-gray-300"> {summaryPlaceHolder} </p>
            )
          )}
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
