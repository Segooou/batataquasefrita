import { Skeleton } from '@mui/material';
import type { FC } from 'react';

export const PaginationSkeleton: FC = () => (
  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.14rem' }}>
    {Array.from(Array(6), (_event, id) => (
      <Skeleton
        key={id}
        animation={'wave'}
        sx={{ height: '22px', width: '22px' }}
        variant={'circular'}
      />
    ))}
  </div>
);
