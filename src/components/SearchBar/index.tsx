"use client";

import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useEffect, useState } from "react";
import useStore from "@/store/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useScreenWidth from "@/hooks/useScreenWidth";

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
  overflow: hidden;
`;

const MobileSearchBar = styled.form`
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    width: calc(100% - 60px);
    justify-content: flex-start;
    padding-left: 10px;
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

const SearchBar = () => {
  const { filters, addFilterValues, setNewFilters } = useStore();
  const [searchText, setSearchText] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [isOpenMobileSearchBar, setOpenMobileSearchBar] = useState(false);
  const { deviceType } = useScreenWidth();
  const searchParams = useSearchParams();

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

  return deviceType === "desktop" ? (
    <DesktopSearchBar onSubmit={onSubmit}>
      <SearchIconContainer>
        <SearchIcon color="inherit" fontSize="inherit" />
      </SearchIconContainer>
      <InputField
        placeholder="Search products, categories, stores,..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <SearchButton type="submit">Search</SearchButton>
    </DesktopSearchBar>
  ) : (
    <MobileSearchBar onSubmit={onSubmit}>
      <FakeInputField onClick={() => setOpenMobileSearchBar(true)}>
        {searchText.length > 0 ? searchText : "What are you looking for today?"}
      </FakeInputField>
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
