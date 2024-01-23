import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import GeneralInput from './components/GeneralInput';

const navigation = [
  { label: 'Annotate', active: true },
  { label: 'Linked Open Data', active: false },
  { label: 'Rate This', active: false },
  { label: 'Publish', active: false },
];

function App() {
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);
  const [currentTitle, setCurrentTitle] = useState<string | undefined>(
    undefined,
  );

  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      setCurrentUrl(currentTab.url ?? '');
      setCurrentTitle(currentTab.title ?? '');
    });
  }, []);

  return (
    <main className="flex h-screen w-full flex-row">
      <section className="w-5/12 bg-rda-400 pt-2">
        <h1 className="px-4 text-2xl font-black">
          <span className="text-white">RDA</span>
          {' '}
          <span className="text-orange-500">TIGER</span>
        </h1>
        <nav className="mt-4">
          <ul className="space-y-2 px-4">
            {navigation.map(({ label, active }) => (
              <li
                key={label}
                className={`rounded-md ${
                  active ? 'bg-rda-300' : 'has-[:hover]:bg-rda-200'
                }`}
              >
                <button
                  type="button"
                  className="block w-full cursor-pointer p-4 text-left text-xl font-bold text-white hover:text-white"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section className="flex h-screen w-7/12 flex-col pl-4 pt-2">
        <h2 className="grow-0 pr-4 text-xl font-bold">Resource Metadata</h2>
        <form
          className="scrolltrack my-4 overflow-y-scroll pr-[1px]"
          action=""
        >
          <GeneralInput label="Title" placeholder={currentTitle} />
          <GeneralInput label="Depositor" />
          <GeneralInput label="Language" />
          <GeneralInput label="Description" />
          <h3 className="mt-4 text-base font-bold">Keywords</h3>
          <div className="mt-4 -space-y-px">
            <GeneralInput label="Keywords" section="top" />
            <GeneralInput label="Pathways" section="middle" />
            <GeneralInput label="GORC" section="middle" />
            <GeneralInput type='select' label="Origin" section="middle" />
            <GeneralInput label="Domain" section="bottom" />
          </div>
          <div className="mt-4 -space-y-px">
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
        </form>
      </section>
    </main>
  );
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
