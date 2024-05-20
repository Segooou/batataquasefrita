import { type FC, useRef } from 'react';
import { SidebarItems } from 'main/mock';
import { useAppSelector } from 'store';
import { useNavigate } from 'react-router-dom';
import { usePath } from 'data/hooks';

interface LaptopSidebarProps {
  headerIsBig: boolean;
}

export const LaptopSidebar: FC<LaptopSidebarProps> = ({ headerIsBig }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { open } = useAppSelector((state) => state.sidebar);
  const { firstPathname } = usePath();

  return (
    <div
      className={`flex flex-col bg-gray-800 justify-between gap-3 h-max fixed border-r-2 border-gray-700 py-4 transition-[width] ease-in-out delay-200 ${
        open ? 'w-[280px]' : 'w-[65px]'
      } ${headerIsBig ? 'min-h-[calc(100dvh-94px)]' : 'min-h-[calc(100dvh-65px)]'}`}
      ref={containerRef}
    >
      <div className={'flex flex-col justify-between gap-3 h-full'}>
        <div className={'flex flex-col gap-3'}>
          {SidebarItems.map((sidebarItem) => (
            <div
              key={sidebarItem.link}
              className={'px-3 cursor-pointer'}
              onClick={(): void => {
                navigate(sidebarItem.link);
              }}
              title={sidebarItem.name}
            >
              <div
                className={`flex gap-4 items-center rounded-md ml-[-5px] pl-[5px] h-[40px] transition-[width] ease-in delay-75 ${
                  open ? 'w-full ' : 'w-[38px]'
                } ${sidebarItem.link === firstPathname ? 'bg-gray-700 text-white' : 'text-white hover:bg-[#4e4e4e67]'}`}
              >
                <sidebarItem.icon
                  color={'inherit'}
                  sx={{
                    fontSize: '1.65rem'
                  }}
                />

                <span
                  className={`h-[1.5rem] font-semibold transition-[width] ease-in-out delay-200 overflow-hidden cursor-pointer ${
                    open ? 'w-[200px]' : 'w-[0px]'
                  } ${sidebarItem.link === firstPathname ? 'text-white' : 'text-white'}`}
                >
                  {sidebarItem.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
