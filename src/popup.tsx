import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import GeneralInput from './components/GeneralInput';
import ComboBoxInput from './components/ComboBoxInput';
import SidebarView from './components/SidebarView';
import TabView from './components/TabView';

function App() {
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);
  const [currentTitle, setCurrentTitle] = useState<string | undefined>(
    undefined,
  );
  const [pathways, setPathways] = useState<{ id: string; label: string }[]>([]);

  function remapData(rawData: any[], id_key: string, label_key: string) {
    return rawData.map((item: any) => ({
      id: item[id_key],
      label: item[label_key],
    }));
  }

  async function fetchPathways() {
    const response = await fetch('https://globhut.labs.dans.knaw.nl/pathways');
    const data = await response.json();
    setPathways(remapData(data, 'id', 'title'));
  }

  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      setCurrentUrl(currentTab.url ?? '');
      setCurrentTitle(currentTab.title ?? '');
    });

    fetchPathways();
  }, []);

  return (
    <main className="flex h-screen w-full flex-col">
      <TabView>
        <GeneralInput label="Title" placeholder={currentTitle} />
        <GeneralInput label="Depositor" />
        <GeneralInput label="Language" />
        <GeneralInput label="Description" />
        <h3 className="text-base font-bold">Keywords</h3>
        <div className="-space-y-px">
          <GeneralInput label="Keywords" section="top" />
          <GeneralInput label="Pathways" section="middle" />
          <GeneralInput label="GORC" section="middle" />
          <ComboBoxInput data={pathways} label="Origin" section="middle" />
          <GeneralInput label="Domain" section="bottom" />
        </div>
        <div className="-space-y-px">
          <GeneralInput
            section="top"
            required
            disabled
            label="Resource"
            value={currentUrl}
          />
          <GeneralInput
            section="bottom"
            required
            disabled
            type="date"
            label="Created At"
            value={currentDate}
          />
        </div>
      </TabView>
    </main>
  );
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
