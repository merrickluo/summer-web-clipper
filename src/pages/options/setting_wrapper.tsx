import { SettingsFormProps } from "@components/types";
import {
  loadSettings,
  Settings,
  SettingsAction,
  updateSettings,
} from "@lib/settings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface SettingWrapperProps {
  title: string;
  Content: React.FC<SettingsFormProps>;
}

const SettingWrapper = ({ title, Content }: SettingWrapperProps) => {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery<Settings>({
    queryKey: ["settings"],
    queryFn: loadSettings,
  });

  const { mutate: dispatch } = useMutation({
    mutationFn: async (action: SettingsAction) => {
      if (!data) {
        return;
      }

      return await updateSettings(data, action);
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(["settings"], newData);
    },
  });

  if (isLoading || !data) {
    return <div>Loading Settings</div>;
  }

  return (
    <div className="swc-flex swc-flex-col swc-my-2">
      <div className="swc-pb-2 swc-mb-2">
        <h1 className="swc-font-bold swc-text-2xl">{title}</h1>
      </div>
      <Content settings={data} dispatch={dispatch} />
    </div>
  );
};

export default SettingWrapper;
