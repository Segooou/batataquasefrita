import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useModal } from 'data/hooks';
import type { FC } from 'react';

interface KeywordModalProps {
  keyword?: { is: string };
}

export const KeywordModal: FC<KeywordModalProps> = ({ keyword }) => {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        keyword ? (
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
            className={'w-full tablet:max-w-[225px]'}
            color={'secondary'}
            onClick={(): void => openModal()}
            startIcon={<Add />}
          >
            NOVO CADASTRO
          </Button>
        )
      }
      size={'medium'}
      title={`${keyword ? 'EDIÇÃO' : 'CADASTRO'} DE PALAVRAS-CHAVES`}
    >
      <div>form</div>
    </Modal>
  );
};
