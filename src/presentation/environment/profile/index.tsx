/* eslint-disable @typescript-eslint/prefer-destructuring */
import { ActionTableBody } from 'presentation/atomic-component/molecule/table/body';
import { ActionTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { Avatar, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { GoBack, TableTemplate } from 'presentation/atomic-component/atom';
import { Pagination } from 'presentation/atomic-component/molecule';
import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { callToast, resolverError } from 'main/utils';
import { colors } from 'presentation/style';
import { getUser } from 'store/persist/selector';
import { queryClient } from 'infra/lib';
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
        <Avatar
          className={'cursor-pointer hover:bg-[#ffffff98]'}
          onClick={(): void => document.getElementById('select-avatar-image')?.click()}
          src={userQuery.data?.avatar ?? ''}
          sx={{
            height: '50px',
            width: '50px'
          }}
        >
          {userQuery.data?.username.slice(0, 1).toUpperCase()}
        </Avatar>

        <input
          accept={'image/*'}
          className={'hidden'}
          id={'select-avatar-image'}
          onChange={async (event): Promise<void> => {
            if (event.target.files?.length) {
              const image = event.target.files[0];

              if (image.type.includes('image/')) {
                const formData = new FormData();

                formData.append('image', image);

                try {
                  await api.put({
                    body: formData,
                    id: user.id,
                    isFormData: true,
                    route: apiPaths.user
                  });

                  callToast.success('Imagem enviada com sucesso');
                  queryClient.invalidateQueries(QueryName.user);
                } catch (error) {
                  resolverError(error);
                }
              }
            }
          }}
          type={'file'}
        />

        <div>{userQuery.data?.username?.replace('segou', 'Italo ignacio')}</div>

        <IconButton
          sx={{
            border: `1px solid ${colors.gray[550]}`
          }}
        >
          <Edit
            sx={{
              color: 'white'
            }}
          />
        </IconButton>
      </div>

      {actionsQuery.data ? (
        <div className={'flex flex-col gap-3'}>
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
