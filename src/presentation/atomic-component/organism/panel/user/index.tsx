import { Pagination } from 'presentation/atomic-component/molecule';
import { TableTemplate } from 'presentation/atomic-component/atom';
import { UserModal } from 'presentation/atomic-component/molecule/modal';
import { UserTableBody } from 'presentation/atomic-component/molecule/table/body';
import { UserTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { useFindUserQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import type { FC } from 'react';

export const UserPanel: FC = () => {
  const { handleChangePage, page } = usePagination();

  const userQuery = useFindUserQuery({ limit: 7, page });

  return (
    <div className={'flex flex-col'}>
      {userQuery.data ? (
        <div className={'flex flex-col gap-6 max-w-[1300px] w-full mx-auto'}>
          <div className={'flex justify-end'}>
            <UserModal />
          </div>

          <TableTemplate
            tableBody={<UserTableBody items={userQuery.data?.content ?? []} />}
            tableHeader={<UserTableHeader />}
          />

          <Pagination
            handleChangePage={handleChangePage}
            page={page}
            totalPages={userQuery.data.totalPages}
          />
        </div>
      ) : null}
    </div>
  );
};
