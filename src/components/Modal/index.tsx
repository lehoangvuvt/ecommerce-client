"use client";

import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
`;

type Props = {
  content: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  closeAfterSeconds?: number;
};

const Modal: React.FC<Props> = ({
  content,
  isOpen,
  closeModal,
  closeAfterSeconds = 0,
}) => {
  useEffect(() => {
    if (isOpen && closeAfterSeconds > 0) {
      setTimeout(() => closeModal(), closeAfterSeconds * 1000);
    }
  }, [isOpen, closeAfterSeconds]);

  if (isOpen)
    return (
      <Container onClick={(e) => e.target === e.currentTarget && closeModal()}>
        {content}
      </Container>
    );
  return null;
};

export default Modal;
