chrome.runtime.onStartup.addListener(async () => {
  let storage = await chrome.storage.sync.get("settings");

  if (!("settings" in storage)) {
    const settings = {
      mirrorHypothesis: true,
      useCustomHypothesisKey: true,
      customHypothesisKey: "",
      vocabularies: {
        workingGroups: true,
        interestGroups: true,
        pathways: true,
        gorcElements: true,
        gorcAttributes: true,
        domain: true,
      },
    };
    chrome.storage.sync.set({ settings }, () => console.log("Settings saved!"));
  }

  storage = await chrome.storage.sync.get("settings");
  console.log(storage);
});