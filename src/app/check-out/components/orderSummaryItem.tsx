"use client";

import { TFormattedCartItem } from "@/types/api.type";
import { convertNumberToCurrencyString } from "@/utils/string.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 10px 0px;
  gap: 20px;
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
`;

const ProductQuantity = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #df2029;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const ProductInfo = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  gap: 4px;
  box-sizing: border-box;
  padding-left: 5px;
`;

const ProductName = styled.div`
  width: 100%;
  font-weight: 500;
  color: black;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 20px;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ProductVariance = styled.div`
  width: 100%;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  font-size: 15px;
`;

const ProductPrice = styled.div`
  width: 100%;
  font-weight: 500;
  color: black;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type Props = {
  data: TFormattedCartItem;
};

const OrderSummaryItem: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  return (
    <Container>
      <ProductImage>
        <Image
          alt="item-img"
          src={data.image}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "3px",
          }}
        />
        <ProductQuantity>x{data.quantity}</ProductQuantity>
      </ProductImage>
      <ProductInfo>
        <ProductName onClick={() => router.push(`/${data.product.slug}`)}>
          {data.product.product_name}
        </ProductName>
        <ProductVariance>
          {data.variance.main.attribute_value},{" "}
          {data.variance.sub.attribute_value}
        </ProductVariance>
        <ProductPrice>{convertNumberToCurrencyString(data.total_price)}</ProductPrice>
      </ProductInfo>
    </Container>
  );
};

export default OrderSummaryItem;
