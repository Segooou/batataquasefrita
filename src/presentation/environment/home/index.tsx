import { DraggableContainer } from 'presentation/atomic-component/atom';
import { paths } from 'main/config';
import type { FC } from 'react';

export const HomeContent: FC = () => {
  const aaa = [
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE',
    'STAKE'
  ];

  return (
    <div>
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-semibold text-xl'}>Plataformas</h2>

        <DraggableContainer break2={8} height={240}>
          {aaa.map((item) => {
            return (
              <div
                key={item}
                className={
                  'min-w-[200px] bg-gray-700 border border-gray-550 rounded-md h-[100px] bg-blue-500 flex items-center justify-center text-white'
                }
                onClick={(event): void => {
                  const newTab = event?.ctrlKey || event?.metaKey || event?.button === 1;

                  if (newTab) {
                    const newWindow = window.open(paths.stake, '_blank');

                    if (newWindow) newWindow.focus();
                  } else window.location.href = paths.stake;
                }}
              >
                {item}
              </div>
            );
          })}
        </DraggableContainer>
      </div>
    </div>
  );
};
