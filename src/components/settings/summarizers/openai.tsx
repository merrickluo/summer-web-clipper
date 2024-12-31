import { SettingsFormProps } from "@src/components/types";
import { SyntheticEvent } from "react";
import ISO6391 from "iso-639-1";
import { topLanguages } from "@lib/languages";

const OpenAISettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { summarizers: { openai = {} } = {} } = settings;

  const handleSetApikey = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/openai/setApikey",
      payload: event.currentTarget.value,
    });
  };

  const handleSetLanguage = (event: SyntheticEvent<HTMLSelectElement>) => {
    dispatch({
      type: "summarizers/openai/setLanguage",
      payload: event.currentTarget.value,
    });
  };

  const handleSetMaxWords = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/openai/setMaxWords",
      payload: event.currentTarget.value,
    });
  };

  const handleSetOpenAIModel = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/openai/setOpenAIModel",
      payload: event.currentTarget.value,
    });
  };

  return (
    <div className="swc-mt-2">
      <div className="form-control swc-w-full">
        <label className="label">
          <span className="swc-text-secondary swc-text-xs label-text">
            Summary Language
          </span>
        </label>

        <select
          defaultValue={openai.language}
          onChange={handleSetLanguage}
          className="swc-select swc-select-bordered swc-w-full"
        >
          <option value="">Follow article</option>
          {topLanguages.map((code) => (
            <option key={code} value={code}>
              {ISO6391.getNativeName(code)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control swc-w-full">
        <label className="label">
          <span className="swc-text-secondary swc-text-xs label-text">Model</span>
        </label>

        <select
          defaultValue={openai.model}
          onChange={handleSetOpenAIModel}
          className="swc-select swc-select-bordered swc-w-full"
        >
          {[
            "gpt-4o-mini",
            "gpt-4o",
            "deepseek-chat",
            "llama-3.3-70b-versatile",
            "mistral-large-latest",
          ].map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control swc-w-full">
        <label className="label">
          <span className="swc-text-secondary swc-text-xs label-text">API Key</span>
        </label>
        <input
          type="password"
          id="apikey"
          onChange={handleSetApikey}
          className="swc-block swc-p-2.5 swc-w-full swc-text-sm swc-text-gray-900 swc-bg-gray-50 swc-rounded-lg swc-border swc-border-gray-300 focus:swc-ring-blue-500 focus:swc-border-blue-500"
          defaultValue={openai.apikey || ""}
        ></input>
      </div>
      <p className="swc-text-sm swc-text-gray-500 swc-mt-2">
        <span>Find your API Key in the</span>
        <a
          className="swc-underline hover:swc-text-blue-600 swc-ml-1"
          href="https://platform.openai.com/account/api-keys"
          target="_blank"
        >
          OpenAI Account Settings
        </a>{" "}
        or
        <a
          className="swc-underline hover:swc-text-blue-600 swc-ml-1"
          href="https://console.groq.com/keys"
          target="_blank"
        >
          Groq Dashboard
        </a>{" "}
        or
        <a
          className="swc-underline hover:swc-text-blue-600 swc-ml-1"
          href="https://console.mistral.ai/api-keys/"
          target="_blank"
        >
          Mistral Console
        </a>
        <span>.</span>
      </p>

      <div className="form-control swc-w-full">
        <label className="label">
          <span className="text-secondary swc-text-xs label-text">
            Max Words for Summerization
          </span>
        </label>
        <input
          id="maxwords"
          onChange={handleSetMaxWords}
          className="swc-block swc-p-2.5 swc-w-full swc-text-sm swc-text-gray-900 swc-bg-gray-50 swc-rounded-lg swc-border swc-border-gray-300 focus:swc-ring-blue-500 focus:swc-border-blue-500"
          defaultValue={openai.maxwords || 12000}
        ></input>
      </div>
      <p className="swc-text-sm swc-text-gray-500 swc-mt-2">
        <span>
          Default to 12000 words and GPT-4o-mini, should be enough for most
          tabs.
        </span>
      </p>
    </div>
  );
};

export default OpenAISettings;
