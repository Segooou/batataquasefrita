import { DraggableContainer } from 'presentation/atomic-component/atom';
import { dimensions, paths } from 'main/config';
import { useFindPlatformQuery } from 'infra/cache';
import { useNavigate } from 'react-router-dom';
import { useWindowDimensions } from 'data/hooks';
import type { FC } from 'react';

export const DraggablePlatform: FC = () => {
  const platformQuery = useFindPlatformQuery({});

  const { width } = useWindowDimensions();

  const navigate = useNavigate();

  const break2 = width < dimensions.tablet ? 3 : 16;

  return (
    <div className={'flex flex-col gap-2'}>
      <h2 className={'font-semibold text-xl'}>Plataformas</h2>

      <DraggableContainer
        break2={break2}
        height={
          platformQuery.data?.content && platformQuery.data?.content.length >= break2 ? 280 : 150
        }
      >
        {platformQuery.data?.content.map((item) => {
          return (
            <div
              key={item.id}
              className={
                'min-w-[200px] p-6 bg-gray-700 border border-gray-550 rounded-md h-[100px] bg-blue-500 flex items-center justify-center text-white'
              }
              onClick={(event): void => {
                const newTab = event?.ctrlKey || event?.metaKey || event?.button === 1;

                if (newTab) {
                  const newWindow = window.open(paths.platform(item.keyword), '_blank');

                  if (newWindow) newWindow.focus();
                } else navigate(paths.platform(item.keyword));
              }}
            >
              <span className={'text-center font-semibold'}>{item.name}</span>
            </div>
          );
        })}
      </DraggableContainer>
    </div>
  );
};
