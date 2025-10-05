import { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { AiOutlineExport, AiOutlineSetting } from "react-icons/ai";
import { GiArtificialIntelligence } from "react-icons/gi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./style.css";
import SettingWrapper from "./setting_wrapper";
import MenuItem from "@components/menu_item";
import GeneralSettings from "@components/settings/general_settings";
import ExportSettings from "@components/settings/export_settings";
import SummarySettings from "@components/settings/summary_settings";
import Header from "@components/header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const settingPages = [
  { title: "General", Icon: AiOutlineSetting, Component: GeneralSettings },
  {
    title: "Summary",
    Icon: GiArtificialIntelligence,
    Component: SummarySettings,
  },
  { title: "Export", Icon: AiOutlineExport, Component: ExportSettings },
];

const Options = () => {
  const [selectedPage, setSelectedPage] = useState(settingPages[0]);

  const handleMenuClick = useCallback(
    (title: string) => {
      const page = settingPages.find((p) => {
        return p.title == title;
      });

      if (page) {
        setSelectedPage(page);
      }
    },
    [setSelectedPage],
  );

  return (
    <main>
      <Header subtitle="Options" />
      <div className="swc:flex swc:flex-row swc:mt-10">
        <nav className="swc:w-1/4">
          {settingPages.map(({ title, Icon }) => (
            <MenuItem
              key={title}
              title={title}
              icon={<Icon />}
              selected={selectedPage.title == title}
              onClick={handleMenuClick}
            />
          ))}
        </nav>
        <div className="swc:w-2/3 swc:px-20">
          <QueryClientProvider client={queryClient}>
            <SettingWrapper
              title={selectedPage.title}
              Content={selectedPage.Component}
            />
          </QueryClientProvider>
        </div>
      </div>
    </main>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Options />);
