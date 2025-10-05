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
    <fieldset className="swc:fieldset">
      <label className="swc:label swc:cursor-pointer">
        <input
          type="checkbox"
          className="swc:toggle"
          defaultChecked={general.autoSummary}
          onChange={handleChangeAutoSummary}
        />
        <span className="swc:text-base">Auto Generate Summary on Open</span>
      </label>
    </fieldset>
  );
};

export default GeneralSettings;
