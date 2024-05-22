import { Box, Button, IconButton, Modal as ModalUI } from '@mui/material';
import { Close } from '@mui/icons-material';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';
import type { OverridableComponent } from '@mui/types';
import type { SvgIconTypeMap } from '@mui/material';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  button?: {
    title?: string;
    StartIcon?: OverridableComponent<SvgIconTypeMap>;
    EndIcon?: OverridableComponent<SvgIconTypeMap>;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
  };
  title?: string;
  openModalElement?: ReactNode;
  size?: string | 'full' | 'large' | 'medium' | 'small';
  disableBackdrop?: boolean;
  hideBackground?: boolean;
}

const sizes = {
  large: 1125,
  medium: 840,
  small: 540
};

export const getWidth = (
  size?: string | 'full' | 'large' | 'medium' | 'small'
): number | string => {
  switch (size) {
    case 'large':
      return sizes.large;
    case 'medium':
      return sizes.medium;
    case 'small':
      return sizes.small;
    case 'full':
      return 'max-content';
    default:
      if (size) return size;
      return 'max-content';
  }
};

export const Modal: FC<ModalProps> = ({ children, openModal, closeModal, ...props }) => {
  return (
    <>
      {props.button ? (
        <Button
          disabled={props.button.disabled}
          endIcon={props.button.EndIcon ? <props.button.EndIcon /> : null}
          onClick={openModal}
          startIcon={props.button.StartIcon ? <props.button.StartIcon /> : null}
          variant={props.button.variant}
        >
          {props.button.title}
        </Button>
      ) : (
        props.openModalElement
      )}

      <ModalUI
        disableEscapeKeyDown={props.disableBackdrop}
        disableRestoreFocus
        hideBackdrop={props.disableBackdrop}
        onClose={closeModal}
        open={props.isOpen}
      >
        <div>
          {props.disableBackdrop ? (
            <div
              className={'absolute overflow-hidden top-0 left-0 w-full h-screen bg-[#0000007f]'}
            />
          ) : null}

          <Box
            className={
              'w-full tablet:w-auto max-h-[90%] tablet:max-h-[95%] rounded-md flex flex-col gap-4 left-[50%] top-[50%] absolute translate-y-[-50%] translate-x-[-50%] max-w-[94%] laptop:max-w-[98%] overflow-auto'
            }
            sx={{
              backgroundColor: props.hideBackground ? 'transparent' : colors.gray[800],
              padding: props.hideBackground ? '0px' : '24px',
              width: getWidth(props.size)
            }}
          >
            {props.title ? (
              <div className={'flex flex-col'}>
                <div className={'flex justify-end'}>
                  <IconButton onClick={closeModal}>
                    <Close className={'text-white'} />
                  </IconButton>
                </div>

                {typeof props.title === 'string' ? (
                  <h2 className={'font-extrabold text-lg text-center text-white'}>{props.title}</h2>
                ) : (
                  props.title
                )}
              </div>
            ) : null}

            {children}
          </Box>
        </div>
      </ModalUI>
    </>
  );
};

Modal.defaultProps = {
  size: 'medium'
};
