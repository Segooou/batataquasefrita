import { Add, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DefaultFunctionalityForm } from 'presentation/atomic-component/molecule/form';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useModal } from 'data/hooks';
import type { FC } from 'react';
import type { Functionality } from 'domain/models';

interface FunctionalityModalProps {
  functionality?: Functionality;
}

export const FunctionalityModal: FC<FunctionalityModalProps> = ({ functionality }) => {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        functionality ? (
          <div
            className={
              'bg-gray-700 hover:bg-gray-550 border border-gray-500 rounded-md p-2 cursor-pointer'
            }
            onClick={openModal}
          >
            <Edit />
          </div>
        ) : (
          <Button
            className={'w-full tablet:max-w-[315px]'}
            color={'secondary'}
            onClick={(): void => openModal()}
            startIcon={<Add />}
          >
            Adicionar funcionalidade
          </Button>
        )
      }
      size={'medium'}
      title={`${functionality ? 'Ediçao' : 'Cadastro'} de nova funcionalidade`}
    >
      <DefaultFunctionalityForm closeModal={closeModal} functionality={functionality} isModal />
    </Modal>
  );
};
