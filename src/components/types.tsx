import { Settings, SettingsAction } from "@lib/settings";

export interface SettingsFormProps {
  settings: Settings;
  dispatch: React.Dispatch<SettingsAction>;
}
