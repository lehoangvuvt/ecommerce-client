"use client";

import { TProductDetails } from "@/types/api.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 78%;
  background: white;
  padding: 20px;
  display: flex;
  flex-flow: row wrap;
  border-radius: 4px;
  gap: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 1000px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    flex-flow: column wrap;
    width: 100%;
    border: none;
    border-radius: 0px;
  }
`;

const BigTitle = styled.div`
  width: 100%;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.06);
  padding: 15px 10px;
  font-weight: 500;
  font-size: 16px;
`;

const GeneralInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  gap: 15px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    flex-flow: row wrap;
    gap: 0px;
  }
`;

const GeneralInfoItem = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  font-size: 15px;
  @media (max-width: 768px) {
    flex-flow: column wrap;
    width: 50%;
    margin-bottom: 10px;
  }
`;

const GeneralInfoItemTitle = styled.div`
  width: 15%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 10px;
  color: rgba(0, 0, 0, 0.6);
  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0px;
  }
`;

const GeneralInfoItemValue = styled.div`
  width: 85%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Description = styled.div`
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  padding-top: 5px;
  font-size: 15px;
`;

type Props = {
  details: TProductDetails;
};

const Details: React.FC<Props> = ({ details }) => {
  const router = useRouter();
  const [generalInfo, setGeneralInfo] = useState<
    { title: string; value: string }[]
  >([]);
  const [categoryPath, setCategoryPath] = useState<
    { name: string; id: string; slug: string }[]
  >([]);

  useEffect(() => {
    processGeneralInfo();
  }, []);

  const processGeneralInfo = () => {
    const info: { title: string; value: string }[] = [];
    details.attributeSet.attributeSetValueMappings.forEach((item) => {
      const attribute = item.attributeValue;
      const attributeName = attribute.attribute.attribute_name;
      const valueType = attribute.attribute.value_type;
      let attributeValue: string = "";
      switch (valueType) {
        case 0:
          attributeValue = attribute.value_decimal
            ? attribute.value_decimal.toString()
            : "";
          break;
        case 1:
          attributeValue = attribute.value_int
            ? attribute.value_int.toString()
            : "";
          break;
        case 2:
          attributeValue = attribute.value_string ? attribute.value_string : "";
          break;
      }
      info.push({ title: attributeName, value: attributeValue });
    });
    info.push({ title: "Brand", value: details.brand.brand_name });
    setCategoryPath(details.category_path);
    setGeneralInfo(info);
  };

  return (
    <Container>
      <BigTitle>Product details</BigTitle>
      <GeneralInfoContainer>
        {generalInfo.length > 0 &&
          generalInfo.map((item) => (
            <GeneralInfoItem key={item.value}>
              <GeneralInfoItemTitle>{item.title}</GeneralInfoItemTitle>
              <GeneralInfoItemValue>{item.value}</GeneralInfoItemValue>
            </GeneralInfoItem>
          ))}
        <GeneralInfoItem>
          <GeneralInfoItemTitle>Category</GeneralInfoItemTitle>
          <GeneralInfoItemValue>
            {categoryPath.map((item, i) => (
              <span
                onClick={() => router.push(`/search?c=${item.slug}`)}
                key={item.id}
              >
                <span
                  style={{
                    color: "#4C75A3",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {item.name}
                </span>
                {i < categoryPath.length - 1 && <span> &#62; </span>}
              </span>
            ))}
          </GeneralInfoItemValue>
        </GeneralInfoItem>
      </GeneralInfoContainer>
      <BigTitle>Description</BigTitle>
      <Description>{details.description}</Description>
    </Container>
  );
};

export default Details;
