import ClaudeSettings from "@components/settings/summarizers/claude";
import GeminiSettings from "@components/settings/summarizers/gemini";
import OpenAISettings from "@components/settings/summarizers/openai";
import type { Settings } from "./settings";

export const availableSummarizers = [
  { id: "claude", name: "Claude AI", SettingsComp: ClaudeSettings },
  { id: "openai", name: "OpenAI Compatible", SettingsComp: OpenAISettings },
  { id: "gemini", name: "Gemini", SettingsComp: GeminiSettings },
];

export const selectedSummarizer = (settings: Settings) => {
  return availableSummarizers.find(
    ({ id }) => id === settings.selectedSummarizer,
  );
};
