import { Menu as MenuUI } from '@mui/material';
import { useEffect, useState } from 'react';
import type { Dispatch, FC, MouseEvent, ReactNode, SetStateAction } from 'react';

interface HeadingProps {
  openElement?: ReactNode;
  children?: ReactNode;
  hasIcon?: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  number?: number;
  isDown?: boolean;
}

export const Menu: FC<HeadingProps> = ({
  openElement,
  children,
  hasIcon,
  isOpen,
  setIsOpen,
  number,
  isDown
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!isOpen) setAnchorEl(null);
  }, [isOpen]);

  return (
    <>
      <span
        aria-controls={open ? 'menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup={'true'}
        onClick={handleClick}
      >
        {openElement}
      </span>

      <MenuUI
        PaperProps={{
          elevation: 0,
          sx: hasIcon
            ? {
                backgroundColor: 'transparent',
                ml: 3,
                mt: 0,
                overflow: 'visible'
              }
            : {
                backgroundColor: 'transparent'
              }
        }}
        anchorEl={anchorEl}
        anchorOrigin={
          isDown
            ? { horizontal: 'center', vertical: 'bottom' }
            : { horizontal: 'right', vertical: 'top' }
        }
        id={'menu'}
        onClose={handleClose}
        open={open}
        transformOrigin={
          isDown
            ? { horizontal: 'center', vertical: 'top' }
            : { horizontal: 'left', vertical: 'top' }
        }
      >
        {hasIcon ? (
          <div
            className={`absolute top-2 -ml-5 border-secondary border-t-[0px] border-t-transparent border-r-[25px] left-0 border-b-[25px] border-b-transparent ${
              number === 7 ? 'top-[80px]' : ''
            } ${number === 8 ? 'top-[200px]' : ''}`}
          />
        ) : null}

        {children}
      </MenuUI>
    </>
  );
};
