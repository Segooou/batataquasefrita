/* eslint-disable @typescript-eslint/prefer-destructuring */
import { ActionTableBody } from 'presentation/atomic-component/molecule/table/body';
import { ActionTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { GoBack, TableTemplate } from 'presentation/atomic-component/atom';
import { ImageModal, UserModal } from 'presentation/atomic-component/molecule/modal';
import { Pagination } from 'presentation/atomic-component/molecule';
import { getUser } from 'store/persist/selector';
import { useFindActionQuery, useFindOneUserQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import type { FC } from 'react';

export const ProfileContent: FC = () => {
  const user = getUser();

  const { handleChangePage, page } = usePagination();

  const userQuery = useFindOneUserQuery({ id: user.id });
  const actionsQuery = useFindActionQuery({
    limit: 5,
    page
  });

  return (
    <div className={'flex flex-col gap-12'}>
      <div>
        <GoBack />
      </div>

      <div className={'flex gap-4 items-center mx-auto max-w-[450px]'}>
        <ImageModal name={userQuery.data?.username} url={userQuery.data?.avatar} />
        <div>{userQuery.data?.username}</div>
        {userQuery.data ? <UserModal user={userQuery.data} /> : null}
      </div>

      {actionsQuery.data ? (
        <div className={'flex flex-col gap-6 max-w-[1500px] w-full mx-auto'}>
          <h2 className={'font-semibold text-2xl'}>Histórico de uso</h2>

          <TableTemplate
            tableBody={<ActionTableBody items={actionsQuery.data.content} />}
            tableHeader={<ActionTableHeader />}
          />

          <Pagination
            handleChangePage={handleChangePage}
            page={page}
            totalPages={actionsQuery.data.totalPages}
          />
        </div>
      ) : null}
    </div>
  );
};
