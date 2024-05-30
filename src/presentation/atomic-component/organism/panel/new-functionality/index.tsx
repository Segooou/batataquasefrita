import { NewFunctionalityModal } from 'presentation/atomic-component/molecule/modal';
import { NewFunctionalityTableBody } from 'presentation/atomic-component/molecule/table/body';
import { NewFunctionalityTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { Pagination } from 'presentation/atomic-component/molecule';
import { TableTemplate } from 'presentation/atomic-component/atom';
import { useFindNewFunctionalityQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import type { FC } from 'react';

export const NewFunctionalityPanel: FC = () => {
  const { handleChangePage, page } = usePagination();

  const newFunctionalityQuery = useFindNewFunctionalityQuery({ limit: 7, page });

  return (
    <div className={'flex flex-col'}>
      {newFunctionalityQuery.data ? (
        <div className={'flex flex-col gap-6 max-w-[1300px] w-full mx-auto'}>
          <div className={'flex justify-end'}>
            <NewFunctionalityModal />
          </div>

          <TableTemplate
            tableBody={
              <NewFunctionalityTableBody items={newFunctionalityQuery.data?.content ?? []} />
            }
            tableHeader={<NewFunctionalityTableHeader />}
          />

          <Pagination
            handleChangePage={handleChangePage}
            page={page}
            totalPages={newFunctionalityQuery.data.totalPages}
          />
        </div>
      ) : null}
    </div>
  );
};
