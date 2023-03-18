import { SettingsFormProps } from "@components/types";
import { SyntheticEvent } from "react";

const GeneralSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { general = { autoSummary: false } } = settings;

  const handleChangeAutoSummary = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatch({
      type: "general/setAutoSummary",
      payload: event.currentTarget.checked,
    });
  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text text-gray-500">
          Generate summary on open
        </span>
        <input
          type="checkbox"
          className="toggle"
          defaultChecked={general.autoSummary}
          onChange={handleChangeAutoSummary}
        />
      </label>
    </div>
  );
};

export default GeneralSettings;
