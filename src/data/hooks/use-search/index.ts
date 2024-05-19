import { useDebounce } from 'data/hooks/use-debounce';
import { useState } from 'react';

export const useSearch = (props: { searchDebounce: string }): { search: string } => {
  const [search, setSearch] = useState('');

  useDebounce(
    () => {
      setSearch(props.searchDebounce);
    },
    [props.searchDebounce],
    300
  );

  return { search };
};
