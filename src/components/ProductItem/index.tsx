"use client";

import useStore from "@/store/store";
import { TProducItem } from "@/types/api.type";
import { convertNumberToCurrencyString } from "@/utils/string.utils";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import BlurImage from "../BlurImage";

const Container = styled.div`
  width: calc(20% - 8px);
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
  @media (max-width: 1110px) {
    width: calc(25% - 8px);
    aspect-ratio: 0.5;
  }
  @media (max-width: 768px) {
    width: calc(50% - 2.5px);
    height: 280px;
  }
  @media (max-width: 350px) {
    width: 95%;
    height: 280px;
    margin: auto auto;
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
  @media (max-width: 350px) {
    height: 60%;
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  @media (max-width: 350px) {
    height: 40%;
  }
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
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 5px;
  color: red;
  font-weight: 500;
`;

const Stars = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 8px 6px;
  .filled,
  .normal {
    color: #fbc02d;
    font-size: 15px;
  }
`;

type Props = {
  product: TProducItem;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const { setPath } = useStore();
  const router = useRouter();

  return (
    <Container
      onClick={() => {
        setPath([]);
        router.push(`/${product.slug}`);
      }}
    >
      <ProductImage>
        <BlurImage
          style={{ objectFit: "contain", objectPosition: "top" }}
          src={product.product_images[0]}
        />
      </ProductImage>
      <ProductInfo>
        <ProductName>{product.product_name}</ProductName>
        <ProductPrice>
          {convertNumberToCurrencyString(
            product.prices.sort((a, b) => a - b)[0]
          )}{" "}
          -{" "}
          {convertNumberToCurrencyString(
            product.prices.sort((a, b) => b - a)[1]
          )}
        </ProductPrice>
        <Stars>
          {Array(5)
            .fill("")
            .map((_, i) =>
              i < product.average_rating ? (
                <StarIcon
                  key={i}
                  className="filled"
                  fontSize="inherit"
                  color="inherit"
                />
              ) : (
                <StarBorderIcon
                  className="normal"
                  fontSize="inherit"
                  color="inherit"
                  key={i}
                />
              )
            )}
        </Stars>
      </ProductInfo>
    </Container>
  );
};

export default ProductItem;
