import { Pagination } from 'presentation/atomic-component/molecule';
import { PlatformModal } from 'presentation/atomic-component/molecule/modal';
import { PlatformTableBody } from 'presentation/atomic-component/molecule/table/body';
import { PlatformTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { TableTemplate } from 'presentation/atomic-component/atom';
import { useFindPlatformQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import type { FC } from 'react';

export const PlatformPanel: FC = () => {
  const { handleChangePage, page } = usePagination();

  const platformQuery = useFindPlatformQuery({ limit: 7, page, params: { all: true } });

  return (
    <div className={'flex flex-col'}>
      {platformQuery.data ? (
        <div className={'flex flex-col gap-6 max-w-[1300px] w-full mx-auto'}>
          <div className={'flex justify-end'}>
            <PlatformModal />
          </div>

          <TableTemplate
            tableBody={<PlatformTableBody items={platformQuery.data?.content ?? []} />}
            tableHeader={<PlatformTableHeader />}
          />

          <Pagination
            handleChangePage={handleChangePage}
            page={page}
            totalPages={platformQuery.data.totalPages}
          />
        </div>
      ) : null}
    </div>
  );
};
