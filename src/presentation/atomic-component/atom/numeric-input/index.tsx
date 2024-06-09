/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react-hooks/rules-of-hooks */
import { MonetaryInput } from './monetary';
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';
import type { FC } from 'react';
import type { TextFieldProps } from '@mui/material';
import type { UseFormRegisterReturn } from 'react-hook-form';

type NumericInputProps = Pick<
  TextFieldProps,
  'error' | 'label' | 'onBlur' | 'onFocus' | 'placeholder' | 'required'
> & {
  type?: 'monetary' | 'percentage' | 'time';
  register?: UseFormRegisterReturn;
  disableDecimal?: boolean;
  onChange?: (event: { formattedValue: string; value: string; floatValue?: number }) => void;
  suffix?: string;
  prefix?: string;
  value?: number | string | null;
};

export const NumericInput: FC<NumericInputProps> = ({ type, register, onChange, ...props }) => {
  if (type === 'monetary')
    return <MonetaryInput {...props} onChange={onChange} register={register} />;

  const getSuffix = (): string | undefined => {
    if (type === 'percentage') return ' %';
    if (type === 'time') return ' horas';
    return ` ${props.suffix ?? ''}`;
  };

  return (
    <NumericFormat
      {...props}
      {...register}
      customInput={TextField}
      decimalScale={props.disableDecimal ? 0 : 2}
      decimalSeparator={','}
      inputRef={register?.ref}
      onFocus={props.onFocus}
      onValueChange={onChange}
      suffix={getSuffix()}
      type={'tel'}
      value={props.value}
    />
  );
};
