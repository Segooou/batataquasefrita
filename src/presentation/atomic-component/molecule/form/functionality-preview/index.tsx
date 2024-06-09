/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/init-declarations */
import { Button } from '@mui/material';
import { FormButton, InputToCopy } from 'presentation/atomic-component/atom';
import { InputData } from 'presentation/atomic-component/molecule/input-data';
import { api } from 'infra/http';
import { resolverError, validateForm } from 'main/utils';
import { useState } from 'react';
import type { DataProps } from 'presentation/atomic-component/molecule/form/sheets';
import type { FC, FormEvent } from 'react';
import type { Functionality } from 'domain/models';

interface FunctionalityPreviewFormProps {
  functionality: Functionality;
}

export const FunctionalityPreviewForm: FC<FunctionalityPreviewFormProps> = ({ functionality }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState(functionality.inputProps);
  const [finalResults, setFinalResults] = useState<DataProps[]>([]);
  const [result, setResult] = useState<DataProps[]>([]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setResult([]);
    setFinalResults([]);
    if (validateForm({ data, focus: true, index: undefined, setData }))
      try {
        const body = {
          functionalityId: functionality.id,
          test: true
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
        setFinalResults(response);
      } catch (error) {
        resolverError(error);
      } finally {
        setIsSubmitting(false);
      }
  };

  const check = (): void => {
    result.forEach((item) => {
      let newResult: DataProps | undefined;

      const messageNotFound =
        typeof functionality?.messageNotFound === 'string' &&
        functionality?.messageNotFound.length > 0
          ? functionality?.messageNotFound
          : 'Nenhum e-mail foi encontrado';
      const messageOnFind = functionality?.messageOnFind;

      const regex = functionality?.regex;
      const indexToGet = functionality?.indexToGet;
      const textToReplace = functionality?.textToReplace;

      if (item?.hasError && typeof item?.errorMessage === 'string') newResult = item;
      else if (item.result.length === 0 || item.result?.[0] === messageNotFound)
        newResult = { ...item, result: [messageNotFound] };
      else if (typeof messageOnFind === 'string' && messageOnFind.length > 0)
        newResult = { ...item, result: [messageOnFind] };
      else if (typeof regex === 'string') {
        const actResults: string[] = [];
        const regexExp = new RegExp(regex, 'gu');
        const match: string[] = [];

        item.result.forEach((matchItem) => {
          const newMach = matchItem.match(regexExp);

          newMach?.forEach((newMatchItem) => {
            match.push(newMatchItem);
          });
        });

        if (indexToGet?.length && indexToGet?.length > 0)
          indexToGet.forEach((index) => {
            let value = match?.[index];

            if (typeof value === 'string') {
              if (textToReplace?.length && textToReplace?.length > 0) {
                const textToReplaceFormatted = textToReplace as unknown as string[][];

                textToReplaceFormatted.forEach((replaceValue) => {
                  const replaceRegex = new RegExp(replaceValue?.[0] ?? '', 'gu');

                  value = value?.replace(replaceRegex, replaceValue?.[1] ?? '');
                });
              }

              actResults.push(value);
            } else actResults.push('Nenhum dado foi encontrado');
          });
        else
          match?.forEach((matchItem) => {
            let value = matchItem;

            if (typeof value === 'string') {
              if (textToReplace?.length && textToReplace?.length > 0) {
                const textToReplaceFormatted = textToReplace as unknown as string[][];

                textToReplaceFormatted.forEach((replaceValue) => {
                  const replaceRegex = new RegExp(replaceValue?.[0] ?? '', 'gu');

                  value = value?.replace(replaceRegex, replaceValue?.[1] ?? '');
                });
              }

              actResults.push(value);
            } else actResults.push('Nenhum dado foi encontrado');
          });

        newResult = { ...item, result: actResults };
      }

      if (newResult) setFinalResults([newResult]);
      else setFinalResults([{ ...item, result: ['Nenhum resultado foi encontrado'] }]);
    });
  };

  return (
    <div className={'flex flex-col gap-4 w-full'}>
      <div className={'flex mx-auto flex-col w-full relative gap-4 max-w-[500px]'}>
        <Button onClick={check}>Checar dados</Button>
      </div>

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

      {finalResults.length > 0 ? (
        <div className={'flex flex-col gap-3 text-lg'}>
          {finalResults.map((item) => (
            <div
              key={item?.data?.email}
              className={
                'grid grid-cols-1 border w-full border-gray-200 p-4 rounded-sm mx-auto max-w-[500px] gap-4'
              }
            >
              {item?.result?.map((itemResult) => (
                <div key={`${itemResult} `} className={'flex gap-4 w-full max-w-[500px] mx-auto'}>
                  <InputToCopy label={'Resultado'} value={itemResult ?? ' '} />
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
                setFinalResults([]);
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
