"use client";

import useStore, { TPathItem } from "@/store/store";
import ROUTES from "@/types/routes";
import { useRouter } from "next/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "styled-components";

const PathContainer = styled.div`
  width: 100%;
  padding: 25px 11% 10px 11.1%;
  margin: auto;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.8);
  display: flex;
  gap: 5px;
  align-items: center;
  font-weight: 400;
`;

const PathItemNotLink = styled.div`
  color: rgba(0, 0, 0, 1);
`;

const PathItemLink = styled.div`
  color:  #0000EE;
  cursor: pointer;
`;

const Path = () => {
  const router = useRouter();
  const { path } = useStore();

  const handleOnClickPathItem = (pItem: TPathItem) => {
    let url = "";
    switch (pItem.route) {
      case ROUTES.HOME:
        url = `${pItem.route}/${pItem.value}`;
        break;
      case ROUTES.SEARCH:
        url = `${pItem.route}${pItem.value}`;
        break;
    }
    router.push(url);
  };

  const renderPath = (path: TPathItem[]) => {
    return path.map((pItem, pIndex) =>
      pItem.isLink ? (
        <PathItemLink onClick={() => handleOnClickPathItem(pItem)} key={pIndex}>
          {pItem.name}{" "}
          <ArrowForwardIosIcon
            color="inherit"
            fontSize="inherit"
            style={{
              fontSize: "15px",
              color: "black",
              marginBottom: "2px",
            }}
          />
        </PathItemLink>
      ) : (
        <PathItemNotLink key={pIndex}>
          {pItem.name}{" "}
          {pIndex < path.length - 1 && (
            <ArrowForwardIosIcon
              color="inherit"
              fontSize="inherit"
              style={{
                fontSize: "15px",
                color: "black",
                marginBottom: "2px",
              }}
            />
          )}
        </PathItemNotLink>
      )
    );
  };

  return <PathContainer>{renderPath(path)}</PathContainer>;
};

export default Path;
