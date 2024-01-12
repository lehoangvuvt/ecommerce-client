"use client";

import styled from "styled-components";
import ProductItem from "./components/productItem";
import {
  TPagingListResponse,
  TProducItem,
  TSearchFilters,
} from "@/types/api.type";
import SearchFilter from "./components/searchFilter";
import SortTabs from "./components/sortTabs";
import useStore from "@/store/store";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Paging from "./components/paging";
import useScreenWidth from "@/hooks/useScreenWidth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Line from "@/components/Line";

const Container = styled.div`
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-flow: row wrap;
  margin-top: 25px;
  @media (max-width: 768px) {
    flex-flow: column wrap;
    width: 90%;
    margin-left: 5%;
  }
`;

const Left = styled.div`
  width: 20%;
  display: flex;
  flex-flow: column wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: row wrap;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
`;

const Right = styled.div`
  width: 80%;
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;

const RightHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
  align-items: center;
  @media (max-width: 768px) {
    flex-flow: column wrap;
    div {
      width: 100%;
    }
  }
`;

const EmptyContainer = styled.div`
  width: 90%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const MobileFiltersContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 600;
  transition: margin-left 0.5s ease;
  &.close {
    margin-left: -100%;
  }
  &.open {
    margin-left: 0%;
  }
`;

const MobileFiltersHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;

const MobileFiltersContent = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: scroll;
  display: flex;
  flex-flow: column;
`;

const MobileFiltersHeaderLeft = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  align-items: center;
  font-size: 22px;
  box-sizing: border-box;
  padding-left: 10px;
`;

const MobileFiltersHeaderCenter = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
`;

const MobileFiltersHeaderRight = styled.div`
  height: 100%;
  width: 20%;
`;

const MobileFilterApplyButton = styled.button`
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  font-size: 13px;
  color: white;
  border-radius: 3px;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const MobileFilterSortContainer = styled.div`
  position: fixed;
  bottom: 10px;
  display: flex;
  flex-flow: row;
  z-index: 50;
  transform: translateX(-50%);
  left: 50%;
  background-color: black;
  height: 35px;
  width: 40%;
  @media (max-width: 360px) {
    width: 80%;
  }
`;

const OpenMBFiltersBtn = styled.div`
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 14px;
  font-weight: 400;
`;

type Props = {
  result: TPagingListResponse<TProducItem>;
  searchFilters: TSearchFilters;
};

const SearchView: React.FC<Props> = ({ result, searchFilters }) => {
  const { addFilterValues, filters } = useStore();
  const [isInitial, setIsInitial] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { deviceType } = useScreenWidth();
  const [isOpenMobileFilters, setOpenMobileFilters] = useState(false);

  useEffect(() => {
    for (let key of searchParams.keys()) {
      const queryKey = key;
      const values = searchParams.get(queryKey)!.split(",");
      addFilterValues(queryKey, values);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isInitial) {
      if (deviceType === "desktop") {
        handleFilters();
      }
    } else {
      setIsInitial(false);
    }
  }, [filters]);

  const handleFilters = () => {
    const url = new URLSearchParams();
    for (let key in filters) {
      const queryKey = key;
      const value = filters[queryKey]
        .reduce((prev, curr) => `${prev},${curr}`, "")
        .substring(1);
      url.set(queryKey, value);
    }
    router.push("/search?" + url.toString());
  };

  const applyFilters = () => {
    handleFilters();
    setOpenMobileFilters(false);
  };

  const renderMobileFilters = () => {
    return (
      <MobileFiltersContainer
        className={isOpenMobileFilters ? "open" : "close"}
      >
        <MobileFiltersHeader>
          <MobileFiltersHeaderLeft onClick={() => setOpenMobileFilters(false)}>
            <ArrowBackIcon color="inherit" fontSize="inherit" />
          </MobileFiltersHeaderLeft>
          <MobileFiltersHeaderCenter>Filter</MobileFiltersHeaderCenter>
          <MobileFiltersHeaderRight></MobileFiltersHeaderRight>
        </MobileFiltersHeader>
        <MobileFiltersContent>
          {Object.keys(searchFilters).map((key) => (
            <SearchFilter
              key={key}
              name={searchFilters[key].name}
              queryKey={key}
              values={searchFilters[key].values.toSorted()}
            />
          ))}
        </MobileFiltersContent>
        <MobileFilterApplyButton onClick={applyFilters}>
          Apply Filters
        </MobileFilterApplyButton>
      </MobileFiltersContainer>
    );
  };

  const renderDesktopFilters = () => {
    return (
      <Left>
        {Object.keys(searchFilters).map((key) => (
          <SearchFilter
            key={key}
            name={searchFilters[key].name}
            queryKey={key}
            values={searchFilters[key].values.toSorted()}
          />
        ))}
      </Left>
    );
  };

  return (
    <Container>
      {deviceType === "desktop" && renderDesktopFilters()}
      {deviceType === "mobile" && renderMobileFilters()}
      {deviceType === "mobile" && (
        <MobileFilterSortContainer>
          <OpenMBFiltersBtn onClick={() => setOpenMobileFilters(true)}>
            <SwapVertIcon color="inherit" fontSize="medium" /> Sort
          </OpenMBFiltersBtn>
          <Line height="20px" color="rgba(255,255,255,0.7)" width="1px" />
          <OpenMBFiltersBtn onClick={() => setOpenMobileFilters(true)}>
            <FilterListIcon color="inherit" fontSize="medium" /> Filters
          </OpenMBFiltersBtn>
        </MobileFilterSortContainer>
      )}
      <Right>
        {result.data && result.data.length > 0 && (
          <>
            {deviceType === "desktop" && (
              <RightHeader>
                <SortTabs style={{ width: "90%" }} />
                <Paging
                  style={{ flex: "1" }}
                  current_page={result.current_page}
                  has_next={result.has_next}
                  total_page={result.total_page}
                />
              </RightHeader>
            )}
            <ProductsContainer>
              {result.data.map((product, pIndex) => (
                <ProductItem key={pIndex} product={product} />
              ))}
            </ProductsContainer>
          </>
        )}
      </Right>
      {result.data.length === 0 && <EmptyContainer>Empty</EmptyContainer>}
    </Container>
  );
};

export default SearchView;
