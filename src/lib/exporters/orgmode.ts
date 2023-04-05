import OrgModeSettings from "@components/settings/exporters/OrgMode";

import { SiOrg } from "react-icons/si";
import { openNewTab } from "../browser";
import { Clip, Exporter } from "../exporters";
import { buildUrl } from "./helpers";

const exportToOrgProtocol = ({ doc, summary }: Clip, options: any) => {
  if (!options || !options.template) {
    throw new Error("missing org mode export template");
  }

  const orgUrl = buildUrl(options.template, {
    url: doc.url,
    title: doc.title,
    text: doc.textContent,
    summary: summary,
  });

  openNewTab(orgUrl);
};

export default {
  id: "orgmode",
  name: "Org Mode",
  export: exportToOrgProtocol,

  SettingsComp: OrgModeSettings,
  Icon: SiOrg,
} as Exporter;
