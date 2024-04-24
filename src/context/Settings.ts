import React from 'react';

export interface SettingsDto {
  mirrorHypothesis: boolean;
  useCustomHypothesisKey: boolean;
  customHypothesisKey: string;
  vocabularies: {
    workingGroups: boolean;
    interestGroups: boolean;
    pathways: boolean;
    gorcElements: boolean;
    gorcAttributes: boolean;
    domain: boolean;
  };
}
export interface SettingsContextDto {
  settings: SettingsDto;
  setSettings: React.Dispatch<React.SetStateAction<SettingsDto>>;
}
const defaultSettingsContext: SettingsContextDto = {
  settings: {
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
  },
  setSettings: () => {},
};

export const SettingsContext = React.createContext<SettingsContextDto>(
  defaultSettingsContext,
);
