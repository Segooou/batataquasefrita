import { AccessibleForward, Home } from '@mui/icons-material';
import { paths } from 'main/config';

export const SidebarItems = [
  {
    icon: Home,
    link: paths.home,
    name: 'Home'
  },
  {
    icon: AccessibleForward,
    link: paths.stake,
    name: 'STAKE'
  }
];
