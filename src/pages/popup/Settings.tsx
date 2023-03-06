import { notionSettingsKey } from "@src/lib/constants";
import { useCallback, useEffect, useState } from "react";
import { storage } from "webextension-polyfill";

const Settings = () => {
  const [spaceId, setSpaceId] = useState<string | undefined>(undefined);

  const handleSetNotionSpaceId = useCallback((event: any) => {
    const spaceId = event.target.value;
    storage.local.set({
      [notionSettingsKey]: { spaceId },
    });
  });

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await storage.local.get(notionSettingsKey);
      setSpaceId(settings[notionSettingsKey]?.spaceId);
    };

    loadSettings();
  }, [setSpaceId]);

  return (
    <div>
      <input
        onChange={handleSetNotionSpaceId}
        type="text"
        placeholder={spaceId || "notion space id"}
      ></input>
    </div>
  );
};

export default Settings;
