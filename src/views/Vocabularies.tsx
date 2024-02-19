import React from "react";
import WorkingGroupsIcon from "../svg/WorkingGroupsIcon";
import InterestGroupsIcon from "../svg/InterestGroupsIcon";
import PathwaysIcon from "../svg/PathwaysIcon";
import GORCElementsIcon from "../svg/GORCElementsIcon";
import GORCAttributesIcon from "../svg/GORCAttributesIcon";
import DomainIcon from "../svg/DomainIcon";

function Vocabularies() {
  const vocabOptions = [
    { label: "Working Groups", icon: WorkingGroupsIcon },
    { label: "Interest Groups", icon: InterestGroupsIcon },
    { label: "Pathways", icon: PathwaysIcon },
    { label: "GORC Elements", icon: GORCElementsIcon },
    { label: "GORC Attributes", icon: GORCAttributesIcon },
    { label: "Domain", icon: DomainIcon },
  ];

  const Items = vocabOptions.map((item, index) => {
    const id = item.label.replace(/\s/g, "-").toLowerCase();
    return (
      <div key={index} className="relative flex items-center px-4">
        <div className="min-w-0 flex-1 text-sm leading-6">
          <label
            htmlFor={id}
            className="select-none font-medium text-gray-900 flex py-4"
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
            className="h-4 w-4 rounded border-gray-300 text-rda-500 focus:ring-rda-500"
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <h2 className="text-xl font-bold">Vocabularies</h2>
      <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
        {Items}
      </div>
    </>
  );
}

export default Vocabularies;
