"use client";

import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "/public/icon/logo.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useScreenWidth from "@/hooks/useScreenWidth";

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

const SubContainerLink = styled.div`
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
  justify-content: center;
  position: relative;
  & > div {
    width: 55px;
    aspect-ratio: 1;
    @media (max-width: 768px) {
      width: 45px;
    }
    img {
      transition: filter 0.2s ease;
      cursor: pointer;
      &:hover {
        filter: grayscale(90%);
      }
    }
  }
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const HeaderCenterContainer = styled.div`
  width: 70%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 768px) {
    width: 35%;
    justify-content: flex-end;
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
`;

const disableMiniHeaderRoutes: string[] = [];

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { deviceType } = useScreenWidth();

  const handleScroll = () => {
    if (!disableMiniHeaderRoutes.includes(pathname)) {
      if (window.scrollY > headerHeight) {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const HeaderLeft = () => {
    return (
      <HeaderLeftContainer>
        <div>
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

  const HeaderCenter = () => {
    return (
      <HeaderCenterContainer>
        <SearchBar />
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
            <SubContainerLink>Seller Centre</SubContainerLink>
            <Line />
            <SubContainerLink>Download</SubContainerLink>
            <Line />
            <SubContainerLink className="last">Follow us</SubContainerLink>
          </SubContainer>
          <MainContainer>
            <HeaderLeft />
            <HeaderCenter />
            <HeaderRight />
          </MainContainer>
        </FullHeader>
        {isHidden && (
          <MiniHeader>
            <HeaderLeft />
            <HeaderCenter />
            <HeaderRight />
          </MiniHeader>
        )}
      </>
    );
  };

  const renderMobileHeader = () => {
    return (
      <MiniHeader>
        <HeaderLeft />
        <HeaderCenter />
        <HeaderRight />
      </MiniHeader>
    );
  };

  return deviceType === "desktop"
    ? renderDesktopHeader()
    : renderMobileHeader();
};

export default Header;
