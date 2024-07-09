import { Add, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { UserFrom } from 'presentation/atomic-component/molecule/form/user';
import { useFindFunctionalityQuery } from 'infra/cache';
import { useModal } from 'data/hooks';
import type { FC } from 'react';
import type { UserProps } from 'domain/models';

interface UserModalProps {
  user?: UserProps;
}

export const UserModal: FC<UserModalProps> = ({ user }) => {
  const { closeModal, isOpen, openModal } = useModal();

  const functionalityQuery = useFindFunctionalityQuery({
    id: 'resume'
  });

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        user ? (
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
            Adicionar usuário
          </Button>
        )
      }
      size={user ? 'medium' : 'small'}
      title={`${user ? 'Ediçao' : 'Cadastro'} de usuário`}
    >
      {functionalityQuery.data ? (
        <UserFrom
          closeModal={closeModal}
          functionality={functionalityQuery.data?.content ?? []}
          user={user}
        />
      ) : null}
    </Modal>
  );
};
