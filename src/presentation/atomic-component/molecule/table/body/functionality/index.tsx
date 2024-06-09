import { BodyCell } from 'presentation/atomic-component/atom';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { Link } from 'react-router-dom';
import { OpenInNew } from '@mui/icons-material';
import { QueryName, apiPaths, paths } from 'main/config';
import { TableBody, TableRow } from '@mui/material';
import { setCanvasImage } from 'store/canvas-image/slice';
import { useDispatch } from 'react-redux';
import type { FC } from 'react';
import type { Functionality } from 'domain/models';

interface FunctionalityTableBodyProps {
  items: Functionality[];
}

export const FunctionalityTableBody: FC<FunctionalityTableBodyProps> = ({ items }) => {
  const dispatch = useDispatch();

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
          <BodyCell align={'center'} title={item.platform.name} />
          <BodyCell align={'center'} title={`${item?._count?.actions}`} />
          <BodyCell align={'center'} title={item.active ?? false ? 'Sim' : 'Não'} />
          <BodyCell align={'center'} title={item.apiRoute} />

          <BodyCell
            align={'center'}
            title={
              <div className={'flex justify-center gap-3'}>
                {/* <FunctionalityModal functionality={item} /> */}

                <DeleteConfirmationModal
                  id={item.id}
                  queryName={QueryName.functionality}
                  route={apiPaths.functionality}
                  successMessage={'Funcionalidade deletada com sucesso'}
                  text={'Tem certeza que deseja deletar essa funcinalidade'}
                  title={'Deletar funcinalidade'}
                />

                <Link to={paths.functionalityTest(item.keyword)}>
                  <div
                    className={
                      'bg-gray-700 hover:bg-gray-550 border border-gray-500 rounded-md p-2 cursor-pointer'
                    }
                    onClick={(): void => {
                      dispatch(setCanvasImage({ inputOnImage: [], itemSelected: null, url: null }));
                    }}
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
