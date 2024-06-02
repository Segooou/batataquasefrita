import { DraggableContainer } from 'presentation/atomic-component/atom';
import { dimensions, paths } from 'main/config';
import { useFindFunctionalityQuery } from 'infra/cache';
import { useNavigate } from 'react-router-dom';
import { useWindowDimensions } from 'data/hooks';
import type { FC } from 'react';

export const DraggableFunctionality: FC = () => {
  const functionalityQuery = useFindFunctionalityQuery({});

  const navigate = useNavigate();

  const { width } = useWindowDimensions();

  const break2 = width < dimensions.tablet ? 3 : 8;

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
              key={item.id}
              className={
                'min-w-[200px] flex-col gap-2 px-6 bg-gray-700 border border-gray-550 rounded-md h-[120px] bg-blue-500 flex items-center justify-center text-white'
              }
              onClick={(event): void => {
                const newTab = event?.ctrlKey || event?.metaKey || event?.button === 1;

                if (newTab) {
                  const newWindow = window.open(
                    paths.functionality(item.platform.keyword, item.keyword),
                    '_blank'
                  );

                  if (newWindow) newWindow.focus();
                } else navigate(paths.functionality(item.platform.keyword, item.keyword));
              }}
            >
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
