"use client";

import { ReactNode, useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import { usePathname } from "next/navigation";

const Container = styled.div`
  position: absolute;
  top: 92px;
  left: 0;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-flow: row wrap;
`;

const Content = styled.div`
  height: 100%;
  flex: 1;
  background: rgba(0, 0, 0, 0.05);
  overflow-x: hidden;
  overflow-y: auto;
`;

type Props = {
  children: ReactNode;
};
const noHeaderRoutes: string[] = [];

const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <Container>
      {!noHeaderRoutes.includes(pathname) && <Header />}
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
