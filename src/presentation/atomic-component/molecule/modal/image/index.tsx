import { Avatar } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useModal } from 'data/hooks';
import type { FC } from 'react';

interface ImageModalProps {
  url?: string | null;
  name?: string;
  small?: boolean;
}

export const ImageModal: FC<ImageModalProps> = ({ url, name, small }) => {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <Modal
      closeModal={closeModal}
      hideBackground
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        <Avatar
          className={url ? 'cursor-pointer' : ''}
          onClick={url ? openModal : undefined}
          src={url ?? ''}
          sx={
            small
              ? undefined
              : {
                  height: '50px',
                  width: '50px'
                }
          }
        >
          {name?.slice(0, 1)?.toUpperCase()}
        </Avatar>
      }
      size={'medium'}
    >
      <img alt={''} className={'bg-gray-800 max-h-[80vh]'} src={url ?? ''} />
    </Modal>
  );
};
