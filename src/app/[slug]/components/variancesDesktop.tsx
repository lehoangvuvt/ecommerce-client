"use client";

import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";

const ContainerDesktop = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const MobileModal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0%;
  z-index: 100;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: flex-end;
  backdrop-filter: blur(1.5px);
  &.open {
    opacity: 1;
    pointer-events: all;
  }
  &.close {
    transition: opacity 0s 0.4s;
    opacity: 0;
    pointer-events: none;
  }
`;

const ContainerMobile = styled.div`
  width: 100%;
  height: 80%;
  background-color: white;
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s ease;
  &.open {
    transform: translateY(0%);
  }
  &.close {
    transform: translateY(100%);
  }
`;

const AttributeSelector = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    flex-flow: column wrap;
    gap: 10px;
  }
`;

const AttributeName = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const AttributeValues = styled.div`
  width: 75%;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AttributeValue = styled.div`
  padding: 8px 0px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  font-size: 15px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: calc(100% / 4 - 10px);
  &:hover,
  &.selected {
    border-color: red;
  }
  @media (max-width: 768px) {
    width: calc(100% / 4 - 10px);
  }
  @media (max-width: 400px) {
    width: calc(100% / 3 - 10px);
  }
  @media (max-width: 350px) {
    width: calc(100% / 2 - 10px);
  }
  @media (max-width: 250px) {
    width: 100%;
  }
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
  attributes: TAttribute;
  selectedVariance: {
    main: string;
    sub: string;
  } | null;
  setVariance: (type: "main" | "sub", value: string) => void;
  setInitVariance: (initVariance: { main: string; sub: string }) => void;
  onHoverMainAtrr: (imageURL: string) => void;
  onLeaveAtrr: () => void;
};

const VariancesDesktop: React.FC<Props> = ({
  selectedVariance,
  attributes,
  setVariance,
  setInitVariance,
  onHoverMainAtrr,
  onLeaveAtrr,
}) => {
  useEffect(() => {
    if (attributes) {
      setInitVariance({
        main: attributes.mainAttribute.values[0].value,
        sub: attributes.subAttribute.values[0],
      });
    }
  }, [attributes]);

  return (
    <ContainerDesktop>
      <AttributeSelector>
        <AttributeName>
          {attributes && attributes.mainAttribute.name}
        </AttributeName>
        <AttributeValues>
          {attributes &&
            attributes.mainAttribute.values.map((value) => (
              <AttributeValue
                onMouseOver={() => onHoverMainAtrr(value.imgURL)}
                onMouseLeave={() => onLeaveAtrr()}
                className={
                  selectedVariance?.main === value.value ? "selected" : ""
                }
                onClick={() => setVariance("main", value.value)}
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
    </ContainerDesktop>
  );
};

export default VariancesDesktop;
