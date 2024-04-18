import React, { useEffect } from 'react';
import { TextAreaInputProps } from '../types/formTypes';

function AreaInput({
  type,
  label,
  placeholder,
  value,
  disabled,
  required,
  rounded,
  onChange,
}: Readonly<TextAreaInputProps>) {
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

  let section = '';
  switch (rounded) {
    case 'bottom':
      section = 'rounded-b-md';
      break;
    case 'middle':
      break;
    case 'top':
      section = 'rounded-t-md';
      break;
    default:
      section = 'rounded-md';
      break;
  }

  return (
    <div
      className={`${section} px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-rda-600 has-[:disabled]:bg-gray-200`}
    >
      <label htmlFor={internalIDs} className="block text-xs text-gray-900">
        <span className="font-medium">{label}</span>
        {required === true ?? <span className="text-red-400"> *</span>}
        <textarea
          rows={4}
          name={internalIDs}
          id={internalIDs}
          className="block w-full rounded-md border-0 p-0 text-sm leading-6 text-gray-900 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-200"
          defaultValue={value}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          onChange={handleChange}
          value={inputValue}
        />
      </label>
    </div>
  );
}
export default AreaInput;
