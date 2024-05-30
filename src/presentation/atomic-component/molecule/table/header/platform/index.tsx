import { HeaderCell } from 'presentation/atomic-component/atom';
import { TableHead, TableRow } from '@mui/material';
import type { FC } from 'react';

export const PlatformTableHeader: FC = () => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell align={'center'} minWidth={100} title={'Ícone'} />
        <HeaderCell align={'center'} minWidth={100} title={'Nome'} />
        <HeaderCell align={'center'} minWidth={100} title={'Total de funcionalidades'} />
        <HeaderCell align={'center'} minWidth={100} title={'Ações'} />
      </TableRow>
    </TableHead>
  );
};
