/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable no-await-in-loop */
import { Button } from '@mui/material';
import { FormButton, InputToCopy } from 'presentation/atomic-component/atom';
import { InputData } from 'presentation/atomic-component/molecule/input-data';
import { api } from 'infra/http';
import { inputPropsSheet1 } from 'main/utils/input-props-sheet-1';
import { resolverError, validateForm } from 'main/utils';
import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import type { Functionality } from 'domain/models';

interface FunctionalityFormProps {
  functionality: Functionality;
}

export interface DataProps {
  data: {
    email: string;
    password: string;
  };
  result: string[];
}

export const FunctionalitySheets1Form: FC<FunctionalityFormProps> = ({ functionality }) => {
  const [data, setData] = useState(inputPropsSheet1);
  const [result, setResult] = useState<DataProps[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setResult([]);
    if (validateForm({ data, focus: true, index: undefined, setData }))
      try {
        const body = {
          functionalityId: functionality.id,
          googleSheets: {}
        };

        data.forEach((item) => {
          const getValue = (): number | string => {
            if (item.uppercase) return String(item.value ?? '').toUpperCase();

            return item.value ?? '';
          };

          Object.assign(body.googleSheets, { [item.formValue]: getValue() });
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
        <div className={'grid grid-cols-2 gap-4'}>
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
        </div>

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
              <div className={'flex flex-col gap-4'}>
                <div className={'flex gap-4 max-w-[500px] w-full mx-auto items-center'}>
                  <span className={'min-w-max'}>E-mail:</span>
                  <InputToCopy number={100} value={item?.data?.email} />
                </div>

                <div className={'flex gap-4 max-w-[500px] w-full mx-auto items-center'}>
                  <span className={'min-w-max'}>Senha:</span>
                  <InputToCopy value={item?.data?.password} />
                </div>
              </div>

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
                setData(inputPropsSheet1);
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
