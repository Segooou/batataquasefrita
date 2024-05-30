import { Add, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
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
          <div
            className={
              'bg-gray-700 hover:bg-gray-550 border border-gray-500 rounded-md p-2 cursor-pointer'
            }
            onClick={openModal}
          >
            <Edit />
          </div>
        ) : (
          <Button onClick={(): void => openModal()} startIcon={<Add />}>
            Adicionar plataforma
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
