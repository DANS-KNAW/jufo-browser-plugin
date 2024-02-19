import React, { useEffect } from "react";
import TextInput from "../components/form/TextInput";

function Settings() {
  useEffect(() => {
    // chrome.storage.sync.set({ mirror: true }).then(() => {
    //   console.log("Value is set");
    // });

    // chrome.storage.sync.get(["mirror"]).then((result) => {
    //   console.log("Value is " + result.key);
    // });
  }, []);

  const [mirror, setMirror] = React.useState(false);
  const [customAPIkey, setCustomAPIkey] = React.useState(false);
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
              className="h-4 w-4 rounded border-gray-300 text-rda-500 focus:ring-rda-500"
              checked={mirror}
              onChange={() => setMirror(!mirror)}
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
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="custom-api-key"
              aria-describedby="custom-api-key-description"
              name="custom-api-key"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-rda-500 focus:ring-rda-500"
              onChange={() => setCustomAPIkey(!customAPIkey)}
              checked={customAPIkey}
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
        {customAPIkey && (
          <TextInput label="Hypthosis API KEY" onChange={() => {}} />
        )}
      </form>
    </>
  );
}

export default Settings;
