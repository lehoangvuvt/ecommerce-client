"use client";

import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  justify-content: center;
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
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const AttributeValues = styled.div`
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
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
  flex: 1;
  max-width: 100px;
  &:hover,
  &.selected {
    border-color: red;
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

const Variances: React.FC<Props> = ({
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
    <Container>
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
    </Container>
  );
};

export default Variances;
