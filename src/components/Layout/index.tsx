"use client";

import { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import useScreenWidth from "@/hooks/useScreenWidth";
import SubMenuMobile from "./SubMenuMobile";
import Path from "./Path";
import Authentication from "./Authentication";
import useStore from "@/store/store";

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

const noHeaderRoutes: string[] = ["/login", "/sign-up"];
const noFooterRoutes: string[] = [];
const noPathRoutes: string[] = [
  "/",
  "/login",
  "/sign-up",
  "/cart",
  "/check-out",
];
const withSubMenuRoutes: string[] = ["/", "/login", "/sign-up"];

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const { deviceType } = useScreenWidth();
  const checkIfShowPath = () => {
    if (noPathRoutes.includes(pathname)) return false;
    if (
      pathname.startsWith("/order-tracking") ||
      pathname.startsWith("/me") ||
      pathname.startsWith("/verify")
    ) {
      return false;
    }
    if (deviceType === "mobile") return false;
    if (
      pathname.startsWith("/") &&
      pathname.split("/").length === 2 &&
      pathname.length > 1
    ) {
      if (pathname.includes("/search")) return true;
      const wordsSplitArr = pathname.split("/")[1].split(".")[0].split("-");
      const slugTypeSuffix = wordsSplitArr[wordsSplitArr.length - 1];
      if (slugTypeSuffix === "i" || slugTypeSuffix === "cat") return true;
      return false;
    }
    return true;
  };

  return (
    <Container>
      <Authentication />
      {!noHeaderRoutes.includes(pathname) && <Header />}
      <Content>
        {checkIfShowPath() && <Path />}
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
