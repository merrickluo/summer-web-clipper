import {
  loadSettings,
  SettingsActionType,
  settingsReducer,
} from "@src/lib/setting";
import { ChangeEvent, useCallback, useEffect, useReducer } from "react";

const Settings = () => {
  const [settings, dispatch] = useReducer(settingsReducer, {});

  useEffect(() => {
    const load = async () => {
      const settings = await loadSettings();
      dispatch({ type: "settings/ready", payload: settings });
    };

    load();
  }, [dispatch]);

  const handleSettingChange = useCallback(
    (action: SettingsActionType) => {
      return (event: ChangeEvent<HTMLInputElement>) => {
        const payload = event.currentTarget.value;
        dispatch({ type: action, payload });
      };
    },
    [dispatch]
  );

  return (
    <div className="">
      <section className="p-2 pl-3">
        <h2 className="text-xs text-gray-500">Summary Generation</h2>
        <div className="bg-white rounded-lg p-2 pt-4">
          <select
            id="summarizer"
            className="border bg-transparent border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
          >
            <option selected>Choose a Summarizer</option>
            <option value="notion">Notion AI</option>
          </select>
        </div>
      </section>
    </div>
  );
};

export default Settings;
