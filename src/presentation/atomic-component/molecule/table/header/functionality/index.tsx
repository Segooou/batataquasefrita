import { HeaderCell } from 'presentation/atomic-component/atom';
import { TableHead, TableRow } from '@mui/material';
import type { FC } from 'react';

export const FunctionalityTableHeader: FC = () => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell align={'center'} minWidth={200} title={'Nome'} />
        <HeaderCell align={'center'} minWidth={100} title={'Plataforma'} />
        <HeaderCell align={'center'} minWidth={100} title={'Total de usos'} />
        <HeaderCell align={'center'} minWidth={100} title={'Ativo'} />
        <HeaderCell align={'center'} minWidth={300} title={'Rota da API'} />
        <HeaderCell align={'center'} minWidth={100} title={'Ações'} />
      </TableRow>
    </TableHead>
  );
};
