import type { FC } from 'react';

import { SkeletonTableRow } from './skeleton-table-row';

interface TableSkeletonProps {
  quantity: number;
  line: number;
}

export const TableSkeleton: FC<TableSkeletonProps> = ({ quantity, line }) => (
  <>
    {Array.from(Array(line), (_event, id) => (
      <SkeletonTableRow key={id} quantity={quantity} />
    ))}
  </>
);
