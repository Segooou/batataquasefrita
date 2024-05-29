/* eslint-disable @typescript-eslint/default-param-last */
import type { Dispatch, SetStateAction } from 'react';
import type { InputProps } from 'domain/models';

export interface validateFormProps {
  index?: number;
  focus?: boolean;
  setData: Dispatch<SetStateAction<InputProps[]>>;
  data: InputProps[];
}

export const validateForm = ({ data, setData, focus, index }: validateFormProps): boolean => {
  const errors: number[] = [];

  const newData = data.map((item, itemIndex) => {
    const value = { ...item };

    if ((index && index === itemIndex) || !index)
      if (item.isRequired && !item.value) {
        errors.push(item.id);
        value.error = true;
      } else value.error = false;

    return value;
  });

  setData(newData);

  if (errors.length > 0) {
    if (focus) document.getElementById(`input-data-${errors[0]}`)?.focus();

    return false;
  }

  return true;
};
