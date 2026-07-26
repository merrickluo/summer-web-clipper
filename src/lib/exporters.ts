import OrgModeSettings from "@components/settings/exporters/orgmode";
import { SiOrg } from "react-icons/si";

export const availableExporters = [
  {
    id: "orgmode",
    name: "Org Mode",
    SettingsComp: OrgModeSettings,
    Icon: SiOrg,
  },
];

export const findExporter = (exporterId: string) => {
  return availableExporters.find(({ id }) => id === exporterId);
};
