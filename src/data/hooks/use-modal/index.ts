import { useState } from 'react';

export const useModal = (): {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    document.body.scrollTop = 0;
    setIsOpen(false);
  };

  return { closeModal, isOpen, openModal };
};
