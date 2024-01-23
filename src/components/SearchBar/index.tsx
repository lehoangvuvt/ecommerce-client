"use client";

import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useEffect, useState } from "react";
import useStore from "@/store/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useScreenWidth from "@/hooks/useScreenWidth";
import BackButton from "../BackButton";
import usePopularSearchTerms from "@/react-query/hooks/usePopularSearchTerms";
import { TSearchTerm } from "@/types/api.type";
import useSuggestedSearchTerms from "@/react-query/hooks/useSuggestedSearchTerms";

const DesktopSearchBar = styled.form`
  width: 90%;
  background: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 8px 0px;
  position: relative;
`;

const MobileSearchBar = styled.form`
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    width: calc(100% - 40px);
    justify-content: flex-end;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const InputField = styled.input`
  width: calc(95% - 75px);
  padding: 0px 11px;
  outline: none;
  border: none;
  box-sizing: border-box;
  font-size: 14px;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  min-width: 0;
  @media (max-width: 768px) {
    width: 98%;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 6px 8px;
  }
`;

const FakeInputField = styled.div`
  outline: none;
  box-sizing: border-box;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 98%;
  white-space: nowrap;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 6px 8px;
  color: rgba(0, 0, 0, 0.8);
`;

const SearchIconContainer = styled.div`
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.7);
`;

const SearchButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #131418;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  opacity: 0.6;
  height: 100%;
  text-overflow: ellipsis;
  &:hover {
    opacity: 1;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    height: 90%;
    transform: translateY(-50%);
    width: 1px;
    background: #131418;
    opacity: 0.6;
  }
`;

const MobileSearchBarContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 600;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  gap: 15px;
  padding-top: 20px;
  button {
    font-size: 14px;
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const MobileSearchBarInput = styled.input`
  background-color: white;
  width: 80%;
  padding: 6px 8px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  outline: none;
  border-radius: 4px;
`;

const noBackBtnMobileRoutes = ["/"];

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { terms: popTerms } = usePopularSearchTerms();
  const { suggestedTerms } = useSuggestedSearchTerms(searchText);
  const { filters, setNewFilters } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpenMobileSearchBar, setOpenMobileSearchBar] = useState(false);
  const { deviceType } = useScreenWidth();
  const searchParams = useSearchParams();
  const [focus, setFocus] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchText.length > 0) {
      setNewFilters({ keyword: [searchText] });
    }
    if (!pathname.includes("/search") || deviceType === "mobile") {
      if (searchText.length > 0) {
        router.push(`/search?keyword=${searchText}`);
        setOpenMobileSearchBar(false);
      }
    }
  };

  useEffect(() => {
    if (filters["keyword"]) {
      setSearchText(filters["keyword"][0]);
    }
  }, [filters]);

  useEffect(() => {
    if (!searchParams.get("keyword")) {
      const updatedFilters = Object.assign({}, filters);
      delete updatedFilters["keyword"];
      setNewFilters(updatedFilters);
      setSearchText("");
    }
  }, [searchParams]);

  const handleOnBack = () => {
    switch (pathname) {
      case "/search":
        window.location.href = "/";
        break;
    }
  };

  const onClickPopTerm = (popTerm: TSearchTerm) => {
    setSearchText(popTerm.term);
    setNewFilters({ keyword: [popTerm.term] });
    if (!pathname.includes("/search") || deviceType === "mobile") {
      router.push(`/search?keyword=${popTerm.term}`);
      setOpenMobileSearchBar(false);
    }
  };

  return deviceType === "desktop" ? (
    <DesktopSearchBar
      onFocus={(e) => setFocus(true)}
      onBlur={(e) => setTimeout(() => setFocus(false), 100)}
      onSubmit={onSubmit}
    >
      <SearchIconContainer>
        <SearchIcon color="inherit" fontSize="inherit" />
      </SearchIconContainer>
      <InputField
        placeholder="Search products, categories, stores,..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <SearchButton type="submit">Search</SearchButton>
      {focus && (
        <div className="absolute w-[100%] bg-[white] top-[42px] z-50 flex flex-row flex-wrap shadow-md rounded-sm">
          {suggestedTerms.length > 0 && (
            <div className="w-[100%] flex flex-col flex-wrap pt-[5px]">
              {suggestedTerms.map((suggestedTerm, index) => (
                <div
                  onClick={(e) => {
                    onClickPopTerm(suggestedTerm);
                  }}
                  className="w-[100%] py-[5px] px-[15px] text-[16px] text-[rgba(0,0,0,0.8)] cursor-pointer hover:text-[black] hover:bg-[rgba(0,0,0,0.05)]"
                  key={index}
                >
                  {suggestedTerm.term}
                </div>
              ))}
            </div>
          )}
          {popTerms.length > 0 && searchText.length === 0 && (
            <div className="w-[100%] flex flex-row flex-wrap pt-[5px] pb-[6px]">
              <h1 className="pl-[12px] pt-[4px] pb-[6px] text-[14px] w-[100%]">
                Popular search terms
              </h1>
              {popTerms.map((popTerm, index) => (
                <div
                  onClick={(e) => {
                    onClickPopTerm(popTerm);
                  }}
                  className="w-[auto] py-[3px] px-[15px] text-[15px] text-[rgba(0,0,0,0.7)] cursor-pointer hover:text-[rgba(0,0,0,1)] "
                  key={index}
                >
                  {popTerm.term}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </DesktopSearchBar>
  ) : (
    <MobileSearchBar onSubmit={onSubmit}>
      <div
        style={{
          height: "24px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "10px",
        }}
      >
        <BackButton
          customBackFn={handleOnBack}
          style={{
            opacity: !noBackBtnMobileRoutes.includes(pathname) ? "1" : "0",
            pointerEvents: !noBackBtnMobileRoutes.includes(pathname)
              ? "auto"
              : "none",
          }}
        />
        <SearchIcon
          onClick={() => setOpenMobileSearchBar(true)}
          color="inherit"
          fontSize="inherit"
        />
      </div>
      {isOpenMobileSearchBar && (
        <MobileSearchBarContainer>
          <MobileSearchBarInput
            placeholder="Search products, categories, stores,..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              setOpenMobileSearchBar(false);
            }}
          >
            Cancel
          </button>
        </MobileSearchBarContainer>
      )}
    </MobileSearchBar>
  );
};

export default SearchBar;
