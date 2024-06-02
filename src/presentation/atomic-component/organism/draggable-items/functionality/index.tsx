import { DraggableContainer } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { QueryName, apiPaths, dimensions, paths } from 'main/config';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { random, resolverError } from 'main/utils';
import { useFindFunctionalityQuery } from 'infra/cache';
import { useNavigate } from 'react-router-dom';
import { useWindowDimensions } from 'data/hooks';

export const DraggableFunctionality: FC = () => {
  const functionalityQuery = useFindFunctionalityQuery({});

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();

  const break2 = width < dimensions.tablet ? 3 : 8;

  const changeFavorite = async (id: number, isFavorite: boolean): Promise<void> => {
    try {
      if (isLoading === false) {
        setIsLoading(true);
        await api.put({
          body: {
            functionalityId: id,
            isFavorite
          },
          route: apiPaths.favoriteUserFunctionality
        });
        queryClient.invalidateQueries(QueryName.functionality);
        queryClient.invalidateQueries(QueryName.favoriteUserFunctionality);
      }
    } catch (error) {
      resolverError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={'flex flex-col gap-2'}>
      <h2 className={'font-semibold text-xl'}>Funcionalidades</h2>

      <DraggableContainer
        break2={break2}
        height={
          functionalityQuery.data?.content && functionalityQuery.data?.content.length >= break2
            ? 280
            : 150
        }
      >
        {functionalityQuery.data?.content.map((item) => {
          return (
            <div
              key={`${random()}${item.id}`}
              className={
                'min-w-[200px] relative flex-col gap-2 px-6 bg-gray-700 border border-gray-550 rounded-md h-[120px] bg-blue-500 flex items-center justify-center text-white'
              }
              onClick={(event): void => {
                const { tagName } = event.target as unknown as { tagName: string };

                if (tagName === 'svg' || tagName === 'path')
                  changeFavorite(item.id, item.favoriteUserFunctionality.length === 0);
                else {
                  const newTab = event?.ctrlKey || event?.metaKey || event?.button === 1;

                  if (newTab) {
                    const newWindow = window.open(
                      paths.functionality(item.platform.keyword, item.keyword),
                      '_blank'
                    );

                    if (newWindow) newWindow.focus();
                  } else navigate(paths.functionality(item.platform.keyword, item.keyword));
                }
              }}
            >
              <div
                className={'absolute top-1 right-1 z-10 cursor-pointer'}
                onClick={(event): void => {
                  event.stopPropagation();
                }}
              >
                {item.favoriteUserFunctionality?.length > 0 ? <Favorite /> : <FavoriteBorder />}
              </div>

              <span className={'text-center line-clamp-3'}>{item.name}</span>

              <span className={'text-center'}>
                <span className={'font-semibold'}>{item.platform.name}</span>
              </span>
            </div>
          );
        })}
      </DraggableContainer>
    </div>
  );
};
