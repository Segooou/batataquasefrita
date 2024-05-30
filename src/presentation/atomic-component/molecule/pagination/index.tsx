import { Pagination as PaginationUI } from '@mui/material';
import { dimensions } from 'main/config';
import { useWindowDimensions } from 'data/hooks';
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
  const { width } = useWindowDimensions();

  if (totalPages === 0) return null;

  return (
    <div className={'flex justify-center'}>
      <PaginationUI
        boundaryCount={1}
        count={totalPages}
        onChange={handleChangePage}
        page={page}
        shape={'rounded'}
        siblingCount={width < dimensions.tablet ? 0 : 1}
        variant={'outlined'}
      />
    </div>
  );
};
