import { type FC, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ListItemButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { logout } from 'store/persist/slice';
import { paths } from 'main/config';
import { useDispatch } from 'react-redux';

export const MainTemplate: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [headerIsBig, setHeaderIsBig] = useState(true);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > 100) setHeaderIsBig(false);
      else setHeaderIsBig(true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerIsBig]);

  const dispatch = useDispatch();

  return (
    <div className={'flex flex-col w-full h-full min-h-dvh bg-gray-900'} id={'main'}>
      <div className={'flex flex-col items-end p-4'}>
        <Link className={'bg-gray-700 text-white rounded-md'} to={paths.login}>
          <ListItemButton
            className={'border-t-2 gap-2'}
            onClick={(): void => {
              dispatch(logout());
            }}
          >
            <Logout
              sx={{
                fontSize: '16px'
              }}
            />
            Sair
          </ListItemButton>
        </Link>
      </div>

      <main
        className={'flex flex-col p-2 h-full'}
        style={{
          marginBottom: '46px',
          marginTop: headerIsBig ? '94px' : '80px',
          transition: 'all 200ms'
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
