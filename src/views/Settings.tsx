import React, { useContext } from 'react';
import debounce from 'debounce';
import TextInput from '../components/form/TextInput';
import { SettingsContext } from '../context/Settings';
import LookupInput from '../components/form/LookupInput';

function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);
  const [target, setTarget] = React.useState<string>('RDA_GRAPH');
  const changeAPIkey = (value: string) => {
    setSettings({ ...settings, customHypothesisKey: value });
  };

  const debouncedChangeAPIkey = debounce(changeAPIkey, 300);

  return (
    <>
      <h2 className="pr-4 text-xl font-bold">Settings</h2>
      <form className="my-4 space-y-4 pr-[1px]">
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="size-4 rounded border-gray-300 text-rda-500 focus:ring-rda-500"
              checked={settings.mirrorHypothesis}
              onChange={() => setSettings({
                ...settings,
                mirrorHypothesis: !settings.mirrorHypothesis,
              })}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="comments" className="font-medium text-gray-900">
              Mirror to Hypothesis
            </label>
            <p id="comments-description" className="text-gray-500">
              Enable this to deposit annotations also to Hypothesis.
            </p>
          </div>
        </div>
        {settings.mirrorHypothesis && (
          <>
            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id="custom-api-key"
                  aria-describedby="custom-api-key-description"
                  name="custom-api-key"
                  type="checkbox"
                  className="size-4 rounded border-gray-300 text-rda-500 focus:ring-rda-500"
                  onChange={() => setSettings({
                    ...settings,
                    useCustomHypothesisKey: !settings.useCustomHypothesisKey,
                  })}
                  checked={settings.useCustomHypothesisKey}
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label
                  htmlFor="custom-api-key"
                  className="font-medium text-gray-900"
                >
                  Use my own Hypothesis API Key
                </label>
                <p id="custom-api-key-description" className="text-gray-500">
                  Enable this to use your own Hypothesis API Key.
                </p>
              </div>
            </div>
            {settings.useCustomHypothesisKey && (
              <TextInput
                label="Hypthosis API KEY"
                value={settings.customHypothesisKey}
                onChange={(key, value) => debouncedChangeAPIkey(value)}
              />
            )}
          </>
        )}
        <LookupInput
          type="lookup"
          label="Target for Annoations"
          dataset={[
            { id: 'RDA_GRAPH', label: 'RDA Graph', value: 'RDA_GRAPH' },
          ]}
          onChange={(name, value) => setTarget(value)}
          value="RDA Graph"
        />
      </form>
    </>
  );
}

export default Settings;
