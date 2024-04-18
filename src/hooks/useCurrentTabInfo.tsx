import { useState, useEffect } from 'react';

interface TabInfo {
  tabUrl?: string;
  tabTitle?: string;
  tabId?: number;
  error?: string;
}

/**
 * Custom hook that fetches information about the active tab.
 * @returns {TabInfo} The tab information object.
 */
function useCurrentTabInfo(): TabInfo {
  const [tabInfo, setTabInfo] = useState<TabInfo>({});

  useEffect(() => {
    async function fetchTab() {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (!tab || !tab.id || !tab.title || !tab.url) {
          throw new Error('Active tab information is incomplete');
        }

        setTabInfo({ tabUrl: tab.url, tabTitle: tab.title, tabId: tab.id });
      } catch (err: unknown) {
        setTabInfo({
          error:
            err instanceof Error ? err.message : 'An unexpected error occurred',
        });
      }
    }

    fetchTab();
  }, []);

  return tabInfo;
}

export default useCurrentTabInfo;
