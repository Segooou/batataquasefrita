import { HeaderCell } from 'presentation/atomic-component/atom';
import { TableHead, TableRow } from '@mui/material';
import type { FC } from 'react';

export const ActionTableHeader: FC = () => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell align={'center'} title={'Plataforma'} width={'20%'} />
        <HeaderCell align={'center'} title={'Funcionalidade'} width={'25%'} />
        <HeaderCell align={'center'} title={'Dados Enviados'} width={'25%'} />
        <HeaderCell align={'center'} title={'Resultado'} width={'30%'} />
      </TableRow>
    </TableHead>
  );
};
