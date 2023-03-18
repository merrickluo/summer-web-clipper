import Select from "@components/Select";
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
    <section className="mt-2">
      <h2 className="text-base text-gray-500 ml-1">{title}</h2>
      <div className="bg-white rounded-lg mt-2 p-3 pb-2">{children}</div>
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
      <SettingsSection title="Summary Generation">
        <>
          <p className="ml-1 mb-1 text-xs text-gray-400">Provider</p>
          <Select
            id="summarizers"
            onChange={handleSelectSummarizer}
            defaultValue={selected?.id}
          >
            <option key="emtpy">Select provider</option>
            {availableSummarizers.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </>
        {selected && (
          <selected.SettingsComp settings={settings} dispatch={dispatch} />
        )}
      </SettingsSection>
      <SettingsSection title="Export">
        <>
          <p className="ml-1 mb-1 text-xs text-gray-400">Exporter</p>
          <Select
            id="exporters"
            onChange={handleSelectExporter}
            defaultValue={exporter?.id}
          >
            <option key="emtpy">Select provider</option>
            {availableExporters.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
          {exporter && (
            <exporter.SettingsComp settings={settings} dispatch={dispatch} />
          )}
        </>
      </SettingsSection>
    </>
  );
};

export default SettingsForm;
