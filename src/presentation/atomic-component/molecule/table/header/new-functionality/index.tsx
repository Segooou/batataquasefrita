import { HeaderCell } from 'presentation/atomic-component/atom';
import { TableHead, TableRow } from '@mui/material';
import type { FC } from 'react';

export const NewFunctionalityTableHeader: FC = () => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell align={'center'} minWidth={200} title={'Nome'} />
        <HeaderCell align={'center'} minWidth={300} title={'Descrição'} />
        <HeaderCell align={'center'} minWidth={100} title={'Plataforma'} />
        <HeaderCell align={'center'} minWidth={100} title={'Já foi criada'} />
        <HeaderCell align={'center'} minWidth={100} title={'Solicitante'} />
        <HeaderCell align={'center'} minWidth={100} title={'Ações'} />
      </TableRow>
    </TableHead>
  );
};
