import { type FC, useEffect, useState } from 'react';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { listToSelect, validate } from 'main/utils';
import { useFindPlatformQuery } from 'infra/cache';
import { useNewFunctionality } from 'data/use-case';
import type { NewFunctionality } from 'domain/models';

interface NewFunctionalityFormProps {
  newFunctionality?: NewFunctionality;
  closeModal: () => void;
}

export const NewFunctionalityForm: FC<NewFunctionalityFormProps> = ({
  closeModal,
  newFunctionality
}) => {
  const [platformSelected, setPlatformSelected] = useState<SelectValues | null>(null);

  const { handleSubmit, onSubmit, register, errors, isSubmitting, setValue } = useNewFunctionality({
    closeModal,
    newFunctionality
  });

  const platformQuery = useFindPlatformQuery({
    params: {
      all: true
    }
  });

  useEffect(() => {
    if (newFunctionality) {
      setValue('description', newFunctionality.description, validate);
      setValue('name', newFunctionality.name, validate);
      setValue('platformId', newFunctionality.platform.id, validate);
      setPlatformSelected({
        label: newFunctionality.platform.name,
        value: String(newFunctionality.platform.id)
      });
    }
  }, [newFunctionality]);

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
