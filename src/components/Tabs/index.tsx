"use client";

import useStore from "@/store/store";
import { useSearchParams, useRouter } from "next/navigation";
import styled from "styled-components";

const ContainerDesktop = styled.div`
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

const TabDestop = styled.div`
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

const ContainerMobile = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 400;
  display: flex;
  flex-flow: row;
  background-color: white;
`;

const TabMobile = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;
  &.selected {
    color: #df2029;
    border-bottom: 3px solid red;
  }
  border-bottom: 3px solid transparent;
  color: rgba(0, 0, 0, 0.5);
  background: white;
  font-size: 13px;
  display: flex;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  @media (max-width: 260px) {
    font-size: 5vw;
  }
`;

export type TTabItem = {
  value: string;
  disabled?: boolean;
  reactNode: React.ReactNode;
};

type Props = {
  style?: React.CSSProperties;
  type: "desktop" | "mobile";
  tabItems: TTabItem[];
  selectedTabValue: string | null;
  onClickTab: (tabValue: string) => void;
};

const Tabs: React.FC<Props> = ({
  style,
  type,
  selectedTabValue,
  onClickTab,
  tabItems = [],
}) => {
  const getClassName = (tabValue: string) => {
    if (!selectedTabValue || selectedTabValue !== tabValue) return "";
    return "selected";
  };

  const setType = (tabValue: string) => {
    // const url = new URLSearchParams();
    // for (let key in filters) {
    //   const queryKey = key;
    //   const value = filters[queryKey]
    //     .reduce((prev, curr) => `${prev},${curr}`, "")
    //     .substring(1);
    //   url.set(queryKey, value);
    // }
    // url.set("By", Type);
    // router.push("/search?" + url.toString());
  };

  return (
    <>
      {type === "desktop" && (
        <ContainerDesktop style={style}>
          {tabItems.map((item, i) => (
            <TabDestop
              key={i}
              onClick={() => !item.disabled && onClickTab(item.value)}
              className={getClassName(item.value)}
            >
              {item.reactNode}
            </TabDestop>
          ))}
        </ContainerDesktop>
      )}

      {type === "mobile" && (
        <ContainerMobile style={style}>
          {tabItems.map((item, i) => (
            <TabMobile
              key={i}
              onClick={() => !item.disabled && onClickTab(item.value)}
              className={getClassName(item.value)}
            >
              {item.reactNode}
            </TabMobile>
          ))}
        </ContainerMobile>
      )}
    </>
  );
};

export default Tabs;
