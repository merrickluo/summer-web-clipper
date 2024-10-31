import { SettingsFormProps } from "@components/types";
import {
  loadSettings,
  Settings,
  SettingsAction,
  updateSettings,
} from "@lib/settings";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface SettingWrapperProps {
  title: string;
  Content: React.FC<SettingsFormProps>;
}

const SettingWrapper = ({ title, Content }: SettingWrapperProps) => {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery<Settings>(
    "settings",
    loadSettings
  );

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

  if (isLoading || !data) {
    return <div>Loading Settings</div>;
  }

  return (
    <div className="flex flex-col my-2">
      <div className="pb-2 mb-2">
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
      <Content settings={data} dispatch={dispatch} />
    </div>
  );
};

export default SettingWrapper;
