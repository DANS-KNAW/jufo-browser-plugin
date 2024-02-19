import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import TabView from "./components/TabView";
import useFetchTab from "./hooks/useCurrentTabInfo";
import useGrabAnnotation from "./hooks/useAnnotation";
import TextInput from "./components/form/TextInput";
import AreaInput from "./components/form/AreaInput";
import LookupInput from "./components/form/LookupInput";
import { domains, gorc, interestgroups, language, pathways } from "./data/data";

function App() {
  const tab = useFetchTab();
  const annotation = useGrabAnnotation(tab.tabId);
  const [formData, setFormData] = useState<{ [key: string]: any }>();
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!tab || !tab.tabId) {
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

  if (!annotation) {
    return (
      <main className="flex w-full flex-col">
        <TabView>
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
                    <strong>Before</strong> filling out the form, please make a
                    selection on the web resource you wish to annotate. If you
                    have already made a selection and are still getting this
                    message, please refresh the page and try again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabView>
      </main>
    );
  }

  const currentDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const response = await fetch("https://api.hypothes.is/api/annotations", {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.hypothesis.v1+json",
        Authorization: `Bearer ${formData!.hypothesis_api_key}`,
      },
      body: JSON.stringify({
        uri: tab.tabUrl,
        document: {
          title: formData?.title,
        },
        text: formData?.annotation,
      }),
    });
    console.log(response);
  };

  return (
    <main className="flex h-screen w-full flex-col">
      <TabView>
        <h2 className="pr-4 text-xl font-bold">Resource Metadata</h2>
        <form className="my-4 space-y-4 pr-[1px]" onSubmit={handleSubmit}>
          <TextInput
            type="text"
            label="Hypothesis API KEY"
            onChange={handleChange}
            required
            disabled={submitting}
          />
          <AreaInput
            type="textarea"
            label="Annotation"
            value={annotation}
            onChange={handleChange}
            required
            disabled
            rows={6}
          />

          <h3 className="text-base font-bold">Citation</h3>
          <div className="-space-y-px">
            <TextInput
              type="text"
              label="Title"
              onChange={handleChange}
              required
              rounded="top"
              disabled={submitting}
            />
            <AreaInput
              type="textarea"
              label="Description"
              onChange={handleChange}
              rounded="bottom"
              disabled={submitting}
            />
          </div>

          <h3 className="text-base font-bold">Administrative</h3>
          <div className="-space-y-px">
            <LookupInput
              type="lookup"
              label="Language"
              onChange={handleChange}
              required
              rounded="top"
              dataset={language.map((l, i) => ({
                id: `${i}`,
                label: l.label,
                value: l.value,
              }))}
              disabled={submitting}
            />
            <TextInput
              type="text"
              label="Resource"
              value={tab.tabUrl}
              onChange={handleChange}
              required
              disabled
              rounded="middle"
            />
            <TextInput
              type="date"
              label="Created At"
              value={currentDate}
              onChange={handleChange}
              required
              disabled
              rounded="bottom"
            />
          </div>

          <h3 className="text-base font-bold">Coverage</h3>
          <div className="-space-y-px">
            <LookupInput
              type="lookup"
              label="Pathways"
              onChange={handleChange}
              rounded="top"
              dataset={pathways.map((p) => ({
                id: p.id,
                label: p.title,
                value: p.id,
              }))}
              multiple
              disabled={submitting}
            />
            <LookupInput
              type="lookup"
              label="GORC"
              onChange={handleChange}
              rounded="middle"
              dataset={gorc.map((g) => ({
                id: g.id,
                label: g.title,
                value: g.id,
              }))}
              multiple
              disabled={submitting}
            />
            <LookupInput
              type="lookup"
              label="Origin"
              onChange={handleChange}
              rounded="middle"
              dataset={interestgroups.map((ig) => ({
                id: ig.id,
                label: ig.title,
                value: ig.id,
              }))}
              multiple
              disabled={submitting}
            />
            <LookupInput
              type="lookup"
              label="Domain"
              onChange={handleChange}
              rounded="bottom"
              dataset={domains.map((d) => ({
                id: d.id,
                label: d.title,
                value: d.id,
              }))}
              multiple
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-rda-500 text-white font-bold px-4 py-2 rounded-md w-full hover:bg-rda-400 disabled:hover:bg-rda-500 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submited" : "Submit"}
          </button>
        </form>
      </TabView>
    </main>
  );
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
