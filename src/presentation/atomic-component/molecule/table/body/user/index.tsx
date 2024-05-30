import { BodyCell } from 'presentation/atomic-component/atom';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { ImageModal, UserModal } from 'presentation/atomic-component/molecule/modal';
import { QueryName, apiPaths } from 'main/config';
import { TableBody, TableRow } from '@mui/material';
import type { FC } from 'react';
import type { UserProps } from 'domain/models';

interface UserTableBodyProps {
  items: UserProps[];
}

export const UserTableBody: FC<UserTableBodyProps> = ({ items }) => {
  return (
    <TableBody className={'relative'}>
      {items?.length === 0 ? (
        <TableRow>
          <BodyCell
            align={'center'}
            colSpan={4}
            title={<div className={'p-4 font-semibold text-xl'}>Nenhum item encontrado</div>}
          />
        </TableRow>
      ) : null}

      {items?.map((item) => (
        <TableRow key={item.id}>
          <BodyCell
            align={'center'}
            title={
              <div className={'flex justify-center'}>
                <ImageModal name={item.username} url={item?.avatar} />
              </div>
            }
          />

          <BodyCell align={'center'} title={item.username} />
          <BodyCell align={'center'} title={item._count.actions} />

          <BodyCell
            align={'center'}
            title={
              <div className={'flex justify-center gap-3'}>
                <UserModal user={item} />

                <DeleteConfirmationModal
                  id={item.id}
                  queryName={QueryName.user}
                  route={apiPaths.user}
                  successMessage={'Usuário deletado com sucesso'}
                  text={'Tem certeza que deseja deletar esse usuário'}
                  title={'Deletar usuário'}
                />
              </div>
            }
          />
        </TableRow>
      ))}
    </TableBody>
  );
};
