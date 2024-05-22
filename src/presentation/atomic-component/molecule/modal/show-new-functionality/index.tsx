import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';
import type { NewFunctionality } from 'domain/models';
import type { useModalProps } from 'data/hooks';

interface ShowNewFunctionalityModalProps {
  newFunctionality: NewFunctionality;
  modal: useModalProps;
}

export const ShowNewFunctionalityModal: FC<ShowNewFunctionalityModalProps> = ({
  newFunctionality,
  modal
}) => {
  const { closeModal, isOpen, openModal } = modal;

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'medium'}
      title={'Nova Funcionalidade'}
    >
      <div className={'flex flex-col gap-4 text-white mt-4'}>
        <div className={'flex gap-2'}>
          <span className={'font-semibold'}>Nome:</span>
          <span>{newFunctionality.name}</span>
        </div>

        <div className={'flex gap-2'}>
          <span className={'font-semibold'}>Plataforma:</span>
          <span>{newFunctionality.platform.name}</span>
        </div>

        <div className={'flex gap-2'}>
          <span className={'font-semibold'}>Já foi criada no sistema:</span>
          <span>{newFunctionality.wasRaised ? 'Sim' : 'Não'}</span>
        </div>

        <div className={'flex flex-col gap-2'}>
          <span className={'font-semibold'}>Descrição:</span>
          <span>{newFunctionality.description}</span>
        </div>
      </div>
    </Modal>
  );
};
