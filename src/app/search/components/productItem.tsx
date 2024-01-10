"use client";

import { TProducItem } from "@/types/api.type";
import { convertNumberToCurrencyString } from "@/utils/string.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  width: calc(20% - 10px);
  aspect-ratio: 0.6;
  display: flex;
  flex-flow: column wrap;
  background-color: white;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.1s ease;
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.125);
    transform: translateY(-2px);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
`;

const ProductInfo = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const ProductName = styled.div`
  width: 90%;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 5px;
`;

const ProductPrice = styled.div`
  width: 90%;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 5px;
  color: red;
  font-weight: 500;
`;

type Props = {
  product: TProducItem;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(`/${product.slug}`)}>
      <ProductImage>
        <Image
          fill
          style={{ objectFit: "contain", objectPosition: "top" }}
          src={product.product_images[0]}
          alt={`${product.id}-image`}
        />
      </ProductImage>
      <ProductInfo>
        <ProductName>{product.product_name}</ProductName>
        <ProductPrice>
          {convertNumberToCurrencyString(product.price_lowest)} -{" "}
          {convertNumberToCurrencyString(product.price_highest)}
        </ProductPrice>
      </ProductInfo>
    </Container>
  );
};

export default ProductItem;
