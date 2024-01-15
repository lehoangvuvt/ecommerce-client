"use client";

import useStore from "@/store/store";
import { usePathname, useSearchParams } from "next/navigation";
import styled from "styled-components";

const PathContainer = styled.div`
  width: 100%;
  padding: 20px 11% 10px 11%;
  margin: auto;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.8);
`;

const Path = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { path } = useStore();

  const getPath = (path: string[]) => {
    let pathString = "";
    if (pathname === "/search") {
      path.forEach((item, i) => {
        if (i === path.length - 1) {
          pathString += `Search results for "${searchParams.get("keyword")}"`;
        } else {
          pathString += `${item} > `;
        }
      });
    } else {
      path.forEach((item, i) => {
        if (i === path.length - 1) {
          pathString += item;
        } else {
          pathString += `${item} > `;
        }
      });
    }
    return pathString;
  };

  return <PathContainer>{getPath(path)}</PathContainer>;
};

export default Path;
