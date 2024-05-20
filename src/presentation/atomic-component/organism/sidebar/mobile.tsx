import { IconButton, Slide } from '@mui/material';
import { SidebarItems } from 'main/mock';
import { setSidebar } from 'store/sidebar/slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePath } from 'data/hooks';
import { useSidebar } from 'store/sidebar/selector';
import type { FC } from 'react';

export const MobileSidebar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebar = useSidebar();
  const { firstPathname } = usePath();

  return (
    <Slide
      direction={'right'}
      in={sidebar}
      style={{
        overflow: 'auto'
      }}
    >
      <div
        className={
          'fixed z-40 border-t border-gray-700 bg-gray-800 w-full h-[calc(100dvh)] mt-[-1px] text-white'
        }
      >
        <div
          className={
            'fixed z-40 bg-gray-800 dark:border-0 py-5 px-2 h-[calc(88vh-90px)] dark:bg-gray-800 flex flex-col gap-[10px] justify-between w-full overflow-auto'
          }
        >
          <div className={`fixed z-5 w-full left-0 bg-gray-800 ${sidebar ? 'flex' : 'hidden'}`} />

          <div className={'flex flex-col gap-[10px] overflow-auto'}>
            {SidebarItems.map((sidebarItem) => (
              <div
                key={sidebarItem.link}
                className={'px-3 cursor-pointer'}
                onClick={(): void => {
                  navigate(sidebarItem.link);
                  dispatch(setSidebar(false));
                }}
                title={sidebarItem.name}
              >
                <div
                  className={`flex gap-4 items-center rounded-md ml-[-5px] pl-[5px] h-[40px] ${
                    sidebarItem.link === firstPathname ? 'bg-gray-700 text-white' : ''
                  }`}
                >
                  <IconButton
                    color={'inherit'}
                    sx={{
                      padding: '1px'
                    }}
                  >
                    <sidebarItem.icon
                      color={'inherit'}
                      sx={{
                        fontSize: '1.95rem'
                      }}
                    />
                  </IconButton>

                  <span
                    className={`h-[1.5rem] font-semibold overflow-hidden cursor-pointer ${
                      sidebarItem.link === firstPathname ? 'text-white' : 'text-white'
                    }`}
                  >
                    {sidebarItem.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};