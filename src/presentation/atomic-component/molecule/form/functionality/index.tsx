import { Button } from '@mui/material';
import { FormButton, InputToCopy } from 'presentation/atomic-component/atom';
import { InputData } from 'presentation/atomic-component/molecule/input-data';
import { api } from 'infra/http';
import { resolverError, validateForm } from 'main/utils';
import { useState } from 'react';
import type { DataProps } from 'presentation/atomic-component/molecule/form/sheets';
import type { FC, FormEvent } from 'react';
import type { Functionality } from 'domain/models';

interface FunctionalityFormProps {
  functionality: Functionality;
}

export const FunctionalityForm: FC<FunctionalityFormProps> = ({ functionality }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState(functionality.inputProps);
  const [result, setResult] = useState<DataProps[]>([]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setResult([]);
    if (validateForm({ data, focus: true, index: undefined, setData }))
      try {
        const body = {
          functionalityId: functionality.id
        };

        data.forEach((item) => {
          Object.assign(body, { [item.formValue]: item.value });
        });

        setIsSubmitting(true);
        const response = await api.post<DataProps[]>({
          body,
          route: functionality.apiRoute
        });

        setResult(response);
      } catch (error) {
        resolverError(error);
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <div className={'flex flex-col gap-12 w-full '}>
      <form
        className={'flex mx-auto flex-col w-full relative gap-4 max-w-[500px]'}
        onSubmit={onSubmit}
      >
        {data.map((item, index) => (
          <InputData
            key={item.id}
            data={data}
            index={index}
            inputData={item}
            setData={setData}
            validateForm={validateForm}
          />
        ))}

        <FormButton isSubmitting={isSubmitting} label={'Enviar'} />
      </form>

      {result.length > 0 ? (
        <div className={'flex flex-col gap-3 text-lg'}>
          {result.map((item) => (
            <div
              key={item?.data?.email}
              className={
                'flex border border-gray-200 p-4 rounded-sm mx-auto max-w-[900px] justify-center items-center gap-4'
              }
            >
              {item?.result?.map((itemResult) => (
                <div key={itemResult} className={'flex gap-4 max-w-[500px] mx-auto'}>
                  <InputToCopy value={itemResult} />
                </div>
              ))}
            </div>
          ))}

          <div className={'flex gap-4 mt-4 justify-center max-w-[500px] w-full mx-auto'}>
            <Button
              color={'error'}
              onClick={(): void => {
                setIsSubmitting(false);
                setResult([]);
                setData(functionality.inputProps);
                document.getElementById(`input-data-${functionality.inputProps?.[0]?.id}`)?.focus();
              }}
            >
              Limpar campos
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
