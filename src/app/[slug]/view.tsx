"use client";

import { TProductDetails } from "@/types/api.type";
import styled from "styled-components";
import { TAttribute } from "./components/variances";
import Overview from "./components/overview";
import Details from "./components/details";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  gap: 20px;
  align-items: center;
  padding-top: 50px;
  @media (max-width: 768px) {
    padding-top: 70px;
  }
`;

type Props = {
  details: TProductDetails;
  attributes: TAttribute;
};

const ProductView: React.FC<Props> = ({ details, attributes }) => {
  return (
    <Container>
      <Overview attributes={attributes} details={details} />
      <Details details={details} />
    </Container>
  );
};

export default ProductView;
