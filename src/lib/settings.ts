import { localStorageGet, localStorageSet } from "./browser";

export interface Settings {
  selectedSummarizer?: string;
  summarizers?: Record<string, any>;
  exporters?: Record<string, any>;
  general?: Record<string, any>;
}

export type SettingsActionType =
  | "general/setAutoSummary"
  | "summarizers/select"
  | "summarizers/notion/setSpaceId"
  | "summarizers/openai/setApikey"
  | "summarizers/openai/setLanguage"
  | "exporters/orgmode/setTemplate";

export interface SettingsAction {
  type: SettingsActionType;
  payload: any;
}

export const updateSettings = async (
  settings: Settings,
  action: SettingsAction
) => {
  switch (action.type) {
    case "general/setAutoSummary":
      settings = {
        ...settings,
        general: {
          ...settings.general,
          autoSummary: action.payload,
        },
      };
      break;
    case "summarizers/select":
      settings = {
        ...settings,
        selectedSummarizer: action.payload as string,
      };
      break;

    case "summarizers/notion/setSpaceId":
      settings = {
        ...settings,
        summarizers: {
          ...settings.summarizers,
          notion: {
            ...settings.summarizers?.notion,
            spaceId: action.payload as string,
          },
        },
      };

      break;
    case "summarizers/openai/setApikey":
      settings = {
        ...settings,
        summarizers: {
          ...settings.summarizers,
          openai: {
            ...settings.summarizers?.openai,
            apikey: action.payload as string,
          },
        },
      };

      break;
    case "summarizers/openai/setLanguage":
      settings = {
        ...settings,
        summarizers: {
          ...settings.summarizers,
          openai: {
            ...settings.summarizers?.openai,
            language: action.payload as string,
          },
        },
      };

      break;
      case "summarizers/openai/setMaxTokens":
        settings = {
          ...settings,
          summarizers: {
            ...settings.summarizers,
            openai: {
              ...settings.summarizers?.openai,
              maxtokens: action.payload as string,
            },
          },
        };
  
        break;
    case "exporters/orgmode/setTemplate":
      settings = {
        ...settings,
        exporters: {
          ...settings.exporters,
          orgmode: {
            ...settings.exporters?.orgmode,
            template: action.payload as string,
          },
        },
      };
      break;
  }

  await saveSettings(settings);
  return settings;
};

export const loadSettings = async (): Promise<Settings> => {
  return (await localStorageGet()) as Settings;
};

const saveSettings = async (settings: Settings) => {
  return localStorageSet(settings);
};
