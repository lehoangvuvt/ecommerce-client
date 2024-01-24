"use client";

import useStore from "@/store/store";
import { TStoreDetails, TStoreOverview } from "@/types/api.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import StoreOverview from "./components/storeOverview";

const Container = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  padding: 15px 10% 0px 10%;
`;

const ViewTabs = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 5px;
`;

const ViewTab = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1 1 0px;
  flex-basis: 0;
  max-width: 200px;
  font-size: 15px;
  border-bottom: 2px solid white;
  color: black;
  &.selected {
    border-bottom: 2px solid red;
    color: red;
  }
`;

type Props = {
  details: TStoreDetails;
};

const StoreView: React.FC<Props> = ({ details }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [categories, setCategories] = useState<
    { slug: string; name: string }[]
  >([]);
  const { setInStoreId } = useStore();

  useEffect(() => {
    setInStoreId(details.id);
    setCategories(details.overview.category_tabs);
    return () => {
      setInStoreId(null);
    };
  }, []);

  return (
    <Container>
      <Header>
        <StoreOverview overview={details.overview} />
        <ViewTabs>
          <ViewTab
            onClick={() => setActiveTab("home")}
            className={activeTab === "home" ? "selected" : ""}
          >
            Home
          </ViewTab>
          {categories.length > 0 &&
            categories.map((category) => (
              <ViewTab
                className={activeTab === category.slug ? "selected" : ""}
                key={category.slug}
                onClick={() => setActiveTab(category.slug)}
              >
                {category.name}
              </ViewTab>
            ))}
        </ViewTabs>
      </Header>
    </Container>
  );
};

export default StoreView;
