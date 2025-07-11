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
    <div className="swc:form-control">
      <label className="swc:label swc:cursor-pointer">
        <span>Auto Generate Summary on Open</span>
        <input
          type="checkbox"
          className="swc:toggle"
          defaultChecked={general.autoSummary}
          onChange={handleChangeAutoSummary}
        />
      </label>
    </div>
  );
};

export default GeneralSettings;
