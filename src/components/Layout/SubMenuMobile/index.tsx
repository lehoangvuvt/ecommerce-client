"use client";

import Link from "next/link";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { usePathname } from "next/navigation";
import useStore from "@/store/store";
import defaultAvatar from "/public/images/misc/default-avatar.jpg";
import Image from "next/image";

const SubMenuMobileContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
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
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  &.selected {
    color: #df2029;
  }
  .icon {
    font-size: 21px;
  }
  .username {
    text-overflow: ellipsis;
    white-space: normal;
    overflow: hidden;
    width: 100%;
    background-color: yellow;
    height: 20px;
  }
`;

const SubMenuMobileItemTop = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  padding-top: 4px;
`;
const SubMenuMobileItemBottom = styled.div`
  height: 50%;
  width: 80%;
  text-align: center;
  box-sizing: border-box;
  padding-top: 0.5;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const UserAvatar = styled.div`
  width: 22px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  background-color: red;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const SubMenuMobile = () => {
  const pathname = usePathname();
  const { userInfo } = useStore();

  return (
    <SubMenuMobileContainer>
      <SubMenuMobileItem
        className={pathname === "/" ? "selected" : ""}
        href="/"
      >
        <SubMenuMobileItemTop>
          <HomeIcon className="icon" color="inherit" fontSize="inherit" />
        </SubMenuMobileItemTop>
        <SubMenuMobileItemBottom>Home</SubMenuMobileItemBottom>
      </SubMenuMobileItem>
      <SubMenuMobileItem
        className={pathname === "/seller" ? "selected" : ""}
        href="/seller"
      >
        <SubMenuMobileItemTop>
          <StorefrontIcon className="icon" color="inherit" fontSize="inherit" />
        </SubMenuMobileItemTop>
        <SubMenuMobileItemBottom>Seller</SubMenuMobileItemBottom>
      </SubMenuMobileItem>
      <SubMenuMobileItem
        className={pathname === "/sign-up" ? "selected" : ""}
        href="/sign-up"
      >
        <SubMenuMobileItemTop>
          <AppRegistrationIcon
            className="icon"
            color="inherit"
            fontSize="inherit"
          />
        </SubMenuMobileItemTop>
        <SubMenuMobileItemBottom>Sign Up</SubMenuMobileItemBottom>
      </SubMenuMobileItem>
      {!userInfo && (
        <SubMenuMobileItem
          className={pathname === "/login" ? "selected" : ""}
          href="/login"
        >
          <SubMenuMobileItemTop>
            <LoginIcon className="icon" color="inherit" fontSize="inherit" />
          </SubMenuMobileItemTop>
          <SubMenuMobileItemBottom>Login</SubMenuMobileItemBottom>
        </SubMenuMobileItem>
      )}
      {userInfo && (
        <SubMenuMobileItem
          className={pathname === "/login" ? "selected" : ""}
          href="/me"
        >
          <SubMenuMobileItemTop>
            <UserAvatar>
              <Image
                alt="user-avatar"
                src={defaultAvatar.src}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </UserAvatar>
          </SubMenuMobileItemTop>
          <SubMenuMobileItemBottom>{userInfo.username}</SubMenuMobileItemBottom>
        </SubMenuMobileItem>
      )}
    </SubMenuMobileContainer>
  );
};

export default SubMenuMobile;
