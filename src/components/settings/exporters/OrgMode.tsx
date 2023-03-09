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
    <div className="mt-2">
      <p className="ml-1 mb-1 text-xs text-gray-400">Org Protocol Template</p>
      <textarea
        id="template"
        rows={3}
        onChange={handleSetTemplate}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Example: org-protocol://roam-ref?template=s&ref={url}&title={title}&body={summary}"
        defaultValue={orgmode.template || ""}
      ></textarea>
    </div>
  );
};

export default OrgModeSettings;
