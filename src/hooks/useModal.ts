import { useState } from "react";

const useModal = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [closeAfterSeconds, setCloseAfterSeconds] = useState(0);

  const showModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const setModalContent = (content: React.ReactNode) => {
    setContent(content);
  };

  return {
    isOpenModal,
    content,
    closeAfterSeconds,
    closeModal,
    showModal,
    setModalContent,
    setCloseAfterSeconds,
  };
};

export default useModal;
