"use client";

import {
  TPagingListResponse,
  TProducItem,
  TProductDetails,
  TProductReview,
  TStoreOverview,
} from "@/types/api.type";
import styled from "styled-components";
import { TAttribute } from "./components/variancesDesktop";
import Overview from "./components/overview";
import Details from "./components/details";
import { useEffect } from "react";
import useStore, { TPathItem } from "@/store/store";
import useScreenWidth from "@/hooks/useScreenWidth";
import ROUTES from "@/types/routes";
import MobilePageHeader from "@/components/MobilePageHeader";
import CartButton from "@/components/CartButton";
import SimilarProducts from "./components/similarProducts";
import StoreOverview from "./components/storeOverview";
import ProductReviews from "./components/productReviews";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  gap: 20px;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 50px;
  @media (max-width: 768px) {
    padding-top: 0px;
  }
`;

type Props = {
  details: TProductDetails;
  attributes: TAttribute;
  similarProducts: TProducItem[];
  storeOverview: TStoreOverview | null;
  productReviews: TPagingListResponse<TProductReview>;
};

const ProductView: React.FC<Props> = ({
  details,
  attributes,
  similarProducts,
  storeOverview,
  productReviews,
}) => {
  const { setPath } = useStore();
  const { deviceType } = useScreenWidth();

  useEffect(() => {
    const categoryPaths: TPathItem[] = details.category_path.map((item) => {
      return {
        isLink: true,
        name: item.name,
        route: ROUTES.SEARCH,
        value: `?c=${item.slug}`,
      };
    });
    const paths: TPathItem[] = [
      { isLink: true, name: "Home", route: ROUTES.HOME, value: "" },
      ...categoryPaths,
      {
        isLink: false,
        name: details.product_name,
        route: ROUTES.PRODUCT_DETAILS,
        value: details.slug,
      },
    ];
    setPath(paths);
  }, []);

  return (
    <Container>
      {deviceType === "mobile" && (
        <MobilePageHeader
          headerText={details.product_name}
          effectOn
          rightItem={<CartButton style={{ transform: "scale(0.925)" }} />}
        />
      )}
      <Overview attributes={attributes} details={details} />
      {storeOverview && (
        <StoreOverview
          withBG={false}
          style={{
            width: deviceType === "desktop" ? "78%" : "100%",
            marginBottom: deviceType === "desktop" ? "0px" : "20px",
            border: "1px solid rgba(0,0,0,0.1)",
            padding: "10px",
            height: deviceType === "desktop" ? "120px" : "auto",
          }}
          overview={storeOverview}
        />
      )}
      <Details details={details} />
      <ProductReviews data={productReviews} />
      {similarProducts && similarProducts.length > 0 && (
        <SimilarProducts products={similarProducts} />
      )}
    </Container>
  );
};

export default ProductView;
