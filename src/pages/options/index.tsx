import { useCallback, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AiTwotoneSetting, AiFillHome } from "react-icons/ai";
import { QueryClient, QueryClientProvider } from "react-query";

import "./style.css";
import Settings from "@pages/popup/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const Options = () => {
  return (
    <main className="">
      <QueryClientProvider client={queryClient}>
        <Settings />
      </QueryClientProvider>
    </main>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Options />);
