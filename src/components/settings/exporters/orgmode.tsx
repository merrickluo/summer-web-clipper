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
    <div className="form-control swc-w-full">
      <label className="swc-label">
        <span className="swc-text-secondary swc-text-xs label-text">Template</span>
      </label>
      <textarea
        id="template"
        rows={3}
        onChange={handleSetTemplate}
        className="swc-textarea swc-textarea-bordered"
        placeholder="org-protocol://roam-ref?template=s&ref={url}&title={title}&body={summary}"
        defaultValue={orgmode.template || ""}
      ></textarea>
    </div>
  );
};

export default OrgModeSettings;
