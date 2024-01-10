"use client";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background: red;
  position: fixed;
  top: 0;
  left: 0;
  padding: 45px 0px;
  z-index: 500;
`;

const Header = () => {
  return <Container></Container>;
};

export default Header;
