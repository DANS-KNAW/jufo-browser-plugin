import { useState, useEffect } from 'react';

interface ChromeStorageState<T> {
  loading: boolean;
  error: Error | null;
  value: T | null;
}

function useChromeStorage<T>(
  key: string,
  defaultValue: T | null = null,
): ChromeStorageState<T> {
  const [data, setData] = useState<ChromeStorageState<T>>({
    loading: true,
    error: null,
    value: defaultValue,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const dataFetch = await new Promise<T>((resolve, reject) => {
          chrome.storage.sync.get([key], (result) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(result[key] ?? defaultValue);
            }
          });
        });
        setData({ loading: false, error: null, value: dataFetch });
      } catch (error: any) {
        setData({ loading: false, error, value: defaultValue });
      }
    }

    fetchData();
  }, [key, defaultValue]);

  return data;
}

export default useChromeStorage;
