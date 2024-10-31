import { SettingsFormProps } from "@src/components/types";
import { SyntheticEvent } from "react";

const OrgModeSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { exporters: { orgmode = {} } = {} } = settings;

  const handleSetTemplate = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "exporters/orgmode/setTemplate",
      payload: event.currentTarget.value,
    });
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="text-secondary text-xs label-text">Template</span>
      </label>
      <textarea
        id="template"
        rows={3}
        onChange={handleSetTemplate}
        className="textarea textarea-bordered"
        placeholder="org-protocol://roam-ref?template=s&ref={url}&title={title}&body={summary}"
        defaultValue={orgmode.template || ""}
      ></textarea>
    </div>
  );
};

export default OrgModeSettings;
