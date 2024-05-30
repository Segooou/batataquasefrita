import { BodyCell, InputToCopy } from 'presentation/atomic-component/atom';
import { TableBody, TableRow } from '@mui/material';
import type { Action } from 'domain/models';
import type { FC } from 'react';

interface ActionTableProps {
  items: Action[];
}

export const ActionTableBody: FC<ActionTableProps> = ({ items }) => {
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
          <BodyCell align={'center'} title={item.functionality.platform.name} />
          <BodyCell align={'center'} title={item.functionality.name} />

          <BodyCell
            align={'center'}
            title={
              <div className={'flex flex-col items-start'}>
                {Object.entries(item.data ?? {}).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))}
              </div>
            }
          />

          <BodyCell
            align={'center'}
            title={
              <div className={'flex flex-col gap-3'}>
                {item.result.map((value) => (
                  <div key={value} className={'flex gap-4'}>
                    <InputToCopy value={value} />
                  </div>
                ))}
              </div>
            }
          />
        </TableRow>
      ))}
    </TableBody>
  );
};
