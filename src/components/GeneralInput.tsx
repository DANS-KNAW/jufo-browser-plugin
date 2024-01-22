import React from 'react';

function GeneralInput({
  label,
  placeholder,
  value,
  disabled,
}: Readonly<{
  label: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}>) {
  return (
    <div
      className={`rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-rda-600 ${
        disabled ? 'cursor-not-allowed bg-gray-100' : ''
      }`}
    >
      <label htmlFor="name" className="block text-xs text-gray-900">
        <span className={`font-medium ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}>{label}</span>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full border-0 p-0 text-[0.875rem] leading-6 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-100"
          placeholder={placeholder}
          value={value}
          disabled={disabled}
        />
      </label>
    </div>
  );
}
export default GeneralInput;
