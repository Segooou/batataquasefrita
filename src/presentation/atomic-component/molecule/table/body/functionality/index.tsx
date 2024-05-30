import { BodyCell } from 'presentation/atomic-component/atom';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { QueryName, apiPaths } from 'main/config';
import { TableBody, TableRow } from '@mui/material';
import type { FC } from 'react';
import type { Functionality } from 'domain/models';

interface FunctionalityTableBodyProps {
  items: Functionality[];
}

export const FunctionalityTableBody: FC<FunctionalityTableBodyProps> = ({ items }) => {
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
          <BodyCell align={'center'} title={item.apiRoute} />

          <BodyCell
            align={'center'}
            title={typeof item.googleSheets === 'number' ? 'Sim' : 'Não'}
          />

          <BodyCell align={'center'} title={item.platform.name} />

          <BodyCell
            align={'center'}
            title={
              <div className={'flex justify-center gap-3'}>
                {/* <FunctionalityModal functionality={item} /> */}

                <DeleteConfirmationModal
                  id={item.id}
                  queryName={QueryName.platform}
                  route={apiPaths.platform}
                  successMessage={'Funcionalidade deletada com sucesso'}
                  text={'Tem certeza que deseja deletar essa funcinalidade'}
                  title={'Deletar funcinalidade'}
                />
              </div>
            }
          />
        </TableRow>
      ))}
    </TableBody>
  );
};
