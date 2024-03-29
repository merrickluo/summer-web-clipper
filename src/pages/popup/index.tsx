import { useCallback, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AiTwotoneSetting, AiFillHome } from "react-icons/ai";
import { QueryClient, QueryClientProvider } from "react-query";
import ContentWrapper from "./ContentWrapper";

import Header from "./Header";
import Main from "./Main";
import Settings from "./Settings";

import "./style.css";

const mainPage = "main";
const settingsPage = "settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

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
        onClick={handleSetPage("main")}
      />
    ),
    [handleSetPage]
  );

  const mainPageActions = useMemo(
    () => (
      <AiTwotoneSetting
        className="ml-auto mr-6 w-6 h-6 hover:text-blue-600"
        onClick={handleSetPage("settings")}
      />
    ),
    [handleSetPage]
  );

  return (
    <main className="">
      <Header
        subtitle={page === mainPage ? "Clip with Summary" : "Settings"}
        actions={page === mainPage ? mainPageActions : settingPageAction}
      />
      <QueryClientProvider client={queryClient}>
        <>
          {page === mainPage && (
            <ContentWrapper>
              <Main />
            </ContentWrapper>
          )}
          {page === settingsPage && <Settings />}
        </>
      </QueryClientProvider>
    </main>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Popup />);
