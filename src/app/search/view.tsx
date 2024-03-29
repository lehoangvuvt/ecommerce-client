"use client";

import styled from "styled-components";
import ProductItem from "@/components/ProductItem";
import SearchFilter from "./components/searchFilter";
import useStore from "@/store/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Paging from "./components/paging";
import useScreenWidth from "@/hooks/useScreenWidth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Tabs, { TTabItem } from "@/components/Tabs";
import MobileList from "./components/mobileList";
import ROUTES from "@/types/routes";
import { SearchService } from "@/services/search.service";
import useSearchProducts from "@/react-query/hooks/useSearchProducts";
import useSearchFilters from "@/react-query/hooks/useSearchFilters";
import Loading from "@/components/Loading";

const Container = styled.div`
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-flow: row wrap;
  padding-top: 30px;
  min-height: 100vh;
  @media (max-width: 768px) {
    flex-flow: column wrap;
    width: 100%;
    margin-left: 0%;
    padding-top: 20px;
    padding-left: 5px;
    padding-right: 5px;
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
    margin-top: 100px;
    margin-bottom: 80px;
    gap: 5px;
    padding-bottom: 0px;
  }
  padding-bottom: 50px;
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

const FixedKeywordContainer = styled.div`
  width: 78%;
  color: red;
  margin: 10px auto 10px auto;
  display: flex;
  display: flex;
  align-items: center;
  font-size: 15px;
  @media (max-width: 768px) {
    padding-top: 110px;
    margin: 10px auto -100px auto;
    width: 92%;
  }
  span {
    color: #2962ff;
    font-style: italic;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

type Props = {};

const SearchView: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const { deviceType } = useScreenWidth();
  const {
    result: products,
    isLoading: isLoadingProducts,
    isError: isErrorSearchProducts,
  } = useSearchProducts(searchParams.toString(), deviceType);
  const {
    result: searchFilters,
    isLoading: isLoadingSearchFilters,
    isError: isErrorGetSearchFilters,
  } = useSearchFilters(searchParams.toString());
  const { addFilterValues, filters, setPath } = useStore();
  const router = useRouter();
  const [isOpenMobileFilters, setOpenMobileFilters] = useState(false);
  const sortTabItems: TTabItem[] = [
    { reactNode: <p>Popular</p>, value: "pop" },
    { reactNode: <p>Latest</p>, value: "ctime" },
    { reactNode: <p>Top Sales</p>, value: "sales" },
  ];
  const productsContainerRef = useRef<HTMLDivElement>(null);
  const [fixedKeyword, setFixedKeyword] = useState<string | null>(null);

  useEffect(() => {
    const getFixedKeyword = async () => {
      const response = await SearchService.getFixedKeyword(
        searchParams.get("keyword")!
      );
      if (response && response.fixed) {
        setFixedKeyword(response.fixed);
      }
    };
    const handlePath = async () => {
      let lastPathValue = "";

      if (searchParams.get("keyword")) {
        lastPathValue = searchParams.get("keyword")!;
        // getFixedKeyword();
      } else {
        if (searchParams.get("c")) {
          lastPathValue = searchParams
            .get("c")!
            .split("-")
            .slice(0, -1)
            .reduce(
              (prev, curr) =>
                `${prev.charAt(0).toUpperCase() + prev.substring(1)}${
                  curr.charAt(0).toUpperCase() + curr.substring(1)
                } `,
              ""
            )
            .trim();
        }
      }
      setPath([
        { name: "Home", route: ROUTES.HOME, value: "", isLink: true },
        {
          name: `Search result for "${lastPathValue}"`,
          route: ROUTES.SEARCH,
          value: lastPathValue,
          isLink: false,
        },
      ]);
    };
    handlePath();
  }, [searchParams, setPath]);

  useEffect(() => {
    for (let key of searchParams.keys()) {
      const values = searchParams.get(key)!.split(",");
      addFilterValues(key, values);
    }
  }, []);

  const handleFilters = useCallback(() => {
    const url = new URLSearchParams();
    for (let key in filters) {
      const queryKey = key;
      const value = filters[queryKey]
        .reduce((prev, curr) => `${prev},${curr}`, "")
        .substring(1);
      url.set(queryKey, value);
    }
    router.push("/search?" + url.toString(), { scroll: true });
  }, [filters, router]);

  useEffect(() => {
    if (deviceType === "mobile") return;
    handleFilters();
  }, [filters, handleFilters, deviceType]);

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
          {searchFilters &&
            Object.keys(searchFilters).map((key) => (
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
        {searchFilters &&
          Object.keys(searchFilters).map((key) => (
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

  const setSortType = (sortType: string) => {
    if (deviceType === "desktop") {
      addFilterValues("sortBy", [sortType]);
    } else {
      addFilterValues("sortBy", [sortType]);
      const url = new URLSearchParams();
      for (let key in filters) {
        const queryKey = key;
        const value = filters[queryKey]
          .reduce((prev, curr) => `${prev},${curr}`, "")
          .substring(1);
        url.set(queryKey, value);
      }
      url.set("sortBy", sortType);
      router.push("/search?" + url.toString());
    }
  };

  return (
    <>
      {/* {fixedKeyword && (
        <FixedKeywordContainer>
          Did you mean:&nbsp;
          <span
            onClick={() => {
              window.location.href = `/search?keyword=${fixedKeyword}`;
            }}
          >
            {fixedKeyword}
          </span>
        </FixedKeywordContainer>
      )} */}
      <Container>
        {deviceType === "desktop" && renderDesktopFilters()}
        {deviceType === "mobile" && renderMobileFilters()}
        {deviceType === "mobile" && (
          <Tabs
            onClickTab={(value) => setSortType(value)}
            selectedTabValue={filters["sortBy"] ? filters["sortBy"][0] : null}
            type="mobile"
            tabItems={[
              ...sortTabItems,
              {
                reactNode: (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingRight: "4px",
                    }}
                  >
                    <FilterAltIcon
                      key="filter"
                      style={{ color: "rgba(0,0,0,0.8)" }}
                      onClick={() => setOpenMobileFilters(true)}
                    />
                  </div>
                ),
                value: "filter-btn",
                disabled: true,
              },
            ]}
          />
        )}
        <Right>
          <>
            {deviceType === "desktop" && (
              <RightHeader>
                <Tabs
                  onClickTab={(value) => setSortType(value)}
                  selectedTabValue={
                    filters["sortBy"] ? filters["sortBy"][0] : null
                  }
                  style={{ width: "90%" }}
                  type="desktop"
                  tabItems={sortTabItems}
                />
                <Paging
                  style={{ flex: "1" }}
                  current_page={products ? products.current_page : 0}
                  has_next={products ? products.has_next : false}
                  total_page={products ? products.total_page : 0}
                />
              </RightHeader>
            )}
            {deviceType === "desktop" && (
              <ProductsContainer ref={productsContainerRef}>
                {products &&
                  products.data.map((product, pIndex) => (
                    <ProductItem key={pIndex} product={product} />
                  ))}
              </ProductsContainer>
            )}
          </>

          {deviceType === "mobile" && <MobileList />}

          {isLoadingProducts && (
            <div
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loading />
            </div>
          )}
        </Right>
        {!isLoadingProducts &&
          products.data.length === 0 &&
          deviceType === "desktop" && <EmptyContainer>Empty</EmptyContainer>}
      </Container>
    </>
  );
};

export default SearchView;
