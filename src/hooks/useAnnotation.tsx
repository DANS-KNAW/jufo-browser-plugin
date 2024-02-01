import { useEffect, useState } from "react";

/**
 * Custom hook to get the selected text as an annotation.
 * @returns The selected text as an annotation.
 */
const useGrabAnnotation = (tabId: number | undefined): string => {
  const [annotation, setAnnotation] = useState<string>("");

  useEffect(() => {
    if (!tabId) return;

    chrome.scripting.executeScript(
      {
        target: { tabId },
        func: () => {
          const getSelectionText = () => {
            const selection = window.getSelection();
            return selection ? selection.toString() : "";
          };

          return getSelectionText();
        },
      },
      async (results) => {
        if (!results || results.length === 0) {
          console.error("No results from executeScript!");
          return;
        }
        setAnnotation(results[0].result);
      }
    );
  }, [tabId]);

  return annotation;
};

export default useGrabAnnotation;
