import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import TabView from './components/TabView';
import useFetchTab from './hooks/useCurrentTabInfo';
import useGrabAnnotation from './hooks/useAnnotation';
import Annotation from './views/Annotation';
import Vocabularies from './views/Vocabularies';
import NavigationContext from './context/Navigation';
import useChromeStorage from './hooks/useChromeStorage';
import { SettingsContext, SettingsDto } from './context/Settings';

function App() {
  const tab = useFetchTab();
  const annotation = useGrabAnnotation(tab.tabId);
  const storage = useChromeStorage('settings');
  const [settings, setSettingsState] = useState<SettingsDto>({
    mirrorHypothesis: true,
    useCustomHypothesisKey: true,
    customHypothesisKey: '',
    vocabularies: {
      workingGroups: true,
      interestGroups: true,
      pathways: true,
      gorcElements: true,
      gorcAttributes: true,
      domain: true,
    },
  });
  const [activeTab, setActiveTab] = React.useState('Annotation');

  const [tabs, setTabs] = React.useState([
    { label: 'Annotation', active: true },
    { label: 'Vocabularies', active: false },
    // { label: "Settings", active: false },
  ]);

  useEffect(() => {
    if (!storage.loading && storage.value) {
      setSettingsState(storage.value as SettingsDto);
    }
  }, [storage.loading, storage.value]);

  const setSettings = (newSettings: React.SetStateAction<SettingsDto>) => {
    setSettingsState((prevSettings) => {
      // Compute the new settings based on the input action
      const updatedSettings = newSettings instanceof Function
        ? newSettings(prevSettings)
        : newSettings;

      // Persist the updated settings to chrome.storage.sync
      chrome.storage.sync.set({ settings: updatedSettings });

      // Return the updated settings to update the state
      return updatedSettings;
    });
  };

  const setActiveTabs = (label: string) => {
    const newTabs = tabs.map((tabItem) => {
      tabItem.active = tabItem.label === label;
      return tabItem;
    });
    setTabs(newTabs);
    setActiveTab(label);
  };

  if (!tab || !tab.tabId || !tab.tabUrl || storage.loading) {
    return (
      <main className="flex h-screen w-full flex-col">
        <TabView>
          <div className="flex size-full items-center justify-center">
            <p className="text-center text-xl font-bold">
              Collecting Resource Info...
            </p>
          </div>
        </TabView>
      </main>
    );
  }

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <NavigationContext.Provider
        value={{ tabs, setActiveTabs, currentTab: activeTab }}
      >
        <main className="flex h-screen w-full flex-col">
          <TabView>
            {activeTab === 'Annotation' && !annotation && (
              <div className="mt-8 w-full rounded-lg border border-rda-400 bg-white p-6 px-4 pb-4 pt-5 text-left">
                <div className="flex items-start">
                  <div className="mx-0 flex size-10 shrink-0 items-center justify-center rounded-full bg-rda-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-rda-600"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 mt-0 text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Select text to annotate
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        <strong>Before</strong>
                        {' '}
                        filling out the form, please
                        make a selection on the web resource you wish to
                        annotate. If you have already made a selection and are
                        still getting this message, please refresh the page and
                        try again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Annotation' && annotation && (
              <Annotation tabUrl={tab.tabUrl} annotation={annotation} />
            )}
            {activeTab === 'Vocabularies' && <Vocabularies />}
            {/* {activeTab === "Settings" && <Settings />} */}
          </TabView>
        </main>
      </NavigationContext.Provider>
    </SettingsContext.Provider>
  );
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
