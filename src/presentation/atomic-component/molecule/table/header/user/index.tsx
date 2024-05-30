import { HeaderCell } from 'presentation/atomic-component/atom';
import { TableHead, TableRow } from '@mui/material';
import type { FC } from 'react';

export const UserTableHeader: FC = () => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell align={'center'} minWidth={100} title={'Avatar'} />
        <HeaderCell align={'center'} minWidth={100} title={'Nome'} />
        <HeaderCell align={'center'} minWidth={100} title={'Total de uso'} />
        <HeaderCell align={'center'} minWidth={100} title={'Ações'} />
      </TableRow>
    </TableHead>
  );
};
