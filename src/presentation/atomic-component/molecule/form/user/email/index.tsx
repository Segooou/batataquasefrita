import { Button, TextField } from '@mui/material';
import { type FC, useRef, useState } from 'react';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { callToast } from 'main/utils';
import { useSendEmail } from 'data/use-case';

export const SendEmailForm: FC = () => {
  const [error, setError] = useState(false);
  const [valueI, setValueI] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { handleSubmit, onSubmit, register, errors, isSubmitting, setValue } = useSendEmail({
    setError,
    setValueI
  });

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
    <div className={'flex flex-col gap-8 max-w-[450px] w-full laptop:min-w-[450px] mx-auto'}>
      <div className={'text-white font-bold text-2xl'}>Puxar Link Stake</div>

      <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
        <LabelInput
          error={!!errors.email}
          id={'aaaa'}
          label={'E-mail'}
          placeholder={'Digite o e-mail'}
          register={register('email')}
          type={'email'}
        />

        <LabelInput
          error={!!errors.password}
          label={'Senha'}
          placeholder={'Digite a senha'}
          register={register('password')}
        />

        <FormButton isSubmitting={isSubmitting} label={'Enviar'} />
      </form>

      {valueI ? (
        <div className={'flex w-full flex-col gap-6'}>
          {error ? (
            <span className={'text-red'}>{valueI}</span>
          ) : (
            <div className={'flex w-full justify-between'}>
              <TextField id={'input'} inputRef={inputRef} value={valueI} />

              <Button
                onClick={(): void => {
                  copyToClipboard();
                }}
              >
                Copiar texto
              </Button>
            </div>
          )}

          <div className={'flex w-full flex-col'}>
            <Button
              color={'secondary'}
              onClick={(): void => {
                setValue('email', '', { shouldValidate: true });
                setValue('password', '', { shouldValidate: true });
                setValueI('');
                setError(false);
                document.getElementById('aaaa')?.focus();
              }}
            >
              Resetar
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
