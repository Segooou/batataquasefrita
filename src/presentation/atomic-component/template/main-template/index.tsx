import { type FC, useEffect } from 'react';
import { Header, Sidebar } from 'presentation/atomic-component/organism';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store';

export const MainTemplate: FC = () => {
  const { pathname } = useLocation();

  const { open } = useAppSelector((state) => state.sidebar);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const headerIsBig = true;

  return (
    <div className={'flex flex-col max-w-[100dvw] h-full min-h-dvh bg-black'} id={'main'}>
      <Header headerIsBig={headerIsBig} />

      <main
        className={'flex max-w-[100vw]'}
        style={{
          marginTop: headerIsBig ? '94px' : '65px',
          transition: 'all 200ms'
        }}
      >
        <Sidebar headerIsBig={headerIsBig} />

        <div
          className={`flex flex-col overflow-auto w-full h-full text-white p-4 laptop:p-8 ${open ? 'laptop:ml-[280px]' : 'laptop:ml-[65px]'}`}
          style={{
            transition: 'all 200ms'
          }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};
