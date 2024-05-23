import { HeaderCell } from 'presentation/atomic-component/atom';
import { TableHead, TableRow } from '@mui/material';
import type { FC } from 'react';

export const ActionTableHeader: FC = () => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell align={'center'} minWidth={100} title={'Plataforma'} />
        <HeaderCell align={'center'} minWidth={300} title={'Funcionalidade'} />
        <HeaderCell align={'center'} minWidth={300} title={'Dados Enviados'} />
        <HeaderCell align={'center'} minWidth={300} title={'Resultado'} />
      </TableRow>
    </TableHead>
  );
};
