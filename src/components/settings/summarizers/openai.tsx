import { SettingsFormProps } from "@src/components/types";
import { SyntheticEvent, useMemo } from "react";
import ISO6391 from "iso-639-1";
import { topLanguages } from "@lib/languages";
import { providers } from "@lib/summarizers/openai";

const OpenAISettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { summarizers: { openai = {} } = {} } = settings;

  const selectedProvider = useMemo(() => {
    return providers.find((p) => {
      return p.baseurl === openai.baseurl;
    });
  }, [openai]);

  const handleSetApikey = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/openai/setApikey",
      payload: event.currentTarget.value,
    });
  };

  const handleSetBaseURL = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/openai/setBaseURL",
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
    <fieldset className="swc:fieldset swc:mt-2">
      <legend className="swc:fieldset-legend swc:text-secondary">
        OpenAI Compatible
      </legend>

      <label className="swc:floating-label swc:mt-4">
        <span>Summary Language</span>
        <select
          defaultValue={openai.language}
          onChange={handleSetLanguage}
          className="swc:select swc:select-bordered swc:w-full"
        >
          <option value="">Follow article</option>
          {topLanguages.map((code) => (
            <option key={code} value={code}>
              {ISO6391.getNativeName(code)}
            </option>
          ))}
        </select>
      </label>

      <label className="swc:floating-label swc:mt-4">
        <span>Base URL</span>
        <input
          type="text"
          defaultValue={openai.baseurl}
          onChange={handleSetBaseURL}
          className="swc:input swc:w-full"
          list="baseurl-options"
          autoComplete="off"
        />
        <datalist id="baseurl-options">
          {providers.map((p) => (
            <option key={p.name} value={p.baseurl} />
          ))}
        </datalist>
      </label>

      <label className="swc:floating-label swc:mt-4">
        <span>Model</span>

        <input
          type="text"
          defaultValue={openai.model}
          onChange={handleSetOpenAIModel}
          className="swc:input swc:w-full"
          list="model-options"
          autoComplete="off"
        />
        <datalist id="model-options">
          {selectedProvider &&
            selectedProvider.models.map((model) => (
              <option key={model} value={model} />
            ))}
        </datalist>
      </label>

      <label className="swc:floating-label swc:mt-4">
        <span>API Key</span>
        <input
          type="password"
          id="apikey"
          onChange={handleSetApikey}
          className="swc:input swc:w-full"
          defaultValue={openai.apikey || ""}
        ></input>

        <p className="swc:text-sm swc:text-gray-500 swc:mt-2">
          <span>Find your API Key in the</span>
          <a
            className="swc:underline hover:swc:text-blue-600 swc:ml-1"
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
          >
            OpenAI Account Settings
          </a>{" "}
          or
          <a
            className="swc:underline hover:swc:text-blue-600 swc:ml-1"
            href="https://console.groq.com/keys"
            target="_blank"
          >
            Groq Dashboard
          </a>{" "}
          or
          <a
            className="swc:underline hover:swc:text-blue-600 swc:ml-1"
            href="https://console.mistral.ai/api-keys/"
            target="_blank"
          >
            Mistral Console
          </a>
          <span>.</span>
        </p>
      </label>

      <label className="swc:floating-label swc:mt-4">
        <span>Max Words for Summerization</span>
        <input
          id="maxwords"
          onChange={handleSetMaxWords}
          className="swc:input swc:w-full"
          defaultValue={openai.maxwords || 12000}
        ></input>
        <p className="swc:text-sm swc:text-gray-500 swc:mt-2">
          <span>
            Default to 12000 words and GPT-4o-mini, should be enough for most
            tabs.
          </span>
        </p>
      </label>
    </fieldset>
  );
};

export default OpenAISettings;
