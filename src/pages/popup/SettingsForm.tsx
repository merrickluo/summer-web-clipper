import Select from "@src/components/Select";
import { Settings, settingsReducer } from "@src/lib/settings";
import { avaiableSummarizers, selectedSummarizer } from "@src/lib/summarizer";
import { useReducer, useCallback, SyntheticEvent, useMemo } from "react";

const SettingsForm = ({ settings }: { settings: Settings }) => {
  const [settingsR, dispatch] = useReducer(settingsReducer, settings);
  const selected = useMemo(() => selectedSummarizer(settingsR), [settingsR]);

  const handleSelectSummarizer = useCallback(
    (event: SyntheticEvent<HTMLSelectElement>) => {
      dispatch({
        type: "summarizer/select",
        payload: event.currentTarget.value,
      });
    },
    [dispatch]
  );

  return (
    <section className="mt-2">
      <h2 className="text-base text-gray-500 ml-1">Summary Generation</h2>
      <div className="bg-white rounded-lg mt-2 p-3 pb-2">
        <div>
          <p className="ml-1 mb-1 text-xs text-gray-400">Provider</p>
          <Select
            id="summarizers"
            onChange={handleSelectSummarizer}
            defaultValue={selected?.id}
          >
            <option key="emtpy">Select provider</option>
            {avaiableSummarizers.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </div>
        {selected && (
          <selected.SettingsComp settings={settingsR} dispatch={dispatch} />
        )}
      </div>
    </section>
  );
};

export default SettingsForm;
