import React, { useEffect } from "react";
import { LookupDataset, LookupInputProps } from "../../types/formTypes";
import BaseInput from "./BaseInput";

/**
 * A text input component.
 *
 * @component
 * @example
 * ```tsx
 * <TextInput
 *   type="text"
 *   label="Username"
 *   value={username}
 *   placeholder="Enter your username"
 *   required={true}
 *   disabled={false}
 *   onChange={(id, value) => setUsername(value)}
 *   rounded="top"
 * />
 * ```
 *
 * @param {TextInputProps} props - The input component props.
 * @param {string} props.type - The type of the input element. Defaults to "text".
 * @param {string} props.label - The label for the input element.
 * @param {string} props.value - The value of the input element.
 * @param {string} props.placeholder - The placeholder text for the input element.
 * @param {boolean} props.required - Indicates whether the input is required.
 * @param {boolean} props.disabled - Indicates whether the input is disabled.
 * @param {Function} props.onChange - The callback function triggered when the input value changes.
 * @param {boolean} props.rounded - Indicates whether the input has rounded corners.
 * @returns {JSX.Element} The text input component.
 */
function LookupInput({
  type = "lookup",
  label,
  value,
  placeholder,
  required,
  disabled,
  onChange,
  rounded,
  dataset,
  multiple,
}: LookupInputProps): JSX.Element {
  const [inputValue, setValue] = React.useState(value ?? "");

  // State to check if input has been touched
  const [touched, setTouched] = React.useState(false);

  const [selectedItem, setSelectedItem] = React.useState<
    LookupDataset | undefined
  >({
    id: "",
    label: "",
    value: "",
  });
  const [selectedItems, setSelectedItems] = React.useState<LookupDataset[]>([]);

  const [isListVisible, setListVisible] = React.useState(false);
  const [filteredItems, setFilteredItems] =
    React.useState<LookupDataset[]>(dataset);

  const handleQueryChange = (query: string) => {
    // Check if query is empty
    if (query === "") {
      // If query is empty, set filteredItems to all items
      setFilteredItems(dataset);
    } else {
      // If query is not empty, filter items by label
      setFilteredItems(
        dataset.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const internalIDs = label.toLowerCase().split(" ").join("_");

  // Triggering useEffect hook on mount once to populate initial empty onChange callback.
  useEffect(() => {
    if (value !== undefined) {
      onChange(internalIDs, value);
    }
  }, []);

  const toggleListVisibility = () => {
    setListVisible(!isListVisible);
  };

  const handleFocus = () => {
    setListVisible(true);
    setTouched(true);
  };

  const handleBlur = () => {
    // Delay hiding the list to allow for list item interaction
    setTimeout(() => {
      setListVisible(false);
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!multiple) {
      setSelectedItem(undefined);
      onChange(internalIDs, undefined);
    } else {
      setListVisible(true);
    }
    setValue(e.target.value);
    handleQueryChange(e.target.value);
  };

  const isValid = touched
    ? multiple
      ? selectedItems.length < 1
      : !selectedItem
    : false;

  return (
    <BaseInput
      id={internalIDs}
      label={label}
      required={required}
      rounded={rounded}
      error={isValid}
    >
      {multiple && selectedItems.length > 0 && (
        <ul className="mt-2 space-x-2 space-y-2">
          {selectedItems.map((item) => (
            <button
              disabled={disabled}
              key={item.id}
              onClick={() => {
                setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
                onChange(internalIDs, selectedItems);
              }}
              type="button"
              className="inline-flex items-center rounded-md bg-rda-50 px-2 py-1 text-xs font-medium text-rda-500 ring-1 ring-inset ring-rda-500/10 hover:bg-rda-100 hover:text-rda-600 disabled:hover:text-rda-500 disabled:cursor-not-allowed disabled:bg-rda-50"
            >
              {item.label} X
            </button>
          ))}
        </ul>
      )}
      <div className="relative">
        <input
          type="text"
          name={internalIDs}
          id={internalIDs}
          className="block w-full border-0 p-0 text-[0.875rem] leading-6 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-200 pr-10"
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={inputValue}
        />

        <button
          type="button"
          disabled={disabled}
          onClick={toggleListVisibility}
          onFocus={() => setTouched(true)}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md border-l pl-2 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className={`size-5 ${isValid ? "text-red-400" : "text-rda-500"}`}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isListVisible && filteredItems.length > 0 && (
          <ul className="shadow-lg divide-y divide-gray-300 focus:outline-none absolute z-10 mt-1 max-h-32 w-full overflow-auto rounded-md bg-white py-1 text-sm">
            {filteredItems.map((item, i) => (
              <li
                key={i}
                className="relative cursor-default select-none py-2 px-3 hover:bg-rda-500 hover:text-white hover:cursor-pointer group"
                onClick={() => {
                  if (
                    !selectedItems.some((i) => i.id === item.id) &&
                    multiple
                  ) {
                    setSelectedItems([...selectedItems, item]);
                    onChange(internalIDs, selectedItems);
                    handleQueryChange("");
                    setValue("");
                  }

                  setListVisible(false);

                  if (!multiple) {
                    setValue(item.label);
                    setSelectedItem(item);
                    handleQueryChange(item.label);
                    onChange(internalIDs, item);
                  }
                }}
              >
                <span className="text-gray-900 group-hover:text-white font-medium">{item.label}</span>
                {item.description && <p className="text-gray-500 text-xs group-hover:text-white">{item.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </BaseInput>
  );
}

export default LookupInput;
