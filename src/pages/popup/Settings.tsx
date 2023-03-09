import {
  Settings,
  loadSettings,
  SettingsAction,
  updateSettings,
} from "@lib/settings";
import { useMutation, useQuery, useQueryClient } from "react-query";

import SettingsForm from "./SettingsForm";

const Settings = () => {
  const queryClient = useQueryClient();
  const { data, error } = useQuery<Settings>("settings", loadSettings);

  const { mutate: dispatch } = useMutation(
    async (action: SettingsAction) => {
      if (!data) {
        return;
      }

      return await updateSettings(data, action);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData("settings", data);
      },
    }
  );

  return (
    <div className="p-2 pl-3">
      <>
        {error && <p>Failed to load settings</p>}
        {data && <SettingsForm settings={data} dispatch={dispatch} />}
      </>
    </div>
  );
};

export default Settings;
