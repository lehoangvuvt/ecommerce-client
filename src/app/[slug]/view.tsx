"use client";

import { TProductDetails } from "@/types/api.type";
import styled from "styled-components";
import { TAttribute } from "./components/variances";
import Overview from "./components/overview";
import Details from "./components/details";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-top: 60px;
  margin-bottom: 60px;
  width: 100%;
  gap: 20px;
  align-items: center;
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
