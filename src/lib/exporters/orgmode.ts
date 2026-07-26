import { openNewTab } from "../browser";
import { Doc } from "../readbility";
import { buildUrl } from "./helpers";

interface Clip {
  doc: Doc;
  summary?: string;
}

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
  export: exportToOrgProtocol,
};
