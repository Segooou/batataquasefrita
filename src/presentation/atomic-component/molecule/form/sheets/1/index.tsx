/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable no-await-in-loop */

'use client';

import { Button } from '@mui/material';
import { FormButton, InputToCopy } from 'presentation/atomic-component/atom';
import { InputData } from 'presentation/atomic-component/molecule/input-data';
import { decryptData, resolverError } from 'main/utils';
import { inputPropsSheet1 } from 'main/utils/input-props-sheet-1';
import { store } from 'store';
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

  const fetchData = async (): Promise<void> => {
    const accessToken = decryptData(store.getState().persist.accessToken || '');

    const headers = { 'Content-Type': 'application/json' };

    if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });

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

    const apiUrl = `${import.meta.env.VITE_API_URL}${functionality.apiRoute}`;

    const response = await fetch(apiUrl, {
      body: JSON.stringify(body),
      headers,
      method: 'POST'
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let completed = false;

    while (!completed && typeof reader !== 'undefined') {
      const { value, done } = await reader.read();

      completed = done;
      if (value) {
        const chunk = decoder.decode(value, { stream: true });

        const newValue = JSON.parse(chunk);

        setResult((prevData) => [...(prevData ?? []), newValue]);
      }
    }

    setIsSubmitting(false);
  };

  const validateForm = (index?: number, focus?: boolean): boolean => {
    const errors: number[] = [];

    const newData = data.map((item, itemIndex) => {
      const value = { ...item };

      if ((index && index === itemIndex) || !index)
        if (item.isRequired && !item.value) {
          errors.push(item.id);
          value.error = true;
        } else value.error = false;

      return value;
    });

    setData(newData);

    if (errors.length > 0) {
      if (focus) document.getElementById(`input-data-${errors[0]}`)?.focus();

      return false;
    }

    return true;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setData([]);
    if (validateForm(undefined, true))
      try {
        setIsSubmitting(true);
        await fetchData();
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
                setData([]);
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
