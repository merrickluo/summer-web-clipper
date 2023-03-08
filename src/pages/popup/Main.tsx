import { ParseDocumentCommand } from "@src/lib/constants";
import { Article } from "@src/lib/readbility";
import { tabs } from "webextension-polyfill";
import { SiOrg } from "react-icons/si";
import { useQuery } from "react-query";
import Summary from "./Summary";

const fetchArticle = async (): Promise<Article> => {
  const tab = await tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (!tab || tab.length <= 0) {
    throw "no active tab found";
  }

  if (!tab[0].id) {
    throw "active tab has no id";
  }

  return await tabs.sendMessage(tab[0].id, ParseDocumentCommand);
};

const Main = () => {
  const article = useQuery("article", fetchArticle);

  return (
    <div className="p-3">
      <section>
        <h1 className="font-bold ml-1 mt-1">
          {article.isLoading
            ? "Parsing page..."
            : article.isError
            ? "Failed to parse page."
            : article.data?.title}
        </h1>
        <div className="w-full bg-white mt-2 p-2 rounded-lg border-1 border-gray-300">
          <Summary article={article.data} />
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
