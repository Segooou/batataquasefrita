import { LaptopSidebar } from './laptop';
import { MobileSidebar } from './mobile';
import { dimensions } from 'main/config';
import { useWindowDimensions } from 'data/hooks';
import type { FC } from 'react';

interface SidebarProps {
  headerIsBig: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ headerIsBig }) => {
  const { width } = useWindowDimensions();

  if (width > dimensions.laptop) return <LaptopSidebar headerIsBig={headerIsBig} />;

  return <MobileSidebar />;
};
