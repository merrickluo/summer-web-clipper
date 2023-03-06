import React, { useEffect, useState } from "react";
import { runtime, tabs } from "webextension-polyfill";

const Page = () => {
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      const tab = await tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      if (!tab || tab.length <= 0) {
        setError("Failed to query active tab, please try again later.");
      }

      const article = await tabs.sendMessage(tab[0].id!, { action: "parse" });

      fetchSummary(article);
    };

    const fetchSummary = async ({
      title,
      textContent,
    }: {
      title: string;
      textContent: string;
    }) => {
      const data = await runtime.sendMessage({
        action: "summarize",
        title: title,
        content: textContent,
      });
      setSummary(data);
    };

    fetchContent();
  }, [setError, setSummary]);

  return (
    <div className="m-10 bg-red">
      <div>
        <h1>Summary</h1>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default Page;
