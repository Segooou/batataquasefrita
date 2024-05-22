import { FunctionalityForm } from 'presentation/atomic-component/molecule/form/functionality';
import { GoBack } from 'presentation/atomic-component/atom';
import { useFindOneFunctionalityKeywordQuery } from 'infra/cache';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

export const FunctionalityContent: FC = () => {
  const { functionalityKeyword } = useParams() as {
    platformKeyword: string;
    functionalityKeyword: string;
  };

  const functionalityQuery = useFindOneFunctionalityKeywordQuery({
    id: functionalityKeyword
  });

  return (
    <div className={'flex flex-col gap-4'}>
      <div>
        <GoBack />
      </div>

      {functionalityQuery.data ? (
        <div className={'flex flex-col gap-12 items-center text-2xl font-semibold'}>
          <h2>{functionalityQuery.data?.name}</h2>
          <FunctionalityForm functionality={functionalityQuery.data} />
        </div>
      ) : null}
    </div>
  );
};
