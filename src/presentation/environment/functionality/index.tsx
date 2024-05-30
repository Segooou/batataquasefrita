/* eslint-disable react/jsx-no-useless-fragment */
import { Button } from '@mui/material';
import { type FC, useState } from 'react';
import { FunctionalityForm } from 'presentation/atomic-component/molecule/form/functionality';
import { FunctionalitySheets1Form } from 'presentation/atomic-component/molecule/form';
import { GoBack } from 'presentation/atomic-component/atom';
import { useFindOneFunctionalityKeywordQuery } from 'infra/cache';
import { useParams } from 'react-router-dom';

export const FunctionalityContent: FC = () => {
  const { functionalityKeyword } = useParams() as {
    platformKeyword: string;
    functionalityKeyword: string;
  };

  const functionalityQuery = useFindOneFunctionalityKeywordQuery({
    id: functionalityKeyword
  });

  const [isSheet, setIsSheet] = useState<number | null>(null);

  const changeSheet = (): void => {
    if (functionalityQuery.data?.googleSheets)
      if (isSheet === null) setIsSheet(functionalityQuery.data.googleSheets);
      else setIsSheet(null);
  };

  return (
    <div className={'flex flex-col gap-6'}>
      <div>
        <GoBack />
      </div>

      {functionalityQuery.data?.googleSheets && functionalityQuery.data?.googleSheets !== null ? (
        <div className={'flex gap-4 laptop:-mt-[60px] mb-4 justify-center'}>
          <Button color={isSheet ? undefined : 'success'} onClick={changeSheet}>
            Formulário
          </Button>

          <Button color={isSheet ? 'success' : undefined} onClick={changeSheet}>
            Planilha
          </Button>
        </div>
      ) : null}

      {functionalityQuery.data ? (
        <div className={'flex flex-col gap-12 items-center text-2xl font-semibold'}>
          <h2>{functionalityQuery.data?.name}</h2>

          {isSheet ? (
            <>
              {isSheet === 1 ? (
                <FunctionalitySheets1Form functionality={functionalityQuery.data} />
              ) : null}
            </>
          ) : (
            <FunctionalityForm functionality={functionalityQuery.data} />
          )}
        </div>
      ) : null}
    </div>
  );
};
