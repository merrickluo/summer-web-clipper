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
    <div className="swc:mt-2">
      <div className="swc:form-control swc:w-full">
        <label className="swc:label">
          <span className="swc:text-secondary swc:text-xs swc:label-text">
            API Key
          </span>
        </label>
        <input
          type="password"
          id="apikey"
          onChange={handleSetApikey}
          className="swc:block swc:p-2.5 swc:w-full swc:text-sm swc:text-gray-900 swc:bg-gray-50 swc:rounded-lg swc:border swc:border-gray-300 focus:swc:ring-blue-500 focus:swc:border-blue-500"
          defaultValue={gemini.apikey || ""}
        ></input>
      </div>
      <p className="swc:text-sm swc:text-gray-500 swc:mt-2">
        <span>Find your API Key in the</span>
        <a
          className="swc:underline hover:swc:text-blue-600 swc:ml-1"
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
