/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable no-await-in-loop */

'use client';

import { Button } from '@mui/material';
import { FormButton, InputToCopy } from 'presentation/atomic-component/atom';
import { InputData } from 'presentation/atomic-component/molecule/input-data';
import { decryptData, resolverError } from 'main/utils';
import { store } from 'store';
import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import type { Functionality } from 'domain/models';

interface FunctionalityFormProps {
  functionality: Functionality;
}

export const FunctionalityForm: FC<FunctionalityFormProps> = ({ functionality }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState(functionality.inputProps);
  const [result, setResult] = useState<string[]>([]);

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

    setResult([]);
    if (validateForm(undefined, true))
      try {
        const accessToken = decryptData(store.getState().persist.accessToken || '');

        const headers = { 'Content-Type': 'application/json' };

        if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });

        const body = {
          functionalityId: functionality.id
        };

        data.forEach((item) => {
          Object.assign(body, { [item.formValue]: item.value });
        });

        setIsSubmitting(true);
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

            setResult((prevData) => [...(prevData ?? []), newValue?.result]);
          }
        }
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
        <div className={'flex flex-col gap-3'}>
          {result.map((item) => (
            <div key={item} className={'flex gap-4 max-w-[500px] w-full mx-auto'}>
              <InputToCopy value={item} />
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
