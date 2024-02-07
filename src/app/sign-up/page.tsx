"use client";

import styled from "styled-components";
import logo from "/public/icon/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { UserService } from "@/services/user.service";
import useStore from "@/store/store";
import InputField from "@/components/InputField";
import MyButton from "@/components/Button";

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
  justify-content: center;
  background-image: linear-gradient(90deg, #ff0000aa, #000000be);
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  @media (max-width: 768px) {
    align-items: flex-end;
  }
`;

const LoginForm = styled.form`
  width: 500px;
  padding: 50px 30px 50px 30px;
  background: white;
  border-radius: 3px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    margin-right: 0px;
    height: 100%;
    border-radius: 0px;
    box-shadow: none;
    width: 100%;
    justify-content: flex-start;
    padding: 50px 15px 50px 15px;
  }
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 25px;
`;

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await UserService.signUp({
      username,
      password: pw,
      email,
    });
    if (response) {
      alert(response.message);
    } else {
      alert("failed");
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
        <HeaderTitle>Sign Up</HeaderTitle>
      </Header>
      <Main>
        <LoginForm onSubmit={handleSubmit}>
          <InputField
            type="text"
            value={username}
            onChange={setUsername}
            title="Username"
            style={{ height: "48px" }}
          />
          <InputField
            type="text"
            value={email}
            onChange={setEmail}
            title="Email"
            style={{ height: "48px" }}
          />
          <InputField
            type="password"
            value={pw}
            onChange={setPw}
            title="Password"
            style={{ height: "48px" }}
          />
          <MyButton
            background="red"
            fontColor="white"
            width="100%"
            height="46px"
            disabled={username.length === 0 || pw.length === 0}
            onClick={() => {}}
            fontSize="15px"
            customStyle={{ borderRadius: "4px" }}
          >
            Sign Up
          </MyButton>
          <section>
            {"Already have an account? "}
            <span
              onClick={() => router.push("/login")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Login here
            </span>
          </section>
        </LoginForm>
      </Main>
    </Container>
  );
};

export default Page;
