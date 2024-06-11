/* eslint-disable no-nested-ternary */
import { Checkbox, FormControlLabel } from '@mui/material';
import { type FC, useEffect, useState } from 'react';
import {
  FormButton,
  LabelInput,
  ListInput,
  ListListInput
} from 'presentation/atomic-component/atom';
import { ImageFunctionalityForm } from 'presentation/atomic-component/molecule/image-functionality-form';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { listToSelect, validate } from 'main/utils';
import { useDefaultFunctionality } from 'data/use-case';
import { useFindPlatformQuery } from 'infra/cache';
import type { Functionality } from 'domain/models';

interface DefaultFunctionalityFormProps {
  functionality?: Functionality;
  closeModal?: () => void;
  isModal?: boolean;
}

export const DefaultFunctionalityForm: FC<DefaultFunctionalityFormProps> = ({
  closeModal,
  functionality,
  isModal
}) => {
  const isImage = functionality?.apiRoute.startsWith('/image/');

  const [platformSelected, setPlatformSelected] = useState<SelectValues | null>(null);

  const { handleSubmit, onSubmit, register, errors, isSubmitting, getValues, setValue } =
    useDefaultFunctionality({
      closeModal,
      functionality
    });

  const platformQuery = useFindPlatformQuery({
    params: {
      all: true
    }
  });

  useEffect(() => {
    if (functionality) {
      setValue('name', functionality.name, validate);
      setValue('apiRoute', functionality.apiRoute, validate);
      setValue('platformId', functionality.platform.id, validate);
      setPlatformSelected({
        label: functionality.platform.name,
        value: String(functionality.platform.id)
      });
      setValue('active', functionality.active ?? false, validate);

      setValue('from', functionality.from, validate);
      setValue('regex', functionality.regex, validate);
      setValue('messageOnFind', functionality.messageOnFind, validate);
      setValue('messageNotFound', functionality.messageNotFound, validate);

      setValue('indexToGet', functionality.indexToGet, validate);

      setValue('subject', functionality.subject, validate);

      setValue('text', functionality.text, validate);

      setValue('textToReplace', functionality.textToReplace, validate);
    } else setValue('active', false, validate);
  }, [functionality]);

  return (
    <form
      className={'flex flex-col gap-4 w-full'}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        minWidth: isImage ? '65%' : ''
      }}
    >
      <div className={'flex gap-4'}>
        <LabelInput
          error={!!errors.name}
          label={'Nome da funcionalidade'}
          placeholder={'Digite o nome da funcionalidade'}
          register={register('name')}
          required
        />

        <LabelInput
          error={!!errors.apiRoute}
          label={'Rota da api'}
          placeholder={'Digite a rota da api'}
          register={register('apiRoute')}
        />
      </div>

      <div className={'flex gap-4'}>
        <Select
          error={!!errors.platformId}
          id={'default-functionalit-platform-select'}
          label={'Plataforma'}
          onChange={(newValue): void => {
            const value = newValue as SelectValues | null;

            setValue('platformId', value?.value as unknown as number, { shouldValidate: true });
            setPlatformSelected(value);
          }}
          options={listToSelect(platformQuery.data?.content ?? [])}
          required
          value={platformSelected}
        />

        {isModal ? null : (
          <div className={'flex gap-4 items-center'}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={getValues('active')}
                  defaultChecked={functionality?.active}
                  onChange={(event): void => setValue('active', event.target.checked, validate)}
                />
              }
              label={'Ativo'}
              labelPlacement={'start'}
            />
          </div>
        )}
      </div>

      {isModal ? null : isImage && functionality ? (
        <ImageFunctionalityForm functionality={functionality} />
      ) : (
        <>
          <div className={'flex gap-4'}>
            <LabelInput
              error={!!errors.messageOnFind}
              label={'Mensagem se achar o e-mail'}
              register={register('messageOnFind')}
            />

            <LabelInput
              error={!!errors.messageNotFound}
              label={'Mensagem se não achar o e-mail'}
              register={register('messageNotFound')}
            />
          </div>

          <LabelInput
            error={!!errors.from}
            label={'E-mail para buscar'}
            placeholder={'Digite o e-mail que vai ser buscado'}
            register={register('from')}
          />

          <div className={'flex gap-4'}>
            <ListInput
              initialList={functionality?.subject ?? []}
              label={'Texto no assunto do e-mail'}
              onChange={(list): void => {
                setValue('subject', list as string[]);
              }}
              title={'Assunto do e-mail'}
            />

            <ListInput
              initialList={functionality?.text ?? []}
              label={'Texto no corpo do e-mail'}
              onChange={(list): void => {
                setValue('text', list as string[]);
              }}
              title={'Corpo do e-mail'}
            />
          </div>

          <LabelInput
            error={!!errors.regex}
            label={'Regex do e-mail'}
            register={register('regex')}
          />

          <div className={'flex gap-4'}>
            <ListInput
              initialList={functionality?.indexToGet ?? []}
              label={'Index da busca'}
              onChange={(list): void => {
                setValue('indexToGet', list as number[]);
              }}
              title={'Index da busca do e-mail'}
              type={'number'}
            />

            <ListListInput
              initialList={functionality?.textToReplace ?? []}
              label={'Texto para replace'}
              onChange={(list): void => {
                setValue('textToReplace', list);
              }}
              title={'Texto para replace do e-mail'}
            />
          </div>
        </>
      )}

      {isImage ? null : <FormButton disableRipple isSubmitting={isSubmitting} label={'Salvar'} />}
    </form>
  );
};
