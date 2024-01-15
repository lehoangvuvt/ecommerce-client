"use client";

import { useEffect, useRef, useState } from "react";
import { ProductsContainer } from "../page";
import ProductItem from "./productItem";
import { TProducItem } from "@/types/api.type";
import { useSearchParams } from "next/navigation";
import useSearchInfiniteProducts from "@/react-query/hooks/useSearchInfiniteProducts";

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
      setProducts((prev) => [...prev, ...result.data]);
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
      const cs = getComputedStyle(productsContainerRef.current);
      const childCount = productsContainerRef.current.childNodes.length;
      var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
      var borderY =
        parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

      const height =
        productsContainerRef.current.scrollHeight - paddingY - borderY;
      const triggerHeightCondition =
        window.scrollY >= height - 100 - 10 * childCount - 80 - 150;

      if (triggerHeightCondition) {
        setEndScroll(true);
      }
    }
  };

  useEffect(() => {
    if (isEndScroll && result.has_next) {
      setCurrentPage(currentPage + 1);
    }
  }, [isEndScroll]);

  useEffect(() => {
    if (currentPage > 0) {
      const updatedSearchParams = Object.assign({}, searchParams);
      updatedSearchParams["page"] = currentPage.toString();
      setSearchParams(updatedSearchParams);
      setEndScroll(false);
    }
  }, [currentPage]);

  return (
    <ProductsContainer ref={productsContainerRef}>
      {products &&
        products.map((product, pIndex) => (
          <ProductItem key={pIndex} product={product} />
        ))}
    </ProductsContainer>
  );
};

export default MobileList;
