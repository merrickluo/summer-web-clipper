import { SettingsFormProps } from "@src/components/types";
import { ReactEventHandler } from "react";

const OrgModeSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { exporters: { orgmode = {} } = {} } = settings;

  const handleSetTemplate: ReactEventHandler<HTMLTextAreaElement> = (event) => {
    dispatch({
      type: "exporters/orgmode/setTemplate",
      payload: event.currentTarget.value,
    });
  };

  return (
    <fieldset className="swc:fieldset swc:mt-2">
      <legend className="swc:fieldset-legend swc:text-secondary">
        Org Mode
      </legend>

      <label className="swc:floating-label">
        <span>Template</span>
        <textarea
          id="template"
          rows={3}
          onChange={handleSetTemplate}
          className="swc:textarea swc:w-full"
          placeholder="org-protocol://roam-ref?template=s&ref={url}&title={title}&body={summary}"
          defaultValue={orgmode.template || ""}
        ></textarea>
      </label>
    </fieldset>
  );
};

export default OrgModeSettings;
