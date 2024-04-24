chrome.runtime.onStartup.addListener(async () => {
  let storage = await chrome.storage.sync.get('settings');

  if (!('settings' in storage)) {
    const settings = {
      mirrorHypothesis: true,
      useCustomHypothesisKey: true,
      customHypothesisKey: '',
      vocabularies: {
        workingGroups: true,
        interestGroups: true,
        pathways: true,
        gorcElements: true,
        gorcAttributes: true,
        domain: true,
      },
    };
    chrome.storage.sync.set({ settings });
  }

  storage = await chrome.storage.sync.get('settings');
});
