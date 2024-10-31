import { SettingsFormProps } from "@src/components/types";
import { SyntheticEvent } from "react";

const GeminiSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { summarizers: { gemini = {} } = {} } = settings;

  const handleSetApikey = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/gemini/setApikey",
      payload: event.currentTarget.value,
    });
  };

  return (
    <div className="mt-2">

      <div className="form-control w-full">
        <label className="label">
          <span className="text-secondary text-xs label-text">API Key</span>
        </label>
        <input
          type="password"
          id="apikey"
          onChange={handleSetApikey}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          defaultValue={gemini.apikey || ""}
        ></input>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        <span>Find your API Key in the</span>
        <a
          className="underline hover:text-blue-600 ml-1"
          href="https://console.cloud.google.com/vertex-ai/generative"
          target="_blank"
        >
          Google Cloud Console
        </a>
        <span>.</span>
      </p>

    </div>
  );
};

export default GeminiSettings;
