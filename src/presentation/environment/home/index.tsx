import {
  DraggableFunctionality,
  DraggableNewFunctionality,
  DraggablePlatform
} from 'presentation/atomic-component/organism';
import type { FC } from 'react';

export const HomeContent: FC = () => {
  return (
    <div className={'flex flex-col gap-8 tablet:gap-12'}>
      <DraggablePlatform />
      <DraggableFunctionality />
      <DraggableNewFunctionality />
    </div>
  );
};
