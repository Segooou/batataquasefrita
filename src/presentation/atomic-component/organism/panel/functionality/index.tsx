import { FunctionalityModal } from 'presentation/atomic-component/molecule/modal';
import { FunctionalityTableBody } from 'presentation/atomic-component/molecule/table/body';
import { FunctionalityTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { Pagination } from 'presentation/atomic-component/molecule';
import { TableTemplate } from 'presentation/atomic-component/atom';
import { useFindFunctionalityQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import type { FC } from 'react';

export const FunctionalityPanel: FC = () => {
  const { handleChangePage, page } = usePagination();

  const functionalityQuery = useFindFunctionalityQuery({ limit: 7, page });

  return (
    <div className={'flex flex-col'}>
      {functionalityQuery.data ? (
        <div className={'flex flex-col gap-6 max-w-[1300px] w-full mx-auto'}>
          <div className={'flex justify-end'}>
            <FunctionalityModal />
          </div>

          <TableTemplate
            tableBody={<FunctionalityTableBody items={functionalityQuery.data?.content ?? []} />}
            tableHeader={<FunctionalityTableHeader />}
          />

          <Pagination
            handleChangePage={handleChangePage}
            page={page}
            totalPages={functionalityQuery.data.totalPages}
          />
        </div>
      ) : null}
    </div>
  );
};
