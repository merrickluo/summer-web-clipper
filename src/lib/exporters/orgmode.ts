import OrgModeSettings from "@components/settings/exporters/OrgMode";
import { SiOrg } from "react-icons/si";
import { sendMessage } from "../browser";
import { Clip, Exporter } from "../exporters";

interface TemplateData {
  title?: string;
  url: string;
  summary?: string;
  text?: string;
}

export const buildUrl = (template: string, data: TemplateData) => {
  let result = template;

  for (const [key, value] of Object.entries(data)) {
    const encodedValue = encodeURIComponent(value as string);
    result = result.replace(`{${key}}`, encodedValue);
  }

  return result;
};

const exportToOrgProtocol = ({ article, summary }: Clip, options: any) => {
  if (!options || !options.template) {
    throw "missing org mode export template";
  }

  const orgUrl = buildUrl(options.template, {
    url: article.url,
    title: article.title,
    text: article.textContent,
    summary: summary,
  });

  sendMessage({ to: "current_tab" }, { action: "open_url", payload: orgUrl });
};

export default {
  id: "orgmode",
  name: "Org Mode",
  export: exportToOrgProtocol,

  SettingsComp: OrgModeSettings,
  Icon: SiOrg,
} as Exporter;
