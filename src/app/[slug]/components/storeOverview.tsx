"use client";

import MyButton from "@/components/Button";
import useStore from "@/store/store";
import { TStoreOverview } from "@/types/api.type";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  height: 130px;
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  gap: 5px;
  border-radius: 4px;
  @media (max-width: 768px) {
    flex-flow: column;
    height: auto;
  }
`;

const StoreAvatarContainer = styled.div<{ $bg: string; $withBG: boolean }>`
  width: 32%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.$withBG ? `url('${props.$bg}')` : "white")};
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  overflow: hidden;
  border-right: ${(props) =>
    props.$withBG ? "none" : "1px solid rgba(0,0,0,0.1)"};
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
  }
  .cover {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(1px);
    background-color: ${(props) =>
      props.$withBG ? "rgba(0, 0, 0, 0.6)" : "white"};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 10px 20px;
    @media (max-width: 768px) {
      padding: 5px 10px;
    }

    .avatar {
      cursor: pointer;
      width: 25%;
      aspect-ratio: 1;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
    }
    &__left {
      flex: 1;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      gap: 6px;
      color: ${(props) =>
        props.$withBG ? "rgba(255, 255, 255, 0.98)" : "black"};
      height: 100%;
      &__name {
        color: ${(props) =>
          props.$withBG ? "rgba(255, 255, 255, 0.98)" : "black"};
        font-weight: 400;
        font-size: 16px;
      }
      &__buttons {
        width: 100%;
        display: flex;
        gap: 5px;
        align-items: center;
      }
    }
  }
`;

const StoreStatsContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
  padding-left: 30px;
  @media (max-width: 768px) {
    flex-flow: column wrap;
    width: 100%;
    padding: 0px 5px;
  }
`;

const StoreStat = styled.div`
  width: 28%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
  p {
    font-size: 14px;
    &:nth-child(1) {
      color: rgba(0, 0, 0, 0.85);
    }
    &:nth-child(2) {
      color: red;
    }
  }
`;

type Props = {
  overview: TStoreOverview;
  style?: React.CSSProperties;
  withBG?: boolean;
};

const StoreOverview: React.FC<Props> = ({ overview, style, withBG = true }) => {
  const router = useRouter();
  const { inStoreId } = useStore();

  return (
    <Container style={style}>
      <StoreAvatarContainer $withBG={withBG} $bg={overview.background_url}>
        <div className="cover">
          <div
            className="avatar"
            onClick={() => router.push(`/${overview.url}`)}
          >
            <Image
              src={overview.avatar_url}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              alt="store-avatar"
            />
          </div>
          <div className="cover__left">
            <div className="cover__left__name">{overview.name}</div>
            {!inStoreId && (
              <div className="cover__left__buttons">
                <MyButton
                  background="white"
                  fontColor="rgba(0,0,0,0.85)"
                  onClick={() => router.push(`/${overview.url}`)}
                  fontSize="14px"
                  height="auto"
                  width="auto"
                  customStyle={{
                    padding: "2.5px 15px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    textAlign: "center",
                    verticalAlign: "middle",
                    borderRadius: "2px",
                  }}
                >
                  View Shop
                </MyButton>
              </div>
            )}
          </div>
        </div>
      </StoreAvatarContainer>
      <StoreStatsContainer>
        <StoreStat>
          <p>Ratings</p>
          <p>
            {overview.average_rating} ({overview.total_ratings_count} Rating)
          </p>
        </StoreStat>
        <StoreStat>
          <p>Products</p>
          <p>{overview.total_products_count}</p>
        </StoreStat>
        <StoreStat>
          <p>Follower</p>
          <p>{overview.total_followers_count}</p>
        </StoreStat>
        <StoreStat>
          <p>Joined</p>
          <p>{moment(new Date(overview.createdAt)).fromNow()}</p>
        </StoreStat>
      </StoreStatsContainer>
    </Container>
  );
};

export default StoreOverview;
