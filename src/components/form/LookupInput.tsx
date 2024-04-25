import React, { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/16/solid';
import { LookupDataset, LookupInputProps } from '../../types/formTypes';
import BaseInput from './BaseInput';

function ComboInput({
  label,
  placeholder,
  required,
  disabled,
  onChange,
  rounded,
  dataset,
  multiple,
}: LookupInputProps): JSX.Element {
  const [multipleItems, setMultipleItems] = useState<LookupDataset[]>([]);
  const [selected, setSelected] = useState<LookupDataset | undefined>(
    undefined,
  );
  const [query, setQuery] = useState('');

  const internalIDs = label.toLowerCase().split(' ').join('_');
  const items = dataset;

  useEffect(() => {
    if (selected !== undefined) {
      onChange(internalIDs, selected);
    }
    if (multiple && selected !== undefined) {
      if (!multipleItems.some((item) => item.id === selected.id)) {
        const newItems = [...multipleItems, selected];
        setMultipleItems(newItems);
      }
      setSelected(undefined);
      setQuery('');
    }
  }, [selected]);

  useEffect(() => {
    if (multiple) {
      onChange(internalIDs, multipleItems);
    }
  }, [multipleItems]);

  const filteredResults = query === ''
    ? items
    : items.filter((result) => result.label
      .toLowerCase()
      .replace(/\s+/g, '')
      .includes(query.toLowerCase().replace(/\s+/g, '')));

  return (
    <BaseInput
      id={internalIDs}
      label={label}
      required={required}
      rounded={rounded}
    >
      {multiple && multipleItems.length > 0 && (
        <ul className="my-2 space-x-2 space-y-2">
          {multipleItems.map((item) => (
            <button
              disabled={disabled}
              key={item.id}
              onClick={() => setMultipleItems(multipleItems.filter((i) => i.id !== item.id))}
              type="button"
              className="inline-flex items-center rounded-md bg-rda-50 px-2 py-1 text-xs font-medium text-rda-500 ring-1 ring-inset ring-rda-500/10 hover:bg-rda-100 hover:text-rda-600 disabled:cursor-not-allowed disabled:bg-rda-50 disabled:hover:text-rda-500"
            >
              {item.label}
              {' '}
              X
            </button>
          ))}
        </ul>
      )}
      <Combobox value={selected} onChange={setSelected} disabled={disabled}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden text-left text-sm focus:outline-none">
            <Combobox.Input
              className="w-full border-none py-0 pl-0 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-200"
              displayValue={(result: LookupDataset) => result.label}
              onChange={(event) => setQuery(event.target.value)}
              id={internalIDs}
              placeholder={placeholder}
              required={required}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 -mr-2 flex items-center border-l p-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200">
              <ChevronDownIcon
                className="size-5 text-rda-500"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options
              as="ul"
              className="absolute z-10 mt-1 max-h-60 w-full divide-y divide-gray-300 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              {filteredResults.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-sm text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredResults.map((result: LookupDataset) => {
                  const alreadySelected = multiple
                    && multipleItems.some((item) => item.id === result.id);
                  return (
                    <Combobox.Option
                      key={result.id}
                      className={`group relative select-none px-3 py-2 text-sm text-gray-900 ${
                        alreadySelected
                          ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                          : 'cursor-default hover:cursor-pointer hover:bg-rda-500 hover:text-white'
                      }`}
                      as="li"
                      value={result}
                      disabled={alreadySelected}
                    >
                      <span className="block text-wrap font-medium">
                        {result.label}
                      </span>
                      {result.description && (
                        <span
                          className={`block text-wrap text-xs text-gray-500 ${
                            alreadySelected ? '' : 'group-hover:text-white'
                          }`}
                        >
                          {result.description}
                        </span>
                      )}
                      {result.id === selected?.id && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckIcon
                            className={`size-5 text-rda-500${
                              alreadySelected ? '' : 'group-hover:text-white'
                            }`}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </Combobox.Option>
                  );
                })
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </BaseInput>
  );
}

export default ComboInput;
