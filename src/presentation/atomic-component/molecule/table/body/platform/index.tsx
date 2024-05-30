import { BodyCell, IconRender } from 'presentation/atomic-component/atom';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { Link } from 'react-router-dom';
import { OpenInNew } from '@mui/icons-material';
import { PlatformModal } from 'presentation/atomic-component/molecule/modal/platform';
import { QueryName, apiPaths, paths } from 'main/config';
import { TableBody, TableRow } from '@mui/material';
import type { FC } from 'react';
import type { Platform } from 'domain/models';

interface PlatformTableBodyProps {
  items: Platform[];
}

export const PlatformTableBody: FC<PlatformTableBodyProps> = ({ items }) => {
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
              <IconRender
                name={item.image}
                sx={{
                  fontSize: '1.65rem'
                }}
              />
            }
          />

          <BodyCell align={'center'} title={item.name} />
          <BodyCell align={'center'} title={item._count.functionalities} />

          <BodyCell
            align={'center'}
            title={
              <div className={'flex justify-center gap-3'}>
                <PlatformModal platform={item} />

                <DeleteConfirmationModal
                  id={item.id}
                  queryName={QueryName.platform}
                  route={apiPaths.platform}
                  successMessage={'Plataforma deletada com sucesso'}
                  text={'Tem certeza que deseja deletar essa plataforma'}
                  title={'Deletar plataforma'}
                />

                <Link to={paths.platform(item.keyword)}>
                  <div
                    className={
                      'bg-gray-700 hover:bg-gray-550 border border-gray-500 rounded-md p-2 cursor-pointer'
                    }
                  >
                    <OpenInNew />
                  </div>
                </Link>
              </div>
            }
          />
        </TableRow>
      ))}
    </TableBody>
  );
};
