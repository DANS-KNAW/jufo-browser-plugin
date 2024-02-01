import React, { useEffect } from "react";
import { TextInputProps } from "../../types/formTypes";
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
function TextInput({
  type = "text",
  label,
  value,
  placeholder,
  required,
  disabled,
  onChange,
  rounded,
}: TextInputProps): JSX.Element {
  const [inputValue, setValue] = React.useState(value ?? "");
  const internalIDs = label.toLowerCase().split(" ").join("_");

  // Triggering useEffect hook on mount once to populate initial empty onChange callback.
  useEffect(() => {
    if (value !== undefined) {
      onChange(internalIDs, value);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(internalIDs, e.target.value);
    setValue(e.target.value);
  };

  return (
    <BaseInput
      id={internalIDs}
      label={label}
      required={required}
      rounded={rounded}
    >
      <input
        type={type}
        name={internalIDs}
        id={internalIDs}
        className="block w-full border-0 p-0 text-[0.875rem] leading-6 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-200"
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        value={inputValue}
      />
    </BaseInput>
  );
}

export default TextInput;
