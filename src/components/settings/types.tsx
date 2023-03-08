import { Settings, SettingsAction } from "@src/lib/settings";

export interface SettingsFormProps {
  settings: Settings;
  dispatch: React.Dispatch<SettingsAction>;
}
