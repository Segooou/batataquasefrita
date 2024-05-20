import { type FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const AuthTemplate: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className={'flex flex-col justify-center min-h-dvh w-full bg-black'}>
      <Outlet />
    </main>
  );
};
