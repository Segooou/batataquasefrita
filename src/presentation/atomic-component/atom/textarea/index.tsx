import { TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import type { TextFieldProps } from '@mui/material';
import type { UseFormRegisterReturn } from 'react-hook-form';

type TextareaProps = TextFieldProps & {
  maxLength?: number;
  rows?: number;
  register?: UseFormRegisterReturn;
};

export const Textarea: FC<TextareaProps> = ({ maxLength, rows, register, ...props }) => {
  const [inputLength, setInputLength] = useState<number>();
  const ref = useRef(null);

  useEffect(() => {
    const { value } = ref.current as unknown as { value: string };

    setInputLength(value?.length);
  }, [ref]);

  return (
    <div className={'flex flex-col w-full'}>
      <TextField
        inputProps={{
          maxLength,
          ref
        }}
        maxRows={rows}
        minRows={rows}
        multiline
        onKeyUp={(event): void => {
          const { value } = event.target as unknown as { value: string };

          setInputLength(value?.length);
        }}
        {...props}
        {...register}
      />

      {maxLength ? (
        <span className={'mt-[-19px] mr-[10px] text-[12px] ml-auto z-10'}>
          {inputLength}/{maxLength}
        </span>
      ) : null}
    </div>
  );
};

Textarea.defaultProps = {
  rows: 3
};
