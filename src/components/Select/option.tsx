"use client";

import styled from "styled-components";

const Container = styled.div`
  cursor: pointer;
  padding: 10px 10px;
  color: black;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &.selected {
    background-color: #e1f5fe;
    font-weight: 500;
  }
  font-size: 14px;
`;

type Props = {
  children: React.ReactNode;
  value: string;
};

const Option: React.FC<Props> = ({ children, value }) => {
  return (
    <Container data-item={value} data-show={children}>
      {children}
    </Container>
  );
};

export default Option;
