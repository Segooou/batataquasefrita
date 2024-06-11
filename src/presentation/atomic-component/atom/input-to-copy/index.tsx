import { Button } from '@mui/material';
import { type FC, useRef } from 'react';
import { LabelInput } from 'presentation/atomic-component/atom/label-input';
import { Link } from 'react-router-dom';
import { callToast } from 'main/utils';

interface InputToCopyProps {
  value: string;
  number?: number;
  label?: string;
  max?: number;
}

export const InputToCopy: FC<InputToCopyProps> = ({ value, label, max = 4, number = 30 }) => {
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

  const download = async (): Promise<void> => {
    try {
      const response = await fetch(value);
      const blob = await response.blob();

      const link = document.createElement('a');

      link.href = URL.createObjectURL(blob);
      link.download = 'image.jpeg';
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch {
      callToast.error('Erro ao baixar imagem');
    }
  };

  const getRows = (): number => {
    if (value?.endsWith('.jpeg')) return 5;
    return value?.length > number ? max : 1;
  };

  return (
    <>
      <LabelInput
        inputRef={inputRef}
        label={label}
        maxRows={getRows()}
        minRows={getRows()}
        textarea={value?.length > number}
        value={value}
      />

      <div className={'flex flex-col gap-3 justify-center items-center'}>
        <Button className={'w-full'} onClick={copyToClipboard}>
          Copiar
        </Button>

        {value?.endsWith('.jpeg') ? (
          <Button className={'w-full'} onClick={download}>
            Baixar
          </Button>
        ) : null}

        {value?.endsWith('.jpeg') ? (
          <Link rel={'noreferrer'} target={'_blank'} to={value}>
            <Button className={'w-full'}>Abrir</Button>
          </Link>
        ) : null}
      </div>
    </>
  );
};
