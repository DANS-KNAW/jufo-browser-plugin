import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import TabView from "./components/TabView";
import useFetchTab from "./hooks/useCurrentTabInfo";
import useGrabAnnotation from "./hooks/useAnnotation";
import Annotation from "./views/Annotation";
import Vocabularies from "./views/Vocabularies";
import { NavigationContext } from "./context/Navigation";
import Settings from "./views/Settings";

function App() {
  const tab = useFetchTab();
  const annotation = useGrabAnnotation(tab.tabId);
  const [activeTab, setActiveTab] = React.useState("Annotation");

  const [tabs, setTabs] = React.useState([
    { label: "Annotation", active: true },
    { label: "Vocabularies", active: false },
    { label: "Settings", active: false },
  ]);

  const setActiveTabs = (label: string) => {
    const newTabs = tabs.map((tab) => {
      tab.active = tab.label === label;
      return tab;
    });
    setTabs(newTabs);
    setActiveTab(label);
  };

  if (!tab || !tab.tabId || !tab.tabUrl) {
    return (
      <main className="flex h-screen w-full flex-col">
        <TabView>
          <div className="h-full w-full flex justify-center items-center">
            <p className="text-xl text-center font-bold">
              Collecting Resource Info...
            </p>
          </div>
        </TabView>
      </main>
    );
  }

  // if (!annotation) {
  //   return (
  //     <NavigationContext.Provider value={{ tabs, setActiveTabs, getActiveTab }}>
  //       <main className="flex w-full flex-col">
  //         <TabView></TabView>
  //       </main>
  //     </NavigationContext.Provider>
  //   );
  // }

  return (
    <NavigationContext.Provider value={{ tabs, setActiveTabs, currentTab: activeTab }}>
      <main className="flex h-screen w-full flex-col">
        <TabView>
          {activeTab === "Annotation" && !annotation && (
            <div className="bg-white px-4 pb-4 pt-5 text-left w-full mt-8 p-6 border border-red-400 rounded-lg">
              <div className="flex items-start">
                <div className="flex flex-shrink-0 items-center justify-center rounded-full bg-red-100 mx-0 h-10 w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="ml-4 mt-0 text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    No Annotation Found!
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <strong>Before</strong> filling out the form, please make
                      a selection on the web resource you wish to annotate. If
                      you have already made a selection and are still getting
                      this message, please refresh the page and try again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Annotation" && annotation && (
            <Annotation tabUrl={tab.tabUrl} annotation={annotation} />
          )}
          {activeTab === "Vocabularies" && <Vocabularies />}
          {activeTab === "Settings" && <Settings />}
        </TabView>
      </main>
    </NavigationContext.Provider>
  );
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
