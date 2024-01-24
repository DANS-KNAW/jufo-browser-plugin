import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

function ComboBoxInput({
  label,
  data,
  placeholder,
  required,
  section,
}: Readonly<{
  label: string;
  data: any;
  placeholder?: string;
  required?: boolean;
  section?: "bottom" | "middle" | "top";
}>) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState<{ id: string; label: string }[]>([]);

  const internalIDs = label.toLowerCase().split(" ").join("_");

  const filteredItems =
    query === ""
      ? data
      : data.filter((item: any) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        );

  let rounded = "";
  switch (section) {
    case "bottom":
      rounded = "rounded-b-md";
      break;
    case "middle":
      break;
    case "top":
      rounded = "rounded-t-md";
      break;
    default:
      rounded = "rounded-md";
      break;
  }

  const clearHandle = () => {
    setQuery("");
    setSelectedItem(null);
  }

  return (
    <Combobox
      className={`${rounded} px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-rda-600 has-[:disabled]:bg-gray-200`}
      as="div"
      value={selectedItem}
      onChange={setSelectedItem}
    >
      <Combobox.Label
        htmlFor={internalIDs}
        className="block text-xs text-gray-900"
      >
        <span className="font-medium">{label}</span>
      </Combobox.Label>
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <span
            key={item.id}
            className="text-xs text-gray-900 p-1 bg-rda-100 rounded-md"
          >
            {item.label}
          </span>
        ))}
        <p>   {JSON.stringify(selectedItem, void 0, 2)}</p>
      <div className="relative">
        <Combobox.Input
          className="block w-full border-0 p-0 pr-10 text-[0.875rem] leading-6 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-200"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item: { id: number; label: string }) => item?.label}
          required={required}
          placeholder={placeholder}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md border-l pl-2 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-5 text-rda-400"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Combobox.Button>

        {filteredItems.length > 0 && (
          <Combobox.Options className="shadow-lgfocus:outline-none absolute z-10 mt-1 max-h-32 w-full overflow-auto rounded-md bg-white py-1 text-sm">
            {filteredItems.map((item: { id: string; label: string }) => (
              <Combobox.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-3 pr-9 ${
                    active ? "bg-rda-600 text-white" : "text-gray-900"
                  }`
                }
                onClick={() => {
                  setItems([...items, item]);
                  clearHandle();
                }}
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected && "font-semibold"
                      }`}
                    >
                      {item.label}
                    </span>

                    {selected && (
                      <span
                        className={`absolute inset-y-0 right-0 flex items-center pr-4${
                          active ? "text-white" : "text-rda-600"
                        }`}
                      >
                        <CheckIcon className="size-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

export default ComboBoxInput;
