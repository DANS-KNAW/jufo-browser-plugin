import React from 'react';

function AreaInput({
  label,
  placeholder,
  value,
  disabled,
  required,
  section,
}: Readonly<{
  label: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  section?: 'bottom' | 'middle' | 'top';
}>) {
  const internalIDs = label.toLowerCase().split(' ').join('_');

  let rounded = '';
  switch (section) {
    case 'bottom':
      rounded = 'rounded-b-md';
      break;
    case 'middle':
      break;
    case 'top':
      rounded = 'rounded-t-md';
      break;
    default:
      rounded = 'rounded-md';
      break;
  }

  return (
    <div
      className={`${rounded} px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-rda-600 has-[:disabled]:bg-gray-200`}
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
        />
      </label>
    </div>
  );
}
export default AreaInput;
