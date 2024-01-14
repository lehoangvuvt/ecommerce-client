"use client";

import Link from "next/link";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { usePathname } from "next/navigation";

const SubMenuMobileContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  box-shadow: 0px -5px 5px -5px rgba(0, 0, 0, 0.05);
  z-index: 500;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-flow: row wrap;
`;

const SubMenuMobileItem = styled(Link)`
  height: 100%;
  width: 25%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  min-width: 0;
  &.selected {
    color: red;
  }
  .icon {
    font-size: 21px;
  }
`;

const SubMenuMobile = () => {
  const pathname = usePathname();

  return (
    <SubMenuMobileContainer>
      <SubMenuMobileItem
        className={pathname === "/" ? "selected" : ""}
        href="/"
      >
        <HomeIcon className="icon" color="inherit" fontSize="inherit" />
        Home
      </SubMenuMobileItem>
      <SubMenuMobileItem
        className={pathname === "/seller" ? "selected" : ""}
        href="/seller"
      >
        <StorefrontIcon className="icon" color="inherit" fontSize="inherit" />
        Seller Centre
      </SubMenuMobileItem>
      <SubMenuMobileItem
        className={pathname === "/sign-up" ? "selected" : ""}
        href="/sign-up"
      >
        <AppRegistrationIcon
          className="icon"
          color="inherit"
          fontSize="inherit"
        />
        Sign Up
      </SubMenuMobileItem>
      <SubMenuMobileItem
        className={pathname === "/login" ? "selected" : ""}
        href="/login"
      >
        <LoginIcon className="icon" color="inherit" fontSize="inherit" />
        Login
      </SubMenuMobileItem>
    </SubMenuMobileContainer>
  );
};

export default SubMenuMobile;
