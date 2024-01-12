"use client";

import ImageSlider from "@/components/ImageSlider";
import { TProductDetails } from "@/types/api.type";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Variances, { TAttribute } from "./variances";
import Price from "./price";
import QuantityInput from "@/components/QuantityInput";
import MyButton from "@/components/Button";

const Container = styled.div`
  width: 78%;
  background: white;
  padding: 20px;
  display: flex;
  flex-flow: row wrap;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 1000px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    flex-flow: column wrap;
    width: 95%;
  }
`;

const Left = styled.div`
  width: 40%;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 60%;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  gap: 30px;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
    gap: 20px;
  }
`;

const QuantitySelector = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  & > div {
    width: 120px;
  }
  p {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    user-select: none;
    @media (max-width: 768px) {
      padding-left: 0px;
    }
  }
  @media (max-width: 768px) {
    flex-flow: column wrap;
    gap: 15px;
    & > div {
      width: 100%;
    }
  }
`;

const ProductTitle = styled.div`
  width: 90%;
  font-weight: 500;
  font-size: 22px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
  }
`;

const ProductPrice = styled.div`
  width: 100%;
  font-size: 30px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const CurrentImageContainer = styled.div`
  position: absolute;
  width: 90%;
  height: 400px;
`;

const OverviewSection = styled.section`
  display: flex;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    flex-flow: column wrap;
    gap: 10px;
  }
`;

const OverviewSectionTitle = styled.section`
  height: 100%;
  width: 20%;
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const OverviewSectionContent = styled.section`
  height: 100%;
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
  }
  &.buttons-container {
    button {
      width: 150px;
      @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 15px;
      }
    }
  }
`;

type Props = {
  details: TProductDetails;
  attributes: TAttribute;
};

const Overview: React.FC<Props> = ({ details, attributes }) => {
  const [selectedVariance, setSelectedVariance] = useState<{
    main: string;
    sub: string;
  } | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const getVarianceInfo = () => {
    let price = 0;
    let qty = 0;
    if (selectedVariance) {
      for (let key in details.product_variance) {
        const mainAttributeValue = key.split(":")[0];
        for (let subKey in details.product_variance[key]) {
          const subAttributeValue = subKey.split(":")[0];
          if (
            mainAttributeValue === selectedVariance.main &&
            subAttributeValue === selectedVariance.sub
          ) {
            price = details.product_variance[key][subKey].price;
            qty = details.product_variance[key][subKey].qty;
          }
        }
      }
    }
    return { price, qty };
  };

  const handleSetVariance = (type: "main" | "sub", value: string) => {
    const updatedSelectedVariance = Object.assign({}, selectedVariance);
    updatedSelectedVariance[type] = value;
    setSelectedVariance(updatedSelectedVariance);
  };

  useEffect(() => {
    if (selectedVariance) {
      const maxQty = getVarianceInfo().qty;
      if (qty > maxQty) setQty(maxQty);
    }
  }, [qty, selectedVariance]);

  return (
    <Container>
      <Left>
        {currentImage && (
          <CurrentImageContainer>
            <Image
              style={{
                objectFit: "contain",
                objectPosition: "center",
                transform: "scale(0.9)",
              }}
              fill
              src={currentImage}
              alt="product-image"
            />
          </CurrentImageContainer>
        )}
        <ImageSlider
          isShowCurrentImage={!currentImage}
          images={details.images.map((image) => {
            return image.image_url;
          })}
        />
      </Left>
      <Right>
        <ProductTitle>{details.product_name}</ProductTitle>
        <ProductPrice>
          <Price currentPrice={getVarianceInfo().price} />
        </ProductPrice>
        <Variances
          attributes={attributes}
          selectedVariance={selectedVariance}
          setVariance={handleSetVariance}
          setInitVariance={(initVariance) => setSelectedVariance(initVariance)}
          onHoverMainAtrr={(imageURL) => setCurrentImage(imageURL)}
          onLeaveAtrr={() => setCurrentImage(null)}
        />
        <OverviewSection>
          <OverviewSectionTitle>Quantity</OverviewSectionTitle>
          <OverviewSectionContent>
            <QuantitySelector>
              <QuantityInput
                style={{ height: "35px" }}
                onDecrease={() => qty > 1 && setQty(qty - 1)}
                onIncrease={() => {
                  if (qty < getVarianceInfo().qty) {
                    setQty(qty + 1);
                  }
                }}
                onChange={(value) => {
                  if (parseInt(value)) {
                    setQty(parseInt(value));
                  } else {
                    if (value === "") {
                      setQty(1);
                    }
                  }
                }}
                quantity={qty}
              />
              <p>{getVarianceInfo().qty} products available</p>
            </QuantitySelector>
          </OverviewSectionContent>
        </OverviewSection>
        <OverviewSection>
          <OverviewSectionContent className="buttons-container">
            <MyButton
              height="45px"
              onClick={() => {}}
              background="rgb(255,0,0,0.05)"
              fontColor="red"
              fontSize="14px"
              customStyle={{ marginRight: "20px", border: "1px solid red" }}
            >
              <AddShoppingCartIcon
                style={{ fontSize: "20px" }}
                color="inherit"
              />{" "}
              Add To Cart
            </MyButton>
            <MyButton
              height="45px"
              onClick={() => {}}
              background="red"
              fontColor="white"
              fontSize="14px"
            >
              Buy Now
            </MyButton>
          </OverviewSectionContent>
        </OverviewSection>
      </Right>
    </Container>
  );
};

export default Overview;
