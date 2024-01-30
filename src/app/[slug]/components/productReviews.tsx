"use client";

import { TPagingListResponse, TProductReview } from "@/types/api.type";
import styled from "styled-components";
import ProductReviewItem from "./productReviewItem";

const Container = styled.div`
  width: 78%;
  display: flex;
  flex-flow: column wrap;
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 1000px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0px;
    border: none;
  }
`;

const ReviewItemsContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
  padding: 10px 25px;
  @media (max-width: 768px) {
    padding: 5px 0px;
    width: 100%;
  }
`;

type Props = {
  data: TPagingListResponse<TProductReview>;
};

const ProductReviews: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <ReviewItemsContainer>
        {data?.data?.length > 0 &&
          data.data.map((reviewItem, i) => (
            <ProductReviewItem key={i} data={reviewItem} />
          ))}
      </ReviewItemsContainer>
    </Container>
  );
};

export default ProductReviews;
