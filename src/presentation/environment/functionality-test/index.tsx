import {
  DefaultFunctionalityForm,
  FunctionalityPreviewForm
} from 'presentation/atomic-component/molecule/form';
import { GoBack } from 'presentation/atomic-component/atom';
import { useFindOneFunctionalityKeywordQuery } from 'infra/cache';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

export const FunctionalityTestContent: FC = () => {
  const { functionalityKeyword } = useParams() as {
    functionalityKeyword: string;
  };

  const functionalityQuery = useFindOneFunctionalityKeywordQuery({
    id: functionalityKeyword
  });

  return (
    <div className={'flex flex-col gap-6'}>
      <div>
        <GoBack />
      </div>

      {functionalityQuery.data ? (
        <div className={'flex flex-col gap-16 laptop:-mt-[60px] text-center'}>
          <h2 className={'text-2xl font-semibold'}>{functionalityQuery.data?.name}</h2>

          <div className={'flex flex-col gap-6 laptop:flex-row'}>
            <DefaultFunctionalityForm functionality={functionalityQuery.data} />
            <FunctionalityPreviewForm functionality={functionalityQuery.data} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
