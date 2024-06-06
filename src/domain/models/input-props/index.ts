export enum InputType {
  text = 'text',
  email = 'email',
  number = 'number',
  url = 'url'
}

export interface InputProps {
  id: number;
  colSpan?: boolean;
  uppercase?: boolean;
  value?: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  formValue: string;
  options?: { id: string; name: string }[];
  error: boolean;
  type: InputType;
  mask: string | null;
  maskLength: number | null;
  finishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
