import { SettingsFormProps } from "@src/components/types";
import { SyntheticEvent } from "react";
import ISO6391 from "iso-639-1";
import { topLanguages } from "@lib/languages";

const tokenLimitWarning = "Content longer than 2048 token will be truncated.";

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

  return (
    <div className="mt-2">
      <select
        defaultValue={openai.language}
        onChange={handleSetLanguage}
        className="mt-2 select select-bordered max-w-xs"
      >
        <option value="">Set summary language</option>
        {topLanguages.map((code) => (
          <option key={code} value={code}>
            {ISO6391.getNativeName(code)}
          </option>
        ))}
      </select>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">API Key</span>
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
    </div>
  );
};

export default OpenAISettings;
