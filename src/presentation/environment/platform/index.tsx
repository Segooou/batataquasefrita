import { GoBack } from 'presentation/atomic-component/atom';
import { Link, useParams } from 'react-router-dom';
import { paths } from 'main/config';
import { useFindFunctionalityQuery, useFindOnePlatformKeywordQuery } from 'infra/cache';
import type { FC } from 'react';

export const PlatformContent: FC = () => {
  const { platformKeyword } = useParams() as {
    platformKeyword: string;
  };

  const platformQuery = useFindOnePlatformKeywordQuery({ id: platformKeyword });
  const functionalitiesQuery = useFindFunctionalityQuery({
    params: {
      platformKeyword
    }
  });

  return (
    <div className={'flex flex-col gap-4'}>
      <div>
        <GoBack />
      </div>

      <h2 className={'font-bold text-2xl'}>{platformQuery.data?.name}</h2>

      <div className={'flex flex-wrap gap-4'}>
        {functionalitiesQuery.data?.content.map((item) => (
          <Link
            key={item.id}
            className={
              'min-w-[200px] cursor-pointer p-6 bg-gray-700 border border-gray-550 rounded-md h-[100px] bg-blue-500 flex items-center justify-center text-white'
            }
            to={paths.functionality(platformKeyword, item.keyword)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
