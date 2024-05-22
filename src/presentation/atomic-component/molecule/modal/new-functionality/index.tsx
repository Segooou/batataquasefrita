import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { NewFunctionalityForm } from 'presentation/atomic-component/molecule/form';
import { useModal } from 'data/hooks';
import type { FC } from 'react';
import type { NewFunctionality } from 'domain/models';

interface NewFunctionalityModalProps {
  newFunctionality?: NewFunctionality;
}

export const NewFunctionalityModal: FC<NewFunctionalityModalProps> = ({ newFunctionality }) => {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        newFunctionality ? (
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
            className={'w-full tablet:max-w-[315px]'}
            color={'secondary'}
            onClick={(): void => openModal()}
            startIcon={<Add />}
          >
            Solicitar nova funcionalidade
          </Button>
        )
      }
      size={'medium'}
      title={`${newFunctionality ? 'Ediçao' : 'Cadastro'} de nova funcionalidade`}
    >
      <NewFunctionalityForm closeModal={closeModal} newFunctionality={newFunctionality} />
    </Modal>
  );
};
