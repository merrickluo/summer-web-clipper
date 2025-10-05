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
    [dispatch],
  );

  return (
    <div>
      <fieldset className="swc:fieldset swc:w-full">
        <label className="swc:select swc:w-full">
          <span className="swc:label">Provider</span>
          <select
            id="summarizers"
            onChange={handleSelectSummarizer}
            defaultValue={selected?.id}
          >
            <option key="empty">Select provider</option>
            {availableSummarizers.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      {selected && (
        <selected.SettingsComp settings={settings} dispatch={dispatch} />
      )}
    </div>
  );
};

export default SummarySettings;
