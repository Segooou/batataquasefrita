import { Skeleton, TableCell, TableRow } from '@mui/material';
import type { FC } from 'react';

export const SkeletonTableRow: FC<{ quantity?: number }> = ({ quantity = 1 }) => (
  <TableRow key={quantity}>
    {Array.from(Array(quantity), (_event, id) => (
      <TableCell key={id}>
        <Skeleton animation={'wave'} height={24.5} sx={{ flex: 1, maxWidth: 'auto' }} />
      </TableCell>
    ))}
  </TableRow>
);
