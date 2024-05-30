import { type FC, useEffect } from 'react';
import { FormButton, IconRender, LabelInput } from 'presentation/atomic-component/atom';
import { Link } from 'react-router-dom';
import { usePlatform } from 'data/use-case';
import { validate } from 'main/utils';
import type { Platform } from 'domain/models';

interface PlatformFormProps {
  platform?: Platform;
  closeModal: () => void;
}

export const PlatformForm: FC<PlatformFormProps> = ({ closeModal, platform }) => {
  const { handleSubmit, onSubmit, register, errors, isSubmitting, setValue, getValues } =
    usePlatform({
      closeModal,
      platform
    });

  useEffect(() => {
    if (platform) {
      setValue('image', platform.image, validate);
      setValue('name', platform.name, validate);
    }
  }, [platform]);

  return (
    <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
      <LabelInput
        error={!!errors.name}
        label={'Nome da plataforma'}
        placeholder={'Digite o nome da plataforma'}
        register={register('name')}
        required
      />

      <LabelInput
        error={!!errors.image}
        label={'Ícone'}
        onChange={(event): void => setValue('image', event.target.value, { shouldValidate: true })}
        placeholder={'Coloque um ícone'}
        register={register('image')}
        required
      />

      <div className={'flex flex-col gap-4 text-white'}>
        {getValues('image') ? (
          <span className={'flex gap-2'}>
            <span>Ícone Selecionado: </span>

            <span>
              <IconRender name={getValues('image')} />
            </span>
          </span>
        ) : null}

        <div className={'flex justify-between'}>
          <span>
            Exemplo:{' '}
            <span className={'font-semibold underline underline-offset-2'}>AccessibleForward</span>
          </span>

          <Link
            className={'text-blue-semiLight font-semibold underline underline-offset-2'}
            target={'_blank'}
            to={'https://mui.com/material-ui/material-icons/'}
          >
            Site de ícones
          </Link>
        </div>
      </div>

      <FormButton disableRipple isSubmitting={isSubmitting} label={'Enviar'} />
    </form>
  );
};
