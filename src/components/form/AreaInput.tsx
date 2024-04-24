import React, { useEffect } from 'react';
import { TextAreaInputProps } from '../../types/formTypes';
import BaseInput from './BaseInput';

/**
 * A textarea input component.
 *
 * @component
 * @example
 * ```tsx
 * <AreaInput
 *   type="textarea"
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
 * @param {TextAreaInputProps} props - The textarea component props.
 * @param {string} props.type - The type of the textarea element. Defaults to "text".
 * @param {string} props.label - The label for the textarea element.
 * @param {string} props.value - The value of the textarea element.
 * @param {string} props.placeholder - The placeholder text for the textarea element.
 * @param {boolean} props.required - Indicates whether the textarea is required.
 * @param {boolean} props.disabled - Indicates whether the textarea is disabled.
 * @param {Function} props.onChange - The callback function triggered on textarea change.
 * @param {boolean} props.rounded - Indicates whether the textarea has rounded corners.
 * @param {number} props.rows - The number of rows for the textarea element.
 * @returns {JSX.Element} The text textarea component.
 */
function AreaInput({
  label,
  value,
  placeholder,
  required,
  disabled,
  onChange,
  rounded,
  rows = 4,
}: TextAreaInputProps): JSX.Element {
  const [inputValue, setValue] = React.useState(value ?? '');
  const internalIDs = label.toLowerCase().split(' ').join('_');

  // Triggering useEffect hook on mount once to populate initial empty onChange callback.
  useEffect(() => {
    if (value !== undefined) {
      onChange(internalIDs, value);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        name={internalIDs}
        id={internalIDs}
        className="block w-full border-0 p-0 text-[0.875rem] leading-6 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-200"
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        defaultValue={inputValue}
        rows={rows}
      />
    </BaseInput>
  );
}

export default AreaInput;
