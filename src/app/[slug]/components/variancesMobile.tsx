"use client";

import MyButton from "@/components/Button";
import Drawer from "@/components/Drawer";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getVarianceInfo } from "./overview";
import { TProductDetails } from "@/types/api.type";
import { convertNumberToCurrencyString } from "@/utils/string.utils";
import QuantityInput from "@/components/QuantityInput";

const AttributeSelector = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  padding: 10px 5% 20px 5%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const AttributeName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font-size: 14px;
  height: 25px;
  padding-left: 10px;
`;

const AttributeValues = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`;

const AttributeValue = styled.div`
  padding: 5px 0px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  font-size: 14px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 30%;
  &:hover,
  &.selected {
    border-color: red;
  }
`;

const CurrentVarianceInfo = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const CurrentVarianceImage = styled.div`
  width: 35%;
  aspect-ratio: 1;
  position: relative;
`;

const CurrentVariancePriceQty = styled.div`
  width: 55%;
  position: relative;
  padding-bottom: 30px;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 5% 10px 5%;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
`;

export type TProductVariance = {
  mainAttributeName: string;
  mainAttributeValue: string;
  subAttributes: {
    value: string;
    name: string;
    qty: number;
    price: number;
    imageURL: string;
  }[];
};

export type TAttribute = {
  mainAttribute: { name: string; values: { value: string; imgURL: string }[] };
  subAttribute: { name: string; values: string[] };
};

type Props = {
  details: TProductDetails;
  attributes: TAttribute;
  selectedVariance: {
    main: string;
    sub: string;
  } | null;
  setVariance: (type: "main" | "sub", value: string) => void;
  setInitVariance: (initVariance: { main: string; sub: string }) => void;
  onHoverMainAtrr: (imageURL: string) => void;
  onLeaveAtrr: () => void;
  openMobileModal: "add" | "buy" | "close";
  closeModal: () => void;
  onClickModalSubmitBtn: (type: "add" | "buy" | "close") => void;
  qty: number;
  setQty: (qty: number) => void;
};

const VariancesMobile: React.FC<Props> = ({
  details,
  selectedVariance,
  attributes,
  setVariance,
  setInitVariance,
  onHoverMainAtrr,
  onLeaveAtrr,
  openMobileModal,
  closeModal,
  onClickModalSubmitBtn,
  qty,
  setQty,
}) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (attributes) {
      setInitVariance({
        main: attributes.mainAttribute.values[0].value,
        sub: attributes.subAttribute.values[0],
      });
      setImageUrl(attributes.mainAttribute.values[0].imgURL);
    }
  }, [attributes]);

  return (
    <Drawer
      position="bottom"
      width="100%"
      height="calc(100% - 65px)"
      isOpen={openMobileModal !== "close"}
      childrenContainerStyle={{
        padding: "20px 0px",
        overflowY: "auto",
        position: "relative",
      }}
      closeModal={() => closeModal()}
    >
      <CurrentVarianceInfo>
        <CurrentVarianceImage>
          <Image
            src={imageUrl}
            alt="variance-image"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </CurrentVarianceImage>
        <CurrentVariancePriceQty>
          <p className="text-[red] text-[16px] font-[400] pl-[15px]">
            {selectedVariance
              ? convertNumberToCurrencyString(
                  getVarianceInfo(selectedVariance, details).price
                )
              : convertNumberToCurrencyString(0)}
          </p>
          <p className="text-[rgba(0,0,0,0.6)] text-[15px] font-[400] pl-[15px]">
            Stock:{" "}
            {selectedVariance
              ? getVarianceInfo(selectedVariance, details).qty
              : 0}
          </p>
        </CurrentVariancePriceQty>
      </CurrentVarianceInfo>
      <AttributeSelector>
        <AttributeName>
          {attributes && attributes.mainAttribute.name}
        </AttributeName>
        <AttributeValues>
          {attributes &&
            attributes.mainAttribute.values.map((value) => (
              <AttributeValue
                className={
                  selectedVariance?.main === value.value ? "selected" : ""
                }
                onClick={() => {
                  setImageUrl(value.imgURL);
                  setVariance("main", value.value);
                }}
                key={value.value}
              >
                <Image
                  width={23}
                  height={23}
                  src={value.imgURL}
                  alt="variance-img"
                />
                {value.value}
              </AttributeValue>
            ))}
        </AttributeValues>
      </AttributeSelector>
      <AttributeSelector>
        <AttributeName>
          {attributes &&
            attributes.subAttribute &&
            attributes.subAttribute.name}
        </AttributeName>
        <AttributeValues>
          {attributes &&
            attributes.subAttribute &&
            attributes.subAttribute.values.map((value) => (
              <AttributeValue
                className={selectedVariance?.sub === value ? "selected" : ""}
                key={value}
                onClick={() => setVariance("sub", value)}
              >
                {value}
              </AttributeValue>
            ))}
        </AttributeValues>
      </AttributeSelector>
      <QuantitySelector>
        <p>Quantity</p>
        <QuantityInput
          style={{ height: "30px", width: "30%" }}
          onDecrease={() => qty > 1 && setQty(qty - 1)}
          onIncrease={() => {
            if (!selectedVariance) return;
            if (qty < getVarianceInfo(selectedVariance, details).qty) {
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
      </QuantitySelector>
      <MyButton
        background="red"
        fontColor="white"
        onClick={() => onClickModalSubmitBtn(openMobileModal)}
        fontSize="14px"
        width="92%"
        height="43px"
        customStyle={{
          marginLeft: "4%",
          borderRadius: "4px",
          marginTop: "15px",
        }}
      >
        {openMobileModal === "add" && "Add To Cart"}
        {openMobileModal === "buy" && "Buy Now"}
      </MyButton>
    </Drawer>
  );
};

export default VariancesMobile;
