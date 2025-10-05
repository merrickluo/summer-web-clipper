import { SettingsFormProps } from "@components/types";
import { availableExporters, findExporter } from "@lib/exporters";
import { SyntheticEvent, useCallback, useState } from "react";

const ExportSettings = ({ settings, dispatch }: SettingsFormProps) => {
  const [selected, setSelected] = useState(undefined);

  const handleSelectExporter = useCallback(
    (event: SyntheticEvent<HTMLSelectElement>) => {
      const exporter = findExporter(event.currentTarget.value);
      setSelected(exporter);
    },
    [setSelected],
  );

  return (
    <div className="swc:w-full">
      <fieldset className="swc:fieldset swc:w-full">
        <label className="swc:input swc:w-full">
          <span className="swc:label">Exporter</span>
          <select
            id="exporters"
            onChange={handleSelectExporter}
            className="swc:w-full"
            defaultValue={selected?.id}
          >
            <option key="emtpy">Select exporter</option>
            {availableExporters.map(({ id, name }) => (
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

export default ExportSettings;
