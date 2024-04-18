import React from 'react';

function BaseInput({
  id,
  label,
  required,
  rounded = 'all',
  error,
  children,
}: Readonly<{
  id: string;
  label: string;
  required?: boolean;
  rounded?: 'bottom' | 'middle' | 'top' | 'all';
  error?: boolean;
  children: React.ReactNode;
}>) {
  const roundedType = {
    bottom: 'rounded-b-md',
    middle: '',
    top: 'rounded-t-md',
    all: 'rounded-md',
  }[rounded];

  return (
    <div
      className={`px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 ${roundedType} ${error ? 'border border-red-400 focus-within:ring-red-400' : 'focus-within:ring-rda-600'} has-[:disabled]:bg-gray-200`}
    >
      <label htmlFor={id} className="block text-xs text-gray-900">
        <span className={`font-medium ${error ? 'text-red-600' : ''}`}>
          {label}
        </span>
        {required === true && <span className="text-red-400"> *</span>}
        {children}
      </label>
    </div>
  );
}

export default BaseInput;
