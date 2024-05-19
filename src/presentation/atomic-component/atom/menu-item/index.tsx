import { ListItemButton } from '@mui/material';
import type { FC, MouseEvent, ReactElement } from 'react';

interface MenuItemProps {
  icon: ReactElement;
  title: string;
  onClick?: (event: MouseEvent) => Promise<void> | void;
}

export const MenuItem: FC<MenuItemProps> = ({ icon, title, onClick }) => (
  <ListItemButton
    onClick={onClick}
    sx={{
      gap: '8px'
    }}
  >
    {icon}
    <span>{title}</span>
  </ListItemButton>
);
