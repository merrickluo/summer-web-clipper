import { SettingsFormProps } from "@components/types";
import { availableExporters, findExporter } from "@lib/exporters";
import { SyntheticEvent, useCallback, useState } from "react";

const ExportSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const [selected, setSelected] = useState(availableExporters[0]);

  const handleSelectExporter = useCallback(
    (event: SyntheticEvent<HTMLSelectElement>) => {
      const exporter =
        findExporter(event.currentTarget.value) || availableExporters[0];
      setSelected(exporter);
    },
    [setSelected]
  );

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="text-secondary text-xs label-text">Exporter</span>
      </label>
      <select
        id="exporters"
        className="select select-bordered w-full"
        onChange={handleSelectExporter}
        defaultValue={selected?.id}
      >
        <option key="emtpy">Select exporter</option>
        {availableExporters.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      {selected && (
        <selected.SettingsComp settings={settings} dispatch={dispatch} />
      )}
    </div>
  );
};

export default ExportSettings;
