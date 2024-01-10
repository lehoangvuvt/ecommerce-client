"use client";

import styled from "styled-components";
import ProductItem from "./components/productItem";
import { TProducItem } from "@/types/api.type";

const Container = styled.div`
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-flow: row wrap;
`;

const Left = styled.div`
  width: 20%;
`;

const Right = styled.div`
  width: 80%;
`;

const ProductsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`;

type Props = {
  foundProducts: TProducItem[];
};

const SearchView: React.FC<Props> = ({ foundProducts }) => {
  return (
    <Container>
      <Left></Left>
      <Right>
        <ProductsContainer>
          {Array(20)
            .fill(foundProducts[0])
            .map((product, pIndex) => (
              <ProductItem key={pIndex} product={product} />
            ))}
        </ProductsContainer>
      </Right>
    </Container>
  );
};

export default SearchView;
