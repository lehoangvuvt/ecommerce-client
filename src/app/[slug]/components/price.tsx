"use client";

import { convertNumberToCurrencyString } from "@/utils/string.utils";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.04);
  padding: 10px 20px;
`;

const CurrentPrice = styled.p`
  color: red;
  font-size: 24px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

type Props = {
  currentPrice: number;
};

const Price: React.FC<Props> = ({ currentPrice }) => {
  return (
    <Container>
      <CurrentPrice>{convertNumberToCurrencyString(currentPrice)}</CurrentPrice>
    </Container>
  );
};

export default Price;
