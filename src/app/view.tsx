"use client";

import Carousel from "@/components/Carousel";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  position: relative;
  min-height: 200vh;
`;

const HomeView = () => {
  return (
    <Container>
      <Carousel style={{ height: "100vh" }} />
    </Container>
  );
};

export default HomeView;
