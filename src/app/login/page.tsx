"use client";

import styled from "styled-components";
import logo from "/public/icon/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextInput from "@/components/TextInput";
import { FormEvent, FormEventHandler, useState } from "react";
import { UserService } from "@/services/user.service";
import useStore from "@/store/store";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;

const Header = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 15%;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 10px 15%;
  }
`;

const HeaderLogo = styled.div`
  position: relative;
  height: 55px;
  aspect-ratio: 1;
  cursor: pointer;
  transition: filter 0.2s ease;
  &:hover {
    filter: grayscale(90%);
  }
  @media (max-width: 555px) {
    height: 45px;
  }
`;

const HeaderTitle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
`;

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: url("https://www.reuters.com/resizer/fQ1zJp9tGQGreUUEtRMP4g8ALBU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/PRJVXVFTVRMPPCS7FTJM3G3IDI.jpg");
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LoginForm = styled.form`
  width: 380px;
  padding: 20px;
  background: white;
  height: 400px;
  margin-right: 15%;
  border-radius: 3px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    margin-right: 0px;
  }
`;

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const { setUserInfo } = useStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await UserService.login(username, pw);
    if (response) {
      setUserInfo(response);
      router.push("/");
    }
  };

  return (
    <Container>
      <Header>
        <HeaderLogo>
          <Image
            onClick={() => router.push("/")}
            src={logo}
            fill
            alt="logo"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </HeaderLogo>
        <HeaderTitle>Log In</HeaderTitle>
      </Header>
      <Main>
        <LoginForm onSubmit={handleSubmit}>
          <TextInput
            maxLength={10}
            placeholder="Enter username"
            value={username}
            onChange={setUsername}
          />
          <TextInput
            placeholder="Enter password"
            type="password"
            value={pw}
            onChange={setPw}
          />
          <button type="submit">Login</button>
        </LoginForm>
      </Main>
    </Container>
  );
};

export default Page;
