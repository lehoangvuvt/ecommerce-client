"use client";

import { useSearchParams, useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  font-size: 14px;
  @media (max-width: 400px) {
    flex-flow: column wrap;
  }
`;

const SortTab = styled.div`
  width: 90px;
  padding: 5px;
  @media (max-width: 400px) {
    width: 95%;
  }
  &:nth-child(1) {
    margin-left: 10px;
    @media (max-width: 400px) {
      margin-left: 0px;
    }
  }
  cursor: pointer;
  &.selected {
    background: red;
    color: white;
  }
  color: black;
  background: white;
  font-size: 14px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type TSortType = "pop" | "ctime" | "sales";
type Props = {
  style?: React.CSSProperties;
};

const SortTabs: React.FC<Props> = ({ style }) => {
  const params = useSearchParams();
  const router = useRouter();

  const getClassName = (sortType: TSortType) => {
    if (params.get("sortBy")) {
      return sortType === (params.get("sortBy") as TSortType) ? "selected" : "";
    }
    return "";
  };

  const setSortType = (sortType: TSortType) => {
    // const currentParams: { [key: string]: string[] } = {};
    // const url = new URLSearchParams();
    // for (const key of params.keys()) {
    //   currentParams[key] = params.get(key)!.split(",");
    // }
    // for (let key in currentParams) {
    //   const value = currentParams[key]
    //     .reduce((prev, current) => prev + "," + current, "")
    //     .substring(1);
    //   url.set(key, value);
    // }
    // url.set("sortBy", sortType);
    // router.push("/search?" + url.toString());
  };

  return (
    <Container style={style}>
      Sort by
      <SortTab
        onClick={() => setSortType("pop")}
        className={getClassName("pop")}
      >
        Popular
      </SortTab>
      <SortTab
        onClick={() => setSortType("ctime")}
        className={getClassName("ctime")}
      >
        Latest
      </SortTab>
      <SortTab
        onClick={() => setSortType("sales")}
        className={getClassName("sales")}
      >
        Top Sales
      </SortTab>
    </Container>
  );
};

export default SortTabs;
