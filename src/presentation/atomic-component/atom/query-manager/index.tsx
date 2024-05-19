import { BodyCell } from 'presentation/atomic-component/atom/table/body-cell';
import { Button } from '@mui/material';
import type { FC, ReactNode } from 'react';
import type { QueryObserverResult, UseQueryResult } from 'react-query';

interface QueryManagerProps {
  query: UseQueryResult;
  children: ReactNode;
  table?: boolean;
  skeleton?: ReactNode;
  hideError?: boolean;
}

export const QueryManager: FC<QueryManagerProps> = ({
  query,
  children,
  hideError,
  skeleton,
  table
}) => {
  if (query.isLoading || (query.isFetching && !query.isFetched)) return <> {skeleton}</>;

  if (query.isError && !hideError && table)
    return (
      <BodyCell
        colSpan={1000}
        title={
          <div className={'flex flex-col gap-2 pt-4 h-full w-full items-center justify-center '}>
            <h1>Parece que houve um erro ao carregar os dados.</h1>

            <Button
              onClick={(): Promise<QueryObserverResult> => query.refetch()}
              variant={'outlined'}
            >
              Tentar novamente
            </Button>

            <div />
          </div>
        }
      />
    );

  if (query.isError && !hideError)
    return (
      <div className={'flex flex-col pt-4 gap-2 h-full w-full items-center justify-center '}>
        <h1>Parece que houve um erro ao carregar os dados.</h1>

        <Button onClick={(): Promise<QueryObserverResult> => query.refetch()} variant={'outlined'}>
          Tentar novamente
        </Button>

        <div />
      </div>
    );

  return <> {children}</>;
};
