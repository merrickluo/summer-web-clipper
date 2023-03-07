import { useCallback, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AiTwotoneSetting, AiFillHome } from "react-icons/ai";

import Header from "./Header";
import Main from "./Main";
import Settings from "./Settings";

import "./style.css";

const mainPage = "main";
const settingsPage = "settings";

const Popup = () => {
  const [page, setPage] = useState(mainPage);

  const handleSetPage = useCallback(
    (page: "main" | "settings") => {
      return () => {
        setPage(page);
      };
    },
    [setPage]
  );

  const settingPageAction = useMemo(
    () => (
      <AiFillHome
        className="ml-auto mr-6 w-6 h-6 hover:text-blue-600"
        onClick={handleSetPage(mainPage)}
      />
    ),
    [handleSetPage]
  );

  const mainPageActions = useMemo(
    () => (
      <AiTwotoneSetting
        className="ml-auto mr-6 w-6 h-6 hover:text-blue-600"
        onClick={handleSetPage(settingsPage)}
      />
    ),
    [handleSetPage]
  );

  return (
    <main className="">
      <Header
        subtitle="Clip with Summary"
        actions={page === mainPage ? mainPageActions : settingPageAction}
      />
      {page === mainPage && <Main />}
      {page === settingsPage && <Settings />}
    </main>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Popup />);
