export interface InputProps {
  id: number;
  value?: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  formValue: string;
  error: boolean;
  type: string;
  mask: string | null;
  maskLength: number | null;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
