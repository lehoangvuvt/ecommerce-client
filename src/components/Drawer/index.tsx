"use client";

import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

const MobileModal = styled.div<{
  $position: "bottom" | "top" | "left" | "right";
}>`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0%;
  z-index: 100;
  display: flex;
  justify-content: ${(props) =>
    props.$position === "left"
      ? "flex-start"
      : props.$position === "right"
      ? "flex-end"
      : "center"};
  background-color: rgba(0, 0, 0, 0.5);
  align-items: ${(props) =>
    props.$position === "top"
      ? "flex-start"
      : props.$position === "bottom"
      ? "flex-end"
      : "center"};
  /* backdrop-filter: blur(1px); */
  &.open {
    opacity: 1;
    pointer-events: all;
  }
  &.close {
    transition: opacity 0s 0.4s;
    opacity: 0;
    pointer-events: none;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    font-size: 22px;
    height: 100%;
    aspect-ratio: 1;
  }
`;

const ChildrenContainer = styled.div<{ $withHeader: boolean }>`
  width: 100%;
  height: ${(props) => (props.$withHeader ? "calc(100% - 45px)" : "100%")};
`;

const ContainerMobile = styled.div<{ $width: string; $height: string }>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s ease;
  transform: translateY(50%);
  &.open-top {
    border-radius: 0px 0px 5px 5px;
    transform: translateY(0%);
  }
  &.close-top {
    border-radius: 0px 0px 5px 5px;
    transform: translateY(-100%);
  }
  &.open-bottom {
    border-radius: 5px 5px 0px 0px;
    transform: translateY(0%);
  }
  &.close-bottom {
    border-radius: 5px 5px 0px 0px;
    transform: translateY(100%);
  }
  &.open-left {
    border-radius: 0px 5px 5px 0px;
    transform: translateX(0%);
  }
  &.close-left {
    border-radius: 0px 5px 5px 0px;
    transform: translateX(-100%);
  }
  &.open-right {
    border-radius: 5px 0px 0px 5px;
    transform: translateX(0%);
  }
  &.close-right {
    border-radius: 5px 0px 0px 5px;
    transform: translateX(100%);
  }
`;

type Props = {
  position?: "bottom" | "top" | "left" | "right";
  height?: string;
  width?: string;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  containerStyle?: React.CSSProperties;
  childrenContainerStyle?: React.CSSProperties;
  withHeader?: boolean;
};

const Drawer: React.FC<Props> = ({
  isOpen,
  closeModal,
  children,
  position = "bottom",
  height = "70%",
  width = "100%",
  containerStyle,
  childrenContainerStyle,
  withHeader = true,
}) => {
  return (
    <MobileModal
      $position={position}
      className={isOpen ? "open" : "close"}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <ContainerMobile
        style={containerStyle}
        $height={height}
        $width={width}
        className={isOpen ? `open-${position}` : `close-${position}`}
      >
        {withHeader && (
          <Header>
            <button onClick={() => closeModal()}>
              <CloseIcon color="inherit" fontSize="inherit" />
            </button>
          </Header>
        )}
        <ChildrenContainer
          $withHeader={withHeader}
          style={childrenContainerStyle}
        >
          {children}
        </ChildrenContainer>
      </ContainerMobile>
    </MobileModal>
  );
};

export default Drawer;
