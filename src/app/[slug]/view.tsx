"use client";

import { TProductDetails } from "@/types/api.type";
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
};

const ProductView: React.FC<Props> = ({ details, attributes }) => {
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
      <Details details={details} />
    </Container>
  );
};

export default ProductView;
