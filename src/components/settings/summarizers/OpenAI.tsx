import { SettingsFormProps } from "@src/components/types";
import { ChangeEvent, ChangeEventHandler, SyntheticEvent } from "react";
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
    <div className="mt-2">
      <div className="form-control w-full max-w-xs">

        <label className="label">
          <span className="text-secondary text-xs label-text">
            Summary Language
          </span>
        </label>

        <select
          defaultValue={openai.language}
          onChange={handleSetLanguage}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Set summary language</option>
          {topLanguages.map((code) => (
            <option key={code} value={code}>
              {ISO6391.getNativeName(code)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="text-secondary text-xs label-text">
            Model
          </span>
        </label>

        <select
          defaultValue={openai.model}
          onChange={handleSetOpenAIModel}
          className="select select-bordered w-full max-w-xs">
          {["gpt-3.5-turbo", "gpt-3.5-turbo-16k", "gpt-4", "gpt-4-32k"].map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="text-secondary text-xs label-text">API Key</span>
        </label>
        <input
          type="password"
          id="apikey"
          onChange={handleSetApikey}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          defaultValue={openai.apikey || ""}
        ></input>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        <span>Find your API Key in the</span>
        <a
          className="underline hover:text-blue-600 ml-1"
          href="https://platform.openai.com/account/api-keys"
          target="_blank"
        >
          OpenAI Account Settings
        </a>
        <span>.</span>
      </p>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="text-secondary text-xs label-text">Max Words for Summerization</span>
        </label>
        <input
          id="maxwords"
          onChange={handleSetMaxWords}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          defaultValue={openai.maxwords || 2048}
        ></input>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        <span>Default to 2048 words and GPT-3.5-turbo, napkin threshold: (4096-96) / 100 * 75 ~= 3000</span>
      </p>
    </div>
  );
};

export default OpenAISettings;
