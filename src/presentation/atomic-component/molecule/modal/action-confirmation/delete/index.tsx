import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useDelete } from 'data/use-case';
import { useModal } from 'data/hooks';
import type { FC, ReactNode } from 'react';

interface DeleteConfirmationModalProps {
  text: ReactNode | string;
  title: string;
  id: number | string;
  route: unknown;
  queryName: string;
  successMessage: string;
  onClose?: () => void;
  openElement?: ReactNode;
  isPatch?: boolean;
}

export const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  text,
  id,
  title,
  route,
  onClose,
  queryName,
  successMessage,
  openElement,
  isPatch
}) => {
  const { closeModal: close, openModal, isOpen } = useModal();

  const closeModal = (): void => {
    close();
    if (onClose) onClose();
  };

  const { handleDelete } = useDelete({
    closeModal,
    id,
    isPatch,
    queryName,
    route,
    successMessage
  });

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        openElement ? (
          <div className={'flex flex-col'} onClick={openModal}>
            {openElement}
          </div>
        ) : (
          <div
            className={
              'bg-gray-700 hover:bg-gray-550 border border-gray-500 rounded-md p-2 cursor-pointer'
            }
            onClick={openModal}
          >
            <Delete />
          </div>
        )
      }
      size={'small'}
      title={title}
    >
      <div
        className={'w-full h-full flex justify-center items-center flex-col p-4 gap-8 text-white'}
      >
        <span className={'text-center'}>{text}</span>

        <div className={'flex flex-row gap-4  justify-between items-center'}>
          <Button autoFocus onClick={handleDelete}>
            Apagar
          </Button>

          <Button color={'error'} onClick={closeModal}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
