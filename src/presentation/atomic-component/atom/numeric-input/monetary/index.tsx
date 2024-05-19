/* eslint-disable react/boolean-prop-naming */
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';
import type { ChangeEvent, FC } from 'react';
import type { TextFieldProps } from '@mui/material';
import type { UseFormRegisterReturn } from 'react-hook-form';

type MonetaryInputProps = Pick<TextFieldProps, 'error' | 'onBlur' | 'onFocus'> & {
  onChange?: (event: { formattedValue: string; value: string; floatValue?: number }) => void;
  disableDecimal?: boolean;
  register?: UseFormRegisterReturn;
  value?: number | string | null;
};

export const MonetaryInput: FC<MonetaryInputProps> = ({ onChange, register, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    let newValue = event.target.value.replace(/\D/gu, '');

    if (newValue.length === 0) return;

    if (newValue.length <= 10) newValue = String(Number(newValue));

    if (onChange)
      onChange({
        floatValue: Number(`${newValue.slice(0, -2)}.${newValue.slice(-2)}`),
        formattedValue: `R$ ${newValue.slice(0, -2)},${newValue.slice(-2)}`,
        value: `R$ ${newValue.slice(0, -2)},${newValue.slice(-2)}`
      });
  };

  return (
    <NumericFormat
      {...props}
      {...register}
      customInput={TextField}
      decimalScale={props.disableDecimal ? 0 : 2}
      decimalSeparator={','}
      onChange={handleChange}
      onFocus={props.onFocus}
      prefix={'R$ '}
      thousandSeparator={'.'}
      value={props.value}
    />
  );
};
