import { SettingsFormProps } from "@src/components/types";
import { SyntheticEvent } from "react";

const ClaudeSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { summarizers: { claude = {} } = {} } = settings;

  const handleSetApikey = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/claude/setApikey",
      payload: event.currentTarget.value,
    });
  };

  const handleSetClaudeModel = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/claude/setClaudeModel",
      payload: event.currentTarget.value,
    });
  };

  return (
    <fieldset className="swc:fieldset swc:mt-3">
      <legend className="swc:fieldset-legend swc:text-secondary">
        Claude AI
      </legend>

      <label className="swc:floating-label swc:mt-4">
        <span>API Key</span>
        <input
          type="password"
          id="apikey"
          className="swc:input swc:w-full"
          onChange={handleSetApikey}
          defaultValue={claude.apikey || ""}
        />
      </label>
      <label className="swc:floating-label swc:mt-4">
        <span>Model</span>
        <select
          defaultValue={claude.model}
          onChange={handleSetClaudeModel}
          className="swc:select swc:select-bordered swc:w-full"
        >
          {[
            "claude-3-sonnet-20240229",
            "claude-3-opus-20240229",
            "claude-3-haiku-20240307",
            "claude-3-5-sonnet-latest",
            "claude-3-5-haiku-latest",
          ].map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </label>

      <p className="swc:text-sm swc:text-gray-500 swc:mt-2">
        <span>Find your API Key in the</span>
        <a
          className="swc:underline hover:swc:text-blue-600 swc:ml-1"
          href="https://console.anthropic.com/account/keys"
          target="_blank"
        >
          Anthropic Dashboard
        </a>
        <span>.</span>
      </p>
    </fieldset>
  );
};

export default ClaudeSettings;
