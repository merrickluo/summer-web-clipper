import GeneralSettings from "@components/settings/GeneralSettings";
import { Settings, SettingsAction } from "@lib/settings";
import { availableSummarizers, selectedSummarizer } from "@lib/summarizers";
import { availableExporters, findExporter } from "@src/lib/exporters";
import {
  useCallback,
  SyntheticEvent,
  useMemo,
  ReactNode,
  useState,
} from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const SettingsSection = ({ children, title }: SectionProps) => {
  return (
    <section>
      <h2 className="text-base mt-2 text-gray-500 ml-1">{title}</h2>
      <div className="bg-white rounded-lg mt-2 px-3 py-2">{children}</div>
    </section>
  );
};

const SettingsForm = ({
  settings,
  dispatch,
}: {
  settings: Settings;
  dispatch: (action: SettingsAction) => any;
}) => {
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

  const [exporter, setExporter] = useState(availableExporters[0]);

  const handleSelectExporter = useCallback(
    (event: SyntheticEvent<HTMLSelectElement>) => {
      const exporter =
        findExporter(event.currentTarget.value) || availableExporters[0];
      setExporter(exporter);
    },
    [setExporter]
  );

  return (
    <>
      <SettingsSection title="General">
        <GeneralSettings settings={settings} dispatch={dispatch} />
      </SettingsSection>
      <SettingsSection title="Summary">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-secondary text-xs label-text">Provider</span>
          </label>
          <select
            id="summarizers"
            className="select select-bordered w-full max-w-xs"
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
      </SettingsSection>
      <SettingsSection title="Export">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-secondary text-xs label-text">Exporter</span>
          </label>
          <select
            id="exporters"
            className="select select-bordered w-full max-w-xs"
            onChange={handleSelectExporter}
            defaultValue={exporter?.id}
          >
            <option key="emtpy">Select exporter</option>
            {availableExporters.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {exporter && (
            <exporter.SettingsComp settings={settings} dispatch={dispatch} />
          )}
        </div>
      </SettingsSection>
    </>
  );
};

export default SettingsForm;
