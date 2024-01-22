"use client";

import ProductItem from "@/components/ProductItem";
import { TProducItem } from "@/types/api.type";
import styled from "styled-components";

const Container = styled.div`
  width: 78%;
  display: flex;
  flex-flow: column wrap;
  @media (max-width: 768px) {
    width: 90%;
    padding-bottom: 20px;
  }
`;

const ProductsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow-y: hidden;
  overflow-x: auto;
  gap: 10px;
  @media (max-width: 768px) {
    gap: 5px;
  }
`;

type Props = {
  products: TProducItem[];
};

const SimilarProducts: React.FC<Props> = ({ products }) => {
  return (
    <Container className="pb-[10x]">
      <h1 className="pb-[25px] pt-[10px] text-[20px] font-[500]">
        Similar products
      </h1>
      <ProductsContainer>
        {products.length > 0 &&
          products.map((product, i) => (
            <ProductItem product={product} key={i} />
          ))}
      </ProductsContainer>
    </Container>
  );
};

export default SimilarProducts;
