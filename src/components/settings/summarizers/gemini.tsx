import { SettingsFormProps } from "@src/components/types";
import { SyntheticEvent } from "react";
import { geminiModels, DEFAULT_GEMINI_MODEL } from "@lib/summarizers/gemini";

const GeminiSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { summarizers: { gemini = {} } = {} } = settings;

  const handleSetApikey = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/gemini/setApikey",
      payload: event.currentTarget.value,
    });
  };

  const handleSetGeminiModel = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/gemini/setGeminiModel",
      payload: event.currentTarget.value,
    });
  };

  return (
    <div className="swc-mt-2">
      <div className="swc-form-control swc-w-full">
        <label className="swc-label">
          <span className="swc-text-secondary swc-text-xs swc-label-text">
            Model
          </span>
        </label>

        <input
          type="text"
          defaultValue={gemini.model || DEFAULT_GEMINI_MODEL}
          onChange={handleSetGeminiModel}
          className="swc-block swc-p-2.5 swc-w-full swc-text-sm swc-text-gray-900 swc-bg-gray-50 swc-rounded-lg swc-border swc-border-gray-300 focus:swc-ring-blue-500 focus:swc-border-blue-500"
          list="model-options"
          autoComplete="off"
        />
        <datalist id="model-options">
          {geminiModels.map((model) => (
            <option key={model} value={model} />
          ))}
        </datalist>
      </div>

      <div className="swc-form-control swc-w-full">
        <label className="swc-label">
          <span className="swc-text-secondary swc-text-xs swc-label-text">
            API Key
          </span>
        </label>
        <input
          type="password"
          id="apikey"
          onChange={handleSetApikey}
          className="swc-block swc-p-2.5 swc-w-full swc-text-sm swc-text-gray-900 swc-bg-gray-50 swc-rounded-lg swc-border swc-border-gray-300 focus:swc-ring-blue-500 focus:swc-border-blue-500"
          defaultValue={gemini.apikey || ""}
        ></input>
      </div>
      <p className="swc-text-sm swc-text-gray-500 swc-mt-2">
        <span>Find your API Key in the</span>
        <a
          className="swc-underline hover:swc-text-blue-600 swc-ml-1"
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
        >
          Google AI Studio
        </a>
        <span>.</span>
      </p>
    </div>
  );
};

export default GeminiSettings;
