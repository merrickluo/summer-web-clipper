import { storage } from "webextension-polyfill";

interface Settings {
  selectedSummarizer?: string;
  summarizers?: Record<string, any>;
  exporters?: Record<string, any>;
}

export type SettingsActionType =
  | "settings/ready"
  | "summarizer/select"
  | "summarizer/notion/setSpaceId";

interface SettingsAction {
  type: SettingsActionType;
  payload: any;
}

// only change settings via this reducer
export const settingsReducer = (settings: Settings, action: SettingsAction) => {
  switch (action.type) {
    case "settings/ready":
      return action.payload as Settings;
    case "summarizer/select":
      settings.selectedSummarizer = action.payload as string;
      // FIXME: this might fail, how to handle this?
      saveSettings(settings);
      return settings;
    case "summarizer/notion/setSpaceId":
      let summarizers = settings.summarizers || {};
      summarizers.notion = {
        spaceId: action.payload as string,
        ...summarizers.notion,
      };

      settings.summarizers = summarizers;
      saveSettings(settings);
      return settings;
  }
};

export const loadSettings = async (): Promise<Settings> => {
  const settings = await storage.local.get();

  return settings as Settings;
};

const saveSettings = async (settings: Settings) => {
  return storage.local.set(settings);
};
