import { Pagination as PaginationUI } from '@mui/material';
import type { FC } from 'react';

interface PaginationProps {
  page: number;
  totalPages?: number;
  handleChangePage: (event: unknown, newPage: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  handleChangePage
}: PaginationProps) => {
  if (totalPages === 0) return null;
  return (
    <div className={'flex justify-center'}>
      <PaginationUI
        boundaryCount={1}
        count={totalPages}
        onChange={handleChangePage}
        page={page}
        shape={'rounded'}
        siblingCount={1}
        variant={'outlined'}
      />
    </div>
  );
};
