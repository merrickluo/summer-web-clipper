import { localStorageGet, localStorageSet } from "./browser";
import gemini from "./summarizers/gemini";

export interface Settings {
  selectedSummarizer?: string;
  summarizers?: Record<string, any>;
  exporters?: Record<string, any>;
  general?: Record<string, any>;
}

export type SettingsActionType =
  | "general/setAutoSummary"
  | "summarizers/select"
  | "summarizers/claude/setApikey"
  | "summarizers/claude/setClaudeModel"
  | "summarizers/gemini/setApikey"
  | "summarizers/openai/setApikey"
  | "summarizers/openai/setLanguage"
  | "exporters/orgmode/setTemplate"
  | "summarizers/openai/setMaxWords"
  | "summarizers/openai/setOpenAIModel"
  | "summarizers/openai/setBaseURL";

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

    case "summarizers/claude/setApikey":
      settings = {
        ...settings,
        summarizers: {
          ...settings.summarizers,
          claude: {
            ...settings.summarizers?.claude,
            apikey: action.payload as string,
          },
        },
      };

      break;
    case "summarizers/claude/setClaudeModel":
      settings = {
        ...settings,
        summarizers: {
          ...settings.summarizers,
          claude: {
            ...settings.summarizers?.claude,
            model: action.payload as string,
          },
        },
      };

      break;
    case "summarizers/gemini/setApikey":
      settings = {
        ...settings,
        summarizers: {
          ...settings.summarizers,
          gemini: {
            ...settings.summarizers?.gemini,
            apikey: action.payload as string,
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
    case "summarizers/openai/setMaxWords":
      settings = {
        ...settings,
        summarizers: {
          ...settings.summarizers,
          openai: {
            ...settings.summarizers?.openai,
            maxwords: action.payload as string,
          },
        },
      };

      break;
    case "summarizers/openai/setOpenAIModel":
      settings = {
        ...settings,
        summarizers: {
          ...settings.summarizers,
          openai: {
            ...settings.summarizers?.openai,
            model: action.payload as string,
          },
        },
      };
      break;
    case "summarizers/openai/setBaseURL":
      console.log("set base url: ", action);
      settings = {
        ...settings,
        summarizers: {
          ...settings.summarizers,
          openai: {
            ...settings.summarizers?.openai,
            baseurl: action.payload as string,
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
