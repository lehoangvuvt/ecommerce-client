"use client";

import { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import useScreenWidth from "@/hooks/useScreenWidth";
import SubMenuMobile from "./SubMenuMobile";
import Path from "./Path";

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
const noPathRoutes: string[] = ["/", "/login", "/sign-up", "/cart"];
const withSubMenuRoutes: string[] = ["/", "/search", "/login", "/sign-up"];

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const { deviceType } = useScreenWidth();

  return (
    <Container>
      {!noHeaderRoutes.includes(pathname) && <Header />}
      <Content>
        {!noPathRoutes.includes(pathname) && deviceType === "desktop" && (
          <Path />
        )}
        {children}
      </Content>
      {!noFooterRoutes.includes(pathname) && deviceType === "desktop" && (
        <Footer />
      )}
      {deviceType === "mobile" && withSubMenuRoutes.includes(pathname) && (
        <SubMenuMobile />
      )}
    </Container>
  );
};

export default Layout;
