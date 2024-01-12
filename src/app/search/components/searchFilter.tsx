"use client";

import styled from "styled-components";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useStore from "@/store/store";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  @media (max-width: 768px) {
    width: 50%;
  }
  margin-bottom: 10px;
`;

const FilterName = styled.div`
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  text-transform: capitalize;
  font-size: 15px;
`;

const FilterValues = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  padding: 0px 15px;
  box-sizing: border-box;
  gap: 10px;
`;

const FilterValue = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 15px;
  text-transform: capitalize;
`;

const Checkbox = styled.div`
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;

type Props = {
  queryKey: string;
  name: string;
  values: any[];
};

const SearchFilter: React.FC<Props> = ({ name, queryKey, values }) => {
  const { filters, addFilterValue, removeFilterValue, setNewFilters } =
    useStore();

  const handleChangeFilterValue = (value: any) => {
    if (filters[queryKey] && filters[queryKey].includes(value)) {
      if (filters[queryKey].length > 1) {
        removeFilterValue(queryKey, value);
      } else {
        const newFilters = Object.assign({}, filters);
        delete newFilters[queryKey];
        setNewFilters(newFilters);
      }
    } else {
      addFilterValue(queryKey, value);
    }
  };

  return (
    <Container>
      <FilterName>{name}</FilterName>
      <FilterValues>
        {values.map((value, index) => (
          <FilterValue
            onClick={() => handleChangeFilterValue(value)}
            key={index}
          >
            {filters[queryKey] && filters[queryKey].includes(value) ? (
              <Checkbox>
                <DoneIcon fontSize="inherit" color="inherit" />
              </Checkbox>
            ) : (
              <Checkbox></Checkbox>
            )}
            {value}
          </FilterValue>
        ))}
      </FilterValues>
    </Container>
  );
};

export default SearchFilter;
