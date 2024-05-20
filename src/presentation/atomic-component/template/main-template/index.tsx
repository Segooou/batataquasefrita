import { type FC, useEffect, useState } from 'react';
import { Header, Sidebar } from 'presentation/atomic-component/organism';
import { Outlet, useLocation } from 'react-router-dom';

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

        <div className={'flex flex-col overflow-auto w-full h-full text-white p-8'}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
