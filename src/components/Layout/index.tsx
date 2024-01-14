"use client";

import { ReactNode, useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import useScreenWidth from "@/hooks/useScreenWidth";
import SubMenuMobile from "./SubMenuMobile";

const Container = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
`;

const Content = styled.div`
  background: rgba(0, 0, 0, 0.03);
  position: relative;
`;

type Props = {
  children: ReactNode;
};
const noHeaderRoutes: string[] = ["/login"];
const noFooterRoutes: string[] = [];

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const { deviceType } = useScreenWidth();

  return (
    <Container>
      {!noHeaderRoutes.includes(pathname) && <Header />}
      <Content>{children}</Content>
      {!noFooterRoutes.includes(pathname) && <Footer />}
      {deviceType === "mobile" && <SubMenuMobile />}
    </Container>
  );
};

export default Layout;
