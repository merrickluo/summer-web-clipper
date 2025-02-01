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
    <div className="swc-mt-2">
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
          defaultValue={claude.apikey || ""}
        ></input>
      </div>
      <div className="swc-form-control swc-w-full">
        <label className="swc-label">
          <span className="swc-text-secondary swc-text-xs swc-label-text">
            Model
          </span>
        </label>
        <select
          defaultValue={claude.model}
          onChange={handleSetClaudeModel}
          className="swc-select swc-select-bordered swc-w-full"
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
      </div>
      <p className="swc-text-sm swc-text-gray-500 swc-mt-2">
        <span>Find your API Key in the</span>
        <a
          className="swc-underline hover:swc-text-blue-600 swc-ml-1"
          href="https://console.anthropic.com/account/keys"
          target="_blank"
        >
          Anthropic Dashboard
        </a>
        <span>.</span>
      </p>
    </div>
  );
};

export default ClaudeSettings;
