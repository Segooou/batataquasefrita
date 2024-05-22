/* eslint-disable import/namespace */
import * as MaterialIcons from '@mui/icons-material';
import type { FC } from 'react';
import type { SxProps } from '@mui/material';

interface IconRenderProps {
  name: string;
  sx?: SxProps;
}

export const IconRender: FC<IconRenderProps> = ({ name, sx }) => {
  const IconComponent = MaterialIcons[name as keyof typeof MaterialIcons];

  if (!IconComponent) return null;

  return <IconComponent color={'inherit'} sx={sx} />;
};
