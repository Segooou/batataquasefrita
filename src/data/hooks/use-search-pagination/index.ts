import { scrollTop } from 'main/utils';
import { useDebounce } from 'data/hooks/use-debounce';
import { useEffect, useState } from 'react';
import { usePagination } from 'data/hooks/use-pagination';

interface useSearchProps {
  searchDebounce: string;
  scrollTop?: boolean;
}

export interface useSearchReturn {
  page: number;
  search: string;
  handleChangePage: (event: unknown, newPage: number) => void;
}

const firstPage = 1;

export const useSearchPagination = (props: useSearchProps): useSearchReturn => {
  const { page, setPage, handleChangePage } = usePagination();

  const [search, setSearch] = useState(props.searchDebounce);

  useEffect(() => {
    if (props.scrollTop) scrollTop();
  }, [page]);

  useDebounce(
    () => {
      setSearch(props.searchDebounce);
      if (page !== firstPage) setPage(firstPage);
    },
    [props.searchDebounce],
    300
  );

  return { handleChangePage, page, search };
};
