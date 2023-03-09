import { SettingsFormProps } from "@src/components/types";
import { SyntheticEvent } from "react";

const OpenAISettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { summarizers: { openai = {} } = {} } = settings;

  const handleSetApikey = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "summarizers/openai/setApikey",
      payload: event.currentTarget.value,
    });
  };

  return (
    <div className="mt-2">
      <p className="ml-1 mb-1 text-xs text-gray-400">OpenAI API Key</p>
      <input
        type="password"
        id="apikey"
        onChange={handleSetApikey}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        defaultValue={openai.apikey || ""}
      ></input>
      <p className="text-sm text-gray-500 mt-2">
        <span>Find your API Key in the</span>
        <a
          className="underline hover:text-blue-600 ml-1"
          href="https://platform.openai.com/account/api-keys"
        >
          OpenAI Account Settings
        </a>
        <span>.</span>
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Note that OpenAI limit the token size to 4096 per request, so if the
        content is too long, it will be truncated, so the result might not be as
        good.
      </p>
    </div>
  );
};

export default OpenAISettings;
