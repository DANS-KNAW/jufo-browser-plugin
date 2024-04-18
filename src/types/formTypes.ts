/**
 * Common input properties for form inputs.
 */
type CommonInputProps = Readonly<{
  /**
   * Label for the input.
   */
  label: string;
  /**
   * Indicates if the input is required.
   */
  required?: boolean;
  /**
   * Indicates if the input is disabled.
   */
  disabled?: boolean;
  /**
   * Placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Callback function triggered when the input value changes.
   * @param name - The name of the input.
   * @param value - The new value of the input.
   */
  onChange: (name: string, value: any) => void;
  /**
   * Specifies the rounded corners of the input.
   * Possible values: "bottom", "middle", "top", "all".
   */
  rounded?: 'bottom' | 'middle' | 'top' | 'all';
}>;

export interface TextInputProps extends CommonInputProps {
  type?: 'text' | 'date';
  value?: string;
}

export interface TextAreaInputProps extends CommonInputProps {
  type: 'textarea';
  value?: string;
  rows?: number;
}

export type LookupDataset = Readonly<{
  id: string;
  label: string;
  value: string;
  url?: string;
  description?: string;
}>;

export interface LookupInputProps extends CommonInputProps {
  type: 'lookup';
  value?: string;
  dataset: LookupDataset[];
  multiple?: boolean;
}
