"use client";

import { useEffect, useRef, useState } from "react";
import ProductItem from "@/components/ProductItem";
import { TProducItem } from "@/types/api.type";
import { useSearchParams } from "next/navigation";
import useSearchInfiniteProducts from "@/react-query/hooks/useSearchInfiniteProducts";
import styled from "styled-components";
import Spinner from "@/components/Spinner";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  @media (max-width: 768px) {
    margin-top: 100px;
    margin-bottom: 100px;
    gap: 5px;
  }
`;

const MobileList = () => {
  const params = useSearchParams();
  const [searchParams, setSearchParams] = useState<{
    [key: string]: string;
  }>({});
  const { result, isError, isLoading } =
    useSearchInfiniteProducts(searchParams);
  const [products, setProducts] = useState<TProducItem[]>([]);
  const productsContainerRef = useRef<HTMLDivElement>(null);
  const [isEndScroll, setEndScroll] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    let searchParams: { [key: string]: string } = {};
    for (let key of params.keys()) {
      searchParams[key] = params.get(key) as string;
    }
    setProducts([]);
    setCurrentPage(0);
    searchParams["page"] = "0";
    setSearchParams(searchParams);
  }, [params]);

  useEffect(() => {
    if (result && result.data.length > 0) {
      if (currentPage === 0) {
        setProducts(result.data);
      } else {
        setProducts((prev) => [...prev, ...result.data]);
      }
    }
  }, [result]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEnd);
    return () => {
      setProducts([]);
      setCurrentPage(0);
      window.removeEventListener("scroll", handleScrollEnd);
    };
  }, []);

  const handleScrollEnd = (e: any) => {
    if (productsContainerRef && productsContainerRef.current) {
      if (
        window.innerHeight + window.scrollY >=
        productsContainerRef.current.offsetHeight + 100
      ) {
        setEndScroll(true);
      }
    }
  };

  useEffect(() => {
    if (isEndScroll && !isLoading) {
      setCurrentPage(currentPage + 1);
    }
  }, [isEndScroll]);

  useEffect(() => {
    if (currentPage > 0 && currentPage < result.total_page) {
      const updatedSearchParams = Object.assign({}, searchParams);
      updatedSearchParams["page"] = currentPage.toString();
      setSearchParams(updatedSearchParams);
      setEndScroll(false);
    }
  }, [currentPage]);

  return (
    <Container ref={productsContainerRef}>
      {products &&
        products.map((product, pIndex) => (
          <ProductItem key={pIndex} product={product} />
        ))}
      {isLoading && (
        <div
          style={{
            width: "100%",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </div>
      )}
    </Container>
  );
};

export default MobileList;
