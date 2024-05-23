import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { PlatformForm } from 'presentation/atomic-component/molecule/form/platform';
import { useModal } from 'data/hooks';
import type { FC } from 'react';
import type { Platform } from 'domain/models';

interface PlatformModalProps {
  platform?: Platform;
}

export const PlatformModal: FC<PlatformModalProps> = ({ platform }) => {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        platform ? (
          <IconButton
            onClick={openModal}
            sx={{
              ':hover': {
                backgroundColor: '#2b5f9e6a'
              },
              backgroundColor: '#1D427338',
              color: '#1D4273',
              height: '38px',
              width: '38px'
            }}
          >
            <Edit />
          </IconButton>
        ) : (
          <Button
            className={'w-full tablet:w-[270px] h-[50px]'}
            onClick={(): void => openModal()}
            startIcon={<Add />}
          >
            nova plataforma
          </Button>
        )
      }
      size={'small'}
      title={`${platform ? 'Ediçao' : 'Cadastro'} de plataforma`}
    >
      <PlatformForm closeModal={closeModal} platform={platform} />
    </Modal>
  );
};
