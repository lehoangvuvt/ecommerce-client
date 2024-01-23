"use client";

import useStore from "@/store/store";
import { TCategory, TStoreDetails } from "@/types/api.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

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

const StoreInfoContainer = styled.div`
  height: 130px;
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const StoreAvatarContainer = styled.div<{ $bg: string }>`
  width: 32%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => `url('${props.$bg}')`};
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  overflow: hidden;
  .cover {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(1px);
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 10px 20px;
    .avatar {
      width: 25%;
      aspect-ratio: 1;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
    }
    .name {
      flex: 1;
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 0.98);
      font-weight: 400;
      font-size: 20px;
    }
  }
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

const StoreOverviewContainer = styled.div`
  height: 100%;
  flex: 1;
`;

type Props = {
  details: TStoreDetails;
};

const StoreView: React.FC<Props> = ({ details }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const { setInStoreId } = useStore();

  useEffect(() => {
    setInStoreId(details.id);
    if (details.products.length > 0) {
      const categories: TCategory[] = [];
      details.products.forEach((product) => {
        const category = product.category;
        if (
          categories.findIndex(
            (_category) => _category.slug === category.slug
          ) === -1
        ) {
          categories.push(category);
        }
      });
      setCategories(categories);
    }
    return () => {
      setInStoreId(null);
    };
  }, []);

  return (
    <Container>
      <Header>
        <StoreInfoContainer>
          <StoreAvatarContainer $bg={details.background_url}>
            <div className="cover">
              <div className="avatar">
                <Image
                  src={details.avatar_url}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  alt={`/${details.url}`}
                />
              </div>
              <div className="name">{details.name}</div>
            </div>
          </StoreAvatarContainer>
          <StoreOverviewContainer>
            Products: {details.products.length}
          </StoreOverviewContainer>
        </StoreInfoContainer>
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
                {category.category_name}
              </ViewTab>
            ))}
        </ViewTabs>
      </Header>
    </Container>
  );
};

export default StoreView;
