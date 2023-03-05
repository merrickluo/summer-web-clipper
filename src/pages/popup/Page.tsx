import React, { useEffect, useState } from "react";
import { runtime, tabs } from "webextension-polyfill";

const Page = () => {
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      const tab = await tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      const article = await tabs.sendMessage(tab[0].id, {
        action: "parse",
      });

      fetchSummary(article);
      setContent(article.content);
    };

    const fetchSummary = async (article) => {
      const data = await runtime.sendMessage({
        action: "summarize",
        title: article.title,
        content: article.textContent,
      });
      setSummary(data);
    };

    fetchContent();
  }, [setContent, setSummary]);

  return (
    <div>
      <div>
        <h1>Summary</h1>
        <p>{summary}</p>
      </div>
      <div>
        <h1>Content</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default Page;
