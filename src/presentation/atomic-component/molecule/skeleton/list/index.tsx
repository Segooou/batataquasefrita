import { Skeleton } from '@mui/material';
import type { FC } from 'react';

export const SkeletonList: FC<{ quantity?: number }> = ({ quantity = 1 }) => (
  <div className={'flex flex-col'}>
    {Array.from(Array(quantity), (_event, id) => (
      <Skeleton key={id} sx={{ height: '180px', marginTop: '-40px' }} />
    ))}
  </div>
);
