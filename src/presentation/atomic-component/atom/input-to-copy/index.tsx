import { Button } from '@mui/material';
import { type FC, useRef } from 'react';
import { LabelInput } from 'presentation/atomic-component/atom/label-input';
import { callToast } from 'main/utils';

interface InputToCopyProps {
  value: string;
  number?: number;
  max?: number;
}

export const InputToCopy: FC<InputToCopyProps> = ({ value, max = 4, number = 30 }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const copyToClipboard = (): void => {
    try {
      inputRef?.current?.select();
      document.execCommand('copy');
      callToast.success('Copiado!');
    } catch {
      callToast.error('Erro ao copiar.');
    }
  };

  return (
    <>
      <LabelInput
        inputRef={inputRef}
        maxRows={value?.length > number ? max : 1}
        minRows={value?.length > number ? max : 1}
        textarea={value?.length > number}
        value={value}
      />

      <div className={'flex items-center'}>
        <Button onClick={copyToClipboard}>Copiar</Button>
      </div>
    </>
  );
};
