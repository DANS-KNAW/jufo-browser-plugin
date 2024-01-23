import React from "react";

function GeneralInput({
  type = "text",
  label,
  placeholder,
  value,
  disabled,
  required,
  section,
}: Readonly<{
  type?: "text" | "date" | "select";
  label: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  section?: "bottom" | "middle" | "top";
}>) {
  const internalIDs = label.toLowerCase().split(" ").join("_");

  let typeInput = type;
  switch (typeInput) {
    case "select":
      typeInput = "text";
      break;
    default:
      typeInput = "text";
      break;
  }

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

  return (
    <div
      className={`${rounded} px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-rda-600 has-[:disabled]:bg-gray-200`}
    >
      <label htmlFor={internalIDs} className="block text-xs text-gray-900">
        <span className="font-medium">{label}</span>
        {required === true ?? <span className="text-red-400"> *</span>}
        <div className="flex items-center">
          <input
            type={typeInput}
            name={internalIDs}
            id={internalIDs}
            className="block w-full border-0 p-0 text-[0.875rem] leading-6 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-200"
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            required={required}
          />
          {type === "select" && (
            <button className="px-3 -mr-3 cursor-pointer" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </label>
    </div>
  );
}
export default GeneralInput;
