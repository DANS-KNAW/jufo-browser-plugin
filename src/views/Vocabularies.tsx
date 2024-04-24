import React, { useContext } from 'react';
import WorkingGroupsIcon from '../svg/WorkingGroupsIcon';
import InterestGroupsIcon from '../svg/InterestGroupsIcon';
import PathwaysIcon from '../svg/PathwaysIcon';
import GORCElementsIcon from '../svg/GORCElementsIcon';
import GORCAttributesIcon from '../svg/GORCAttributesIcon';
import DomainIcon from '../svg/DomainIcon';
import { SettingsContext } from '../context/Settings';

function Vocabularies() {
  const { settings, setSettings } = useContext(SettingsContext);

  const vocabOptions = [
    {
      id: 'workingGroups',
      label: 'Working Groups',
      icon: WorkingGroupsIcon,
      active: settings.vocabularies.workingGroups,
    },
    {
      id: 'interestGroups',
      label: 'Interest Groups',
      icon: InterestGroupsIcon,
      active: settings.vocabularies.interestGroups,
    },
    {
      id: 'pathways',
      label: 'Pathways',
      icon: PathwaysIcon,
      active: settings.vocabularies.pathways,
    },
    {
      id: 'gorcElements',
      label: 'GORC Elements',
      icon: GORCElementsIcon,
      active: settings.vocabularies.gorcElements,
    },
    {
      id: 'gorcAttributes',
      label: 'GORC Attributes',
      icon: GORCAttributesIcon,
      active: settings.vocabularies.gorcAttributes,
    },
    {
      id: 'domain',
      label: 'Domain',
      icon: DomainIcon,
      active: settings.vocabularies.domain,
    },
  ];

  const Items = vocabOptions.map((item) => {
    const id = item.label.replace(/\s/g, '-').toLowerCase();

    const setVocab = (active: boolean) => {
      setSettings({
        ...settings,
        vocabularies: { ...settings.vocabularies, [item.id]: active },
      });
    };

    return (
      <div key={item.id} className="relative flex items-center px-4">
        <div className="min-w-0 flex-1 text-sm leading-6">
          <label
            htmlFor={id}
            className="flex select-none py-4 font-medium text-gray-900"
          >
            <item.icon />
            <span className="pl-2">{item.label}</span>
          </label>
        </div>
        <div className="ml-3 flex h-6 items-center">
          <input
            id={id}
            name={id}
            type="checkbox"
            className="size-4 rounded border-gray-300 text-rda-500 focus:ring-rda-500"
            checked={item.active}
            onChange={() => setVocab(!item.active)}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <h2 className="text-xl font-bold">Vocabularies</h2>
      <div className="mt-4 divide-y divide-gray-200 border-y border-gray-200">
        {Items}
      </div>
    </>
  );
}

export default Vocabularies;
