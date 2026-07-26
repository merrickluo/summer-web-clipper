import { SettingsFormProps } from "@src/components/types";
import { useMemo } from "react";
import ISO6391 from "iso-639-1";
import { topLanguages } from "@lib/languages";

const providers = [
  {
    baseurl: "https://api.openai.com",
    models: ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"],
  },
  {
    baseurl: "https://api.groq.com/openai",
    models: [
      "openai/gpt-oss-120b",
      "llama-3.3-70b-versatile",
      "openai/gpt-oss-20b",
      "llama-3.1-8b-instant",
    ],
  },
  {
    baseurl: "https://api.mistral.ai",
    models: [
      "mistral-medium-3-5",
      "mistral-large-2512",
      "mistral-small-2603",
    ],
  },
  {
    baseurl: "https://api.deepseek.com",
    models: ["deepseek-v4-pro", "deepseek-v4-flash"],
  },
];

const serviceTiers = [
  { label: "Omit", value: "" },
  { label: "Flex", value: "flex" },
  { label: "Priority", value: "priority" },
];

const OpenAISettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { summarizers: { openai = {} } = {} } = settings;

  const selectedProvider = useMemo(() => {
    return providers.find((p) => {
      return p.baseurl === openai.baseurl;
    });
  }, [openai]);

  const updateOpenAI = (payload: Record<string, string | boolean>) => {
    dispatch({ type: "summarizers/openai/update", payload });
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
          onChange={(event) =>
            updateOpenAI({ language: event.currentTarget.value })
          }
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
          placeholder="https://api.openai.com"
          defaultValue={openai.baseurl}
          onChange={(event) =>
            updateOpenAI({ baseurl: event.currentTarget.value })
          }
          className="swc:input swc:w-full"
          list="baseurl-options"
          autoComplete="off"
        />
        <datalist id="baseurl-options">
          {providers.map((p) => (
            <option key={p.baseurl} value={p.baseurl} />
          ))}
        </datalist>
      </label>

      <label className="swc:floating-label swc:mt-4">
        <span>Model</span>

        <input
          type="text"
          defaultValue={openai.model}
          onChange={(event) =>
            updateOpenAI({ model: event.currentTarget.value })
          }
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
          onChange={(event) =>
            updateOpenAI({ apikey: event.currentTarget.value })
          }
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

      <div className="swc:mt-4">
        <span className="swc:label">Service Tier</span>
        <div className="swc:join">
          {serviceTiers.map(({ label, value }) => (
            <input
              key={label}
              type="radio"
              name="service-tier"
              value={value}
              aria-label={label}
              className="swc:join-item swc:btn"
              defaultChecked={(openai.serviceTier || "") === value}
              onChange={(event) =>
                updateOpenAI({ serviceTier: event.currentTarget.value })
              }
            />
          ))}
        </div>
      </div>

      <label className="swc:label swc:cursor-pointer swc:mt-4">
        <input
          type="checkbox"
          className="swc:checkbox"
          defaultChecked={!!openai.lowVerbosity}
          onChange={(event) =>
            updateOpenAI({ lowVerbosity: event.currentTarget.checked })
          }
        />
        <span className="swc:text-base">Lower output verbosity</span>
      </label>
    </fieldset>
  );
};

export default OpenAISettings;
