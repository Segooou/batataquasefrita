import { type ChangeEventHandler, type FC, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useIMask } from 'react-imask';
import type { TextFieldProps } from '@mui/material';
import type { UseFormRegisterReturn } from 'react-hook-form';

type MaskInputProps = TextFieldProps & {
  mask: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  register?: UseFormRegisterReturn;
};

export const MaskInput: FC<MaskInputProps> = ({ mask, register, value, ...props }) => {
  const maskRef = useIMask({
    mask
  });

  useEffect(() => {
    maskRef.setValue(value ?? '');
  }, [value]);

  return (
    <TextField
      {...props}
      {...register}
      inputRef={maskRef.ref}
      onBlur={(event): void => {
        if (props.onBlur) props.onBlur(event);
        if (register?.onBlur) register.onBlur(event);
      }}
      onFocus={props.onFocus}
      ref={register?.ref}
      type={'tel'}
    />
  );
};
