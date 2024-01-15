"use client";

import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "/public/icon/logo.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useScreenWidth from "@/hooks/useScreenWidth";
import Link from "next/link";

const headerHeight = 150;

const FullHeader = styled.div`
  width: 100%;
  background: white;
  position: relative;
  top: 0;
  left: 0;
  height: ${headerHeight}px;
  margin-top: 0px;
  transition: all 0.2s ease-out;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  &.hide {
    margin-top: calc(-${headerHeight}px);
  }
`;

const MainContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
`;

const SubContainer = styled.div`
  height: 40px;
  width: 90%;
  display: flex;
  align-items: center;
`;

const SubContainerLeft = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
`;

const SubContainerRight = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SubContainerLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  font-size: 13px;
  position: relative;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

const Line = styled.div`
  height: 50%;
  width: 1px;
  background: rgba(0, 0, 0, 0.4);
`;

const HeaderLeftContainer = styled.div`
  width: calc((100% - 70%) / 2);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  div {
    &.menu {
      width: 18%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      cursor: pointer;
      font-size: 24px;
    }
    &.logo {
      width: 55px;
      aspect-ratio: 1;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      margin-left: 37%;
      @media (max-width: 768px) {
        width: 40px;
        margin-left: 10px;
      }
      img {
        transition: filter 0.2s ease;
        cursor: pointer;
        &:hover {
          filter: grayscale(90%);
        }
      }
    }
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeaderCenterContainer = styled.div`
  width: 70%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const HeaderRightContainer = styled.div`
  width: calc((100% - 70%) / 2);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  font-size: 26px;
  color: black;
  @media (max-width: 768px) {
    justify-content: center;
    flex: 1;
  }
`;

const MiniHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.025);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px 0px;
  animation: stickyHeaderAppear 0.25s ease-in;
  display: flex;
  align-items: center;
  @keyframes stickyHeaderAppear {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  }
  @media (max-width: 768px) {
    flex-flow: column;
  }
`;

const disableMiniHeaderRoutes: string[] = [];
const enableMobileHeaderRoutes: string[] = ["/", "/search"];

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpenSubMenuMobile, setOpenSubMenuMobile] = useState(false);
  const { deviceType } = useScreenWidth();

  const handleScroll = () => {
    if (!disableMiniHeaderRoutes.includes(pathname)) {
      if (window.scrollY > headerHeight * 1.5) {
        if (!isHidden) {
          setIsHidden(true);
        }
      } else {
        if (window.scrollY === 0) {
          setIsHidden(false);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [pathname]);

  const HeaderLeftDesktop = () => {
    return (
      <HeaderLeftContainer>
        <div className="logo">
          <Image
            onClick={() => router.push("/")}
            alt="logo"
            src={logo}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </HeaderLeftContainer>
    );
  };

  const HeaderLeftMobile = () => {
    return (
      <HeaderLeftContainer>
        <div className="logo">
          <Image
            onClick={() => router.push("/")}
            alt="logo"
            src={logo}
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>
      </HeaderLeftContainer>
    );
  };

  const HeaderCenterDesktop = () => {
    return (
      <HeaderCenterContainer>
        <SearchBar />
      </HeaderCenterContainer>
    );
  };

  const HeaderCenterMobile = () => {
    return (
      <HeaderCenterContainer>
        <SearchBar />
        <ShoppingCartIcon
          color="inherit"
          fontSize="inherit"
          style={{
            fontSize: "23px",
            margin: "auto",
          }}
        />
      </HeaderCenterContainer>
    );
  };

  const HeaderRight = () => {
    return (
      <HeaderRightContainer>
        <ShoppingCartIcon color="inherit" fontSize="inherit" />
      </HeaderRightContainer>
    );
  };

  const renderDesktopHeader = () => {
    return (
      <>
        <FullHeader className={isHidden ? "hide" : "show"}>
          <SubContainer>
            <SubContainerLeft>
              <SubContainerLink href="/">Seller Centre</SubContainerLink>
              <Line />
              <SubContainerLink href="/">Download</SubContainerLink>
              <Line />
              <SubContainerLink href="/" className="last">
                Follow us
              </SubContainerLink>
            </SubContainerLeft>
            <SubContainerRight>
              <SubContainerLink href="/sign-up">Sign Up</SubContainerLink>
              <Line />
              <SubContainerLink href="/login" className="last">
                Login
              </SubContainerLink>
            </SubContainerRight>
          </SubContainer>
          <MainContainer>
            <HeaderLeftDesktop />
            <HeaderCenterDesktop />
            <HeaderRight />
          </MainContainer>
        </FullHeader>
        {isHidden && (
          <MiniHeader>
            <HeaderLeftDesktop />
            <HeaderCenterDesktop />
            <HeaderRight />
          </MiniHeader>
        )}
      </>
    );
  };

  const renderMobileHeader = () => {
    return (
      <MiniHeader>
        {/* <HeaderLeftMobile /> */}
        <HeaderCenterMobile />
      </MiniHeader>
    );
  };

  return (
    <>
      {deviceType === "desktop" && renderDesktopHeader()}
      {deviceType === "mobile" &&
        enableMobileHeaderRoutes.includes(pathname) &&
        renderMobileHeader()}
    </>
  );
};

export default Header;
