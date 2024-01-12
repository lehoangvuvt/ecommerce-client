"use client";

import { ReactNode, useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import { usePathname } from "next/navigation";

const Container = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
`;

const Content = styled.div`
  min-height: calc(100vh - 150px);
  flex: 1;
  background: rgba(0, 0, 0, 0.03);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
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
