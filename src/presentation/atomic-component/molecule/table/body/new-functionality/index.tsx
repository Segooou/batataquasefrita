import { BodyCell } from 'presentation/atomic-component/atom';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { NewFunctionalityModal } from 'presentation/atomic-component/molecule/modal/new-functionality';
import { QueryName, apiPaths } from 'main/config';
import { TableBody, TableRow } from '@mui/material';
import type { FC } from 'react';
import type { NewFunctionality } from 'domain/models';

interface NewFunctionalityTableBodyProps {
  items: NewFunctionality[];
}

export const NewFunctionalityTableBody: FC<NewFunctionalityTableBodyProps> = ({ items }) => {
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
          <BodyCell align={'center'} title={item.name} />
          <BodyCell align={'center'} title={item.description} />
          <BodyCell align={'center'} title={item.platform.name} />
          <BodyCell align={'center'} title={item.wasRaised ? 'Sim' : 'Não'} />
          <BodyCell align={'center'} title={item.user.username} />

          <BodyCell
            align={'center'}
            title={
              <div className={'flex justify-center gap-3'}>
                <NewFunctionalityModal newFunctionality={item} />

                <DeleteConfirmationModal
                  id={item.id}
                  queryName={QueryName.platform}
                  route={apiPaths.platform}
                  successMessage={'Nova funcionalidade deletada com sucesso'}
                  text={'Tem certeza que deseja deletar essa nova funcinalidade'}
                  title={'Deletar nova funcinalidade'}
                />
              </div>
            }
          />
        </TableRow>
      ))}
    </TableBody>
  );
};
