import { type FC, useEffect, useState } from 'react';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { listToSelect, validate } from 'main/utils';
import { useDefaultFunctionality } from 'data/use-case';
import { useFindPlatformQuery } from 'infra/cache';
import type { Functionality } from 'domain/models';

interface DefaultFunctionalityFormProps {
  functionality?: Functionality;
  closeModal: () => void;
}

export const DefaultFunctionalityForm: FC<DefaultFunctionalityFormProps> = ({
  closeModal,
  functionality
}) => {
  const [platformSelected, setPlatformSelected] = useState<SelectValues | null>(null);

  const { handleSubmit, onSubmit, register, errors, isSubmitting, setValue } =
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
      setValue('platformId', functionality.platform.id, validate);
      setPlatformSelected({
        label: functionality.platform.name,
        value: String(functionality.platform.id)
      });
    }
  }, [functionality]);

  return (
    <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
      <LabelInput
        error={!!errors.name}
        label={'Nome da funcionalidade'}
        placeholder={'Digite o nome da funcionalidade'}
        register={register('name')}
        required
      />

      <Select
        error={!!errors.platformId}
        id={'new-functionalit-platform-select'}
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

      <LabelInput
        error={!!errors.description}
        label={'Descrição da funcionalidade'}
        maxRows={10}
        minRows={6}
        placeholder={'Digite a descrição da funcionalidade'}
        register={register('description')}
        required
        textarea
      />

      <FormButton disableRipple isSubmitting={isSubmitting} label={'Enviar'} />
    </form>
  );
};
