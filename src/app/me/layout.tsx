"use client";

import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
`;

const SideMenu = styled.div`
  width: 22%;
  background-color: yellow;
`;

const Content = styled.div`
  flex: 1;
  height: 500px;
  background-color: red;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <SideMenu></SideMenu>
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
