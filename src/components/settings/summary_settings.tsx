import { SettingsFormProps } from "@components/types";
import { availableSummarizers, selectedSummarizer } from "@lib/summarizers";
import { SyntheticEvent, useCallback, useMemo } from "react";

const SummarySettings = ({ settings, dispatch }: SettingsFormProps) => {
  const selected = useMemo(() => selectedSummarizer(settings), [settings]);

  const handleSelectSummarizer = useCallback(
    (event: SyntheticEvent<HTMLSelectElement>) => {
      dispatch({
        type: "summarizers/select",
        payload: event.currentTarget.value,
      });
    },
    [dispatch]
  );

  return (
    <div>
      <div className="form-control w-full">
        <label className="label">
          <span className="text-secondary text-xs label-text">Provider</span>
        </label>
        <select
          id="summarizers"
          className="select select-bordered w-full"
          onChange={handleSelectSummarizer}
          defaultValue={selected?.id}
        >
          <option key="emtpy">Select provider</option>
          {availableSummarizers.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {selected && (
        <selected.SettingsComp settings={settings} dispatch={dispatch} />
      )}
    </div>
  );
};

export default SummarySettings;
