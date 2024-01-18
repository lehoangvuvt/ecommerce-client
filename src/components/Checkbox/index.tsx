"use client";

import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";

const Container = styled.label<{ $width: number; $height: number }>`
  width: ${(props) => `${props.$width}px`};
  height: ${(props) => `${props.$height}px`};
  cursor: pointer;
  background-color: white;
  border-radius: 3px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => `${props.$width * 1}px`};
  position: relative;
  overflow: hidden;

  &.checked {
    color: white;
    background-color: red;
  }

  &.unchecked {
    color: rgba(255, 255, 255, 1);
  }
`;

type Props = {
  width?: number;
  height?: number;
  checked: boolean;
  onChange: () => void;
};

const Checkbox: React.FC<Props> = ({
  onChange,
  width = 16,
  height = 16,
  checked = false,
}) => {
  return (
    <Container
      className={checked ? "checked" : "unchecked"}
      onClick={() => {
        onChange();
      }}
      $width={width}
      $height={height}
    >
      {checked && (
        <CheckIcon color="inherit" fontSize="inherit" style={{ zIndex: 1 }} />
      )}
    </Container>
  );
};

export default Checkbox;
