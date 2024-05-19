import { Skeleton } from '@mui/material';
import type { FC } from 'react';

export const FindSkeleton: FC = () => (
  <div className={'grid grid-cols-4 max-w-[100px] gap-2 mx-auto pt-2 '}>
    <Skeleton variant={'circular'} />
    <Skeleton variant={'circular'} />
    <Skeleton variant={'circular'} />
    <Skeleton variant={'circular'} />
  </div>
);
