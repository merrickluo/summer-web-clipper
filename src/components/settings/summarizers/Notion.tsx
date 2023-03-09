import Select from "@components/Select";
import { sendMessage } from "@lib/browser";
import { SyntheticEvent } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useQuery } from "react-query";
import { SettingsFormProps } from "@components/types";

const NotionSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const { data: spaces, isFetched } = useQuery("notion/spaces", async () => {
    return sendMessage({ to: "background" }, { action: "notion/getSpaces" });
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

export default NotionSettings;
