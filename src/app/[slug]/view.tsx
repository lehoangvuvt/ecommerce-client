"use client";

import { TProductDetails } from "@/types/api.type";
import styled from "styled-components";
import { TAttribute } from "./components/variances";
import Overview from "./components/overview";
import Details from "./components/details";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import useScreenWidth from "@/hooks/useScreenWidth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  gap: 20px;
  align-items: center;
  padding-top: 10px;
  @media (max-width: 768px) {
    padding-top: 0px;
  }
`;

const ProductMobileHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-flow: row;
  padding: 0px 10px;
  align-items: center;
`;

const BackButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
`;

const ProductName = styled.div`
  width: calc(100% - 45px - 20px);
  padding: 0px 5px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  font-size: 16px;
`;

type Props = {
  details: TProductDetails;
  attributes: TAttribute;
};

const ProductView: React.FC<Props> = ({ details, attributes }) => {
  const { setPath } = useStore();
  const { deviceType } = useScreenWidth();
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const categoriesPath = details.category_path.map((item) => {
      return item.name;
    });
    const path = ["Home", ...categoriesPath, details.product_name];
    setPath(path);
  }, []);

  useEffect(() => {
    if (deviceType === "mobile") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [deviceType]);

  const handleScroll = () => {
    const scrollValToFull = 400;
    const opacity =
      window.scrollY >= scrollValToFull ? 1 : window.scrollY / scrollValToFull;
    setHeaderOpacity(opacity);
  };

  return (
    <Container>
      {deviceType === "mobile" && (
        <ProductMobileHeader
          style={{
            backgroundColor: `rgba(255,255,255,${headerOpacity})`,
          }}
        >
          <BackButton onClick={() => router.back()}>
            <ArrowBackIcon color="inherit" fontSize="inherit" />
          </BackButton>
          <ProductName
            style={{
              color: `rgba(0,0,0,${headerOpacity})`,
            }}
          >
            {details.product_name}
          </ProductName>
        </ProductMobileHeader>
      )}
      <Overview attributes={attributes} details={details} />
      <Details details={details} />
    </Container>
  );
};

export default ProductView;
