"use client";

import Carousel from "@/components/Carousel";
import styled from "styled-components";
import banner0 from "/public/images/home/carousel/banner-0.png";
import banner1 from "/public/images/home/carousel/banner-1.jpg";
import banner2 from "/public/images/home/carousel/banner-2.jpg";
import banner3 from "/public/images/home/carousel/banner-3.jpg";
import Spinner from "@/components/Spinner";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  position: relative;
  min-height: 200vh;
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const HomeView = () => {
  return (
    <Container style={{ display: "flex", alignItems: "center" }}>
      <Carousel
        style={{ width: "89%", aspectRatio: 4, marginTop: '20px' }}
        images={[banner0.src, banner1.src, banner2.src, banner3.src]}
      />
    </Container>
  );
};

export default HomeView;
