import { TableCell } from '@mui/material';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { TableCellProps } from '@mui/material';

interface BodyCellProps extends Pick<TableCellProps, 'sx'> {
  title: ReactNode | number | string;
  className?: string;
  link?: {
    path: string;
    navigate: NavigateFunction;
  };
  lastRow?: boolean;
  colSpan?: number;
  align?: 'center' | 'left' | 'right';
  onClick?: () => void;
}

export const BodyCell: FC<BodyCellProps> = ({
  title,
  onClick,
  className,
  link,
  lastRow,
  colSpan,
  sx,
  align
}) => (
  <TableCell
    align={align ?? 'left'}
    colSpan={colSpan}
    component={'th'}
    onClick={onClick}
    onMouseDown={(event): void => {
      if (link) {
        event.preventDefault();

        if (event.ctrlKey || event.button === 1) {
          const win = window.open(link.path, '_blank');

          win?.focus();
        } else link.navigate(link.path);
      }
    }}
    scope={'row'}
    sx={{
      borderColor: lastRow ? 'transparent' : colors.gray[200],
      color: 'white',
      padding: '10px 6px',
      ...sx
    }}
    title={typeof title === 'string' ? title : undefined}
    variant={'body'}
  >
    <span className={className}>{title}</span>
  </TableCell>
);
