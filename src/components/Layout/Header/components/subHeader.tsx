"use client";

import Link from "next/link";
import styled from "styled-components";
import { Line } from "..";
import useStore from "@/store/store";
import defaultAvatar from "/public/images/misc/default-avatar.jpg";
import Image from "next/image";

const Container = styled.div`
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

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const SubHeader = () => {
  const { userInfo } = useStore();

  return (
    <Container>
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
        {!userInfo && (
          <>
            <SubContainerLink href="/sign-up">Sign Up</SubContainerLink>
            <Line />
            <SubContainerLink href="/login" className="last">
              Login
            </SubContainerLink>
          </>
        )}
        {userInfo && (
          <UserAvatar>
            <Image
              alt="user-avatar"
              src={defaultAvatar.src}
              width={28}
              height={28}
            />
            {userInfo.username}
          </UserAvatar>
        )}
      </SubContainerRight>
    </Container>
  );
};

export default SubHeader;
