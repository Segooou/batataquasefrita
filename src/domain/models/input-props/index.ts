export interface InputProps {
  id: number;
  colSpan?: boolean;
  uppercase?: boolean;
  value?: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  formValue: string;
  error: boolean;
  type: string;
  mask: string | null;
  maskLength: number | null;
  finishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
