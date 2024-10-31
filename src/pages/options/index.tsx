import { useCallback, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AiOutlineExport, AiOutlineSetting } from "react-icons/ai";
import { GiArtificialIntelligence } from "react-icons/gi";
import { QueryClient, QueryClientProvider } from "react-query";

import "./style.css";
import Settings from "@pages/popup/Settings";
import MenuItem from "@components/menu_item";
import Header from "@pages/popup/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const Options = () => {
  const [menu, setMenu] = useState("General");

  const handleMenuClick = useCallback(
    (title: string) => {
      setMenu(title);
    },
    [setMenu]
  );

  return (
    <main className="">
      <Header subtitle="Settings" />
      <div className="flex flex-row mt-10">
        <nav className="min-w-80">
          <MenuItem
            title="General"
            icon={<AiOutlineSetting />}
            selected={menu == "General"}
            onClick={handleMenuClick}
          />
          <MenuItem
            title="Summary"
            icon={<GiArtificialIntelligence />}
            selected={menu == "Summary"}
            onClick={handleMenuClick}
          />
          <MenuItem
            title="Export"
            icon={<AiOutlineExport />}
            selected={menu == "Export"}
            onClick={handleMenuClick}
          />
        </nav>
        <QueryClientProvider client={queryClient}>
          <Settings />
        </QueryClientProvider>
      </div>
    </main>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Options />);
