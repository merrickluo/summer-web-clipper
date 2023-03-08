import { localStorageGet, localStorageSet } from "./browser";

export interface Settings {
  selectedSummarizer?: string;
  summarizers?: Record<string, any>;
  exporters?: Record<string, any>;
}

export type SettingsActionType =
  | "settings/ready"
  | "summarizer/select"
  | "summarizer/notion/setSpaceId";

export interface SettingsAction {
  type: SettingsActionType;
  payload: any;
}

// only change settings via this reducer
export const settingsReducer = (settings: Settings, action: SettingsAction) => {
  switch (action.type) {
    case "settings/ready":
      return action.payload as Settings;
    case "summarizer/select":
      settings = {
        ...settings,
        selectedSummarizer: action.payload as string,
      };
      // FIXME: this might fail, how to handle this?
      saveSettings(settings);
      return settings;
    case "summarizer/notion/setSpaceId":
      let summarizers = settings.summarizers || {};

      settings = {
        ...settings,
        summarizers: {
          ...summarizers,
          notion: {
            ...summarizers.notion,
            spaceId: action.payload as string,
          },
        },
      };

      saveSettings(settings);
      return settings;
  }
};

export const loadSettings = async (): Promise<Settings> => {
  return (await localStorageGet()) as Settings;
};

const saveSettings = async (settings: Settings) => {
  return localStorageSet(settings);
};
