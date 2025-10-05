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
    <fieldset className="swc:fieldset swc:mt-2">
      <legend className="swc:fieldset-legend swc:text-secondary">Gemini</legend>

      <label className="swc:floating-label swc:mt-4">
        <span>API Key</span>

        <input
          type="password"
          id="apikey"
          onChange={handleSetApikey}
          className="swc:block swc:p-2.5 swc:w-full swc:text-sm swc:text-gray-900 swc:bg-gray-50 swc:rounded-lg swc:border swc:border-gray-300 focus:swc:ring-blue-500 focus:swc:border-blue-500"
          defaultValue={gemini.apikey || ""}
        ></input>
      </label>

      <label className="swc:floating-label swc:mt-4">
        <span>Model</span>

        <input
          type="text"
          defaultValue={gemini.model || DEFAULT_GEMINI_MODEL}
          onChange={handleSetGeminiModel}
          className="swc:input swc:w-full"
          list="model-options"
          autoComplete="off"
        />
        <datalist id="model-options">
          {geminiModels.map((model) => (
            <option key={model} value={model} />
          ))}
        </datalist>
      </label>

      <p className="swc:text-sm swc:text-gray-500 swc:mt-2">
        <span>Find your API Key in the</span>
        <a
          className="swc:underline hover:swc:text-blue-600 swc:ml-1"
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
        >
          Google AI Studio
        </a>
        <span>.</span>
      </p>
    </fieldset>
  );
};

export default GeminiSettings;
