/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-duplicate-props */
import { ErrorOutline, WarningOutlined } from '@mui/icons-material';
import { MaskInput } from 'presentation/atomic-component/atom/mask-input';
import { TextField } from '@mui/material';
import type { FC, FocusEventHandler, ReactNode } from 'react';
import type { InputBaseComponentProps, TextFieldProps } from '@mui/material';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface LabelInputProps
  extends Pick<
    TextFieldProps,
    | 'autoCapitalize'
    | 'InputProps'
    | 'inputRef'
    | 'maxRows'
    | 'minRows'
    | 'onKeyDown'
    | 'size'
    | 'sx'
  > {
  id?: string;
  register?: UseFormRegisterReturn;
  value?: string;
  type?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  uppercase?: boolean;
  defaultValue?: string;
  required?: boolean;
  label?: string;
  labelTop?: string;
  autoComplete?: string;
  textarea?: boolean;
  mask?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  children?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  EndIcon?: ReactNode;
  StartIcon?: ReactNode;
  onChange?: (e: { target: { value: string } }) => void;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onFocusOut?: () => void;
}

export const LabelInput: FC<LabelInputProps> = ({
  register,
  label,
  children,
  mask,
  autoComplete,
  required,
  labelTop,
  ...props
}) => {
  const getElement = (): ReactNode => {
    if (children) return children;

    const InputProps = {
      ...props.InputProps,
      autoComplete,
      endAdornment: props.EndIcon ? (
        props.EndIcon
      ) : props.error ? (
        <ErrorOutline color={'error'} />
      ) : null,
      startAdornment: props.StartIcon ? props.StartIcon : null
    };

    const labelElement = label ? (
      <span>
        {label}
        {required ? <span className={'text-[#ff4747]'}> *</span> : ''}
      </span>
    ) : undefined;

    const inputProps: InputBaseComponentProps = {
      autoCapitalize: props.autoCapitalize,
      style: {
        padding: '14px',
        textTransform: props.uppercase ? 'uppercase' : 'none'
      }
    };

    if (mask)
      return (
        <MaskInput
          {...props}
          InputProps={InputProps}
          error={props.error}
          inputProps={inputProps}
          label={labelElement}
          mask={mask}
          onBlur={props.onFocusOut}
          onFocus={props.onFocus}
          register={register}
        />
      );

    return (
      <TextField
        {...register}
        {...props}
        InputProps={InputProps}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        error={props.error}
        inputProps={inputProps}
        label={labelElement}
        multiline={props.textarea}
        onBlur={props.onFocusOut}
        onChange={props.onChange ? props.onChange : register?.onChange}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
      />
    );
  };

  return (
    <div className={'flex flex-col gap-1 w-full text-start'}>
      {labelTop ? (
        <span>
          {labelTop}
          {required ? <span className={'text-[#ff4747]'}> *</span> : ''}
        </span>
      ) : null}

      {getElement()}

      {props.error && props.errorMessage ? (
        <span className={'flex gap-1 mb-1 text-red'}>
          <WarningOutlined /> {props.errorMessage}
        </span>
      ) : null}
    </div>
  );
};
