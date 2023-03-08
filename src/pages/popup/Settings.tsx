import { Settings, loadSettings } from "@src/lib/settings";
import { useQuery } from "react-query";

import SettingsForm from "./SettingsForm";

const Settings = () => {
  const { data, error } = useQuery<Settings>("settings", loadSettings);

  return (
    <div className="p-2 pl-3">
      <>
        {error && <p>Failed to load settings</p>}
        {data && <SettingsForm settings={data} />}
      </>
    </div>
  );
};

export default Settings;
