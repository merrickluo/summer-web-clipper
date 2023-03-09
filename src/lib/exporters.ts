import { SettingsFormProps } from "@components/types";
import { FC } from "react";
import { IconType } from "react-icons";
import { Article } from "./readbility";

import OrgModeExporter from "./exporters/orgmode";

export const availableExporters = [OrgModeExporter];

export interface Clip {
  article: Article; // article parsed by readbility
  summary?: string; // generated summary
}

export interface Exporter {
  id: string;
  name: string;
  SettingsComp: FC<SettingsFormProps>;
  Icon: IconType;

  export(clip: Clip, options: any): Promise<void> | void;
}

export const findExporter = (exporterId: string): Exporter | undefined => {
  return availableExporters.find((exp) => exp.id == exporterId);
};
