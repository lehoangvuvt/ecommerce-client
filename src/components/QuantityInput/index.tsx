"use client";

import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const BaseChild = styled.div`
  height: 100%;
`;

const LeftRight = styled(BaseChild)`
  width: 30%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
`;

const Center = styled(BaseChild)`
  width: 40%;
  input {
    width: 100%;
    height: 100%;
    text-align: center;
    color: rgba(0, 0, 0, 0.8);
    user-select: none;
    outline: none;
    border:none;
  }
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

type Props = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
};

const QuantityInput: React.FC<Props> = ({
  quantity,
  style,
  onIncrease,
  onDecrease,
  onChange,
}) => {
  return (
    <Container style={style}>
      <LeftRight onClick={() => onDecrease()}>
        <RemoveIcon color="inherit" fontSize="inherit" />
      </LeftRight>
      <Center>
        <input
          type="text"
          value={quantity}
          onChange={(e) => onChange(e.target.value)}
        />
      </Center>
      <LeftRight onClick={() => onIncrease()}>
        <AddIcon color="inherit" fontSize="inherit" />
      </LeftRight>
    </Container>
  );
};

export default QuantityInput;
