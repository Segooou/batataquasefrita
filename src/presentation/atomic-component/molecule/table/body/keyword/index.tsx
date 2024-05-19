import { BodyCell } from 'presentation/atomic-component/atom';
import { TableBody, TableRow } from '@mui/material';
import type { FC } from 'react';

interface KeywordTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: {
    content: { id: string }[];
  };
}

export const KeywordTableBody: FC<KeywordTableProps> = ({ query }) => {
  return (
    <TableBody className={'relative'}>
      {query?.content?.map((item) => (
        <TableRow key={item.id} hover>
          <BodyCell title={item.id} />
        </TableRow>
      ))}
    </TableBody>
  );
};
