import { Close, Menu } from '@mui/icons-material';
import { ListItemButton } from '@mui/material';
import { setSidebar } from 'store/sidebar/slice';
import { useDispatch } from 'react-redux';
import { useSidebar } from 'store/sidebar/selector';
import type { FC } from 'react';

export const ToggleMenu: FC = () => {
  const dispatch = useDispatch();
  const sidebar = useSidebar();

  return (
    <div className={'border rounded-md bg-gray-700 text-white'}>
      <ListItemButton
        onClick={(): void => {
          dispatch(setSidebar(!sidebar));
        }}
        sx={{
          padding: '8px'
        }}
      >
        {sidebar ? <Close /> : <Menu />}
      </ListItemButton>
    </div>
  );
};
