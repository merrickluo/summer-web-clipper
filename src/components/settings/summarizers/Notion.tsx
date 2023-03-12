import Select from "@components/Select";
import { sendMessage } from "@lib/browser";
import { ReactNode, SyntheticEvent } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SettingsFormProps } from "@components/types";
import Button from "@components/Button";

const checkPermission = async () => {
  return await chrome.permissions.contains({
    origins: ["https://www.notion.so/*"],
  });
};

const requestPermission = async () => {
  return await chrome.permissions.request({
    origins: ["https://www.notion.so/*"],
  });
};

const HostPermissionWrapper = ({ children }: { children: ReactNode }) => {
  const { data: permissionGranted } = useQuery(
    "notion/permission",
    checkPermission,
    { retry: false }
  );

  console.log(permissionGranted);

  const queryClient = useQueryClient();
  const permission = useMutation(requestPermission, {
    onSuccess: (granted) => {
      queryClient.setQueryData("notion/permission", granted);
    },
  });

  if (!permissionGranted) {
    return (
      <div className="mt-2">
        <p>
          Host permission to www.notion.so access is required to use Notion AI.
        </p>
        <Button onClick={() => permission.mutate()}>Grant Permission</Button>
      </div>
    );
  }

  return <>{children}</>;
};

const SpaceSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { data: spaces, isFetched } = useQuery("notion/spaces", async () => {
    return sendMessage({
      to: "background",
      message: { action: "notion/getSpaces" },
    });
  });

  const handleSelectSpace = (event: SyntheticEvent<HTMLSelectElement>) => {
    dispatch({
      type: "summarizers/notion/setSpaceId",
      payload: event.currentTarget.value,
    });
  };

  return (
    <div className="mt-2">
      <div className="flex items-end">
        <div>
          <p className="ml-1 mb-1 text-xs text-gray-400">Workspace</p>
          {isFetched && (
            <Select
              id="spaceId"
              onChange={handleSelectSpace}
              defaultValue={settings.summarizers?.notion?.spaceId}
            >
              {spaces &&
                spaces.map(({ id, name }: any) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </Select>
          )}
        </div>
        <div className="flex text-sm ml-4 mb-1 underline">
          <BiLinkExternal className="w-4 h-4" />
          <a href="https://www.notion.so" target="_blank">
            Login to Notion
          </a>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        To use Notion AI for generating summary, you need to login to notion and
        select a workspace with AI plugin enabled. If no workspace showing up,
        try login to notion first.
      </p>
    </div>
  );
};

const NotionSettings = (props: SettingsFormProps) => {
  return (
    <HostPermissionWrapper>
      <SpaceSettings {...props} />
    </HostPermissionWrapper>
  );
};

export default NotionSettings;
