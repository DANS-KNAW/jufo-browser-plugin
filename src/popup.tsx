import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import GeneralInput from './components/GeneralInput';

function App() {
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      setCurrentUrl(currentTab.url ?? '');
    });
  }, []);

  return (
    <main className="flex h-screen w-full flex-row">
      <section className="w-5/12 bg-rda-400 px-4 pt-2">
        <h1 className="text-2xl font-black">
          <span className="text-white">RDA</span>
          {' '}
          <span className="text-gray-900">TIGER</span>
        </h1>
      </section>
      <section className="flex h-screen w-7/12 flex-col pl-4 pt-2">
        <h2 className="grow-0 pr-4 text-xl font-bold">Resource Metadata</h2>
        <form className="scrolltrack mt-4 grow space-y-2 overflow-y-scroll pr-[1px]" style={{}} action="">
          <GeneralInput label="Title" placeholder="John Doe" />
          <GeneralInput disabled label="Resource" value={currentUrl} />
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
