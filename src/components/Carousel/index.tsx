"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  padding: 20px;
  button {
    background-color: white;
    width: 55px;
    aspect-ratio: 1;
    border-radius: 50%;
    font-size: 24px;
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.8);
    justify-content: center;
  }
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
`;

const BannerImage = styled.div<{ $bgImg: string }>`
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url('${props.$bgImg}')`};
  background-size: cover;
  background-position: center;
`;

type Props = {
  style?: React.CSSProperties;
};

const bannerImgs = [
  "https://www.nylon.com.sg/wp-content/uploads/2020/01/uniqlo-u-banner-.png",
  "https://i0.wp.com/www.nylon.com.sg/wp-content/uploads/2022/02/uniqlo-u-ss22-banner-scaled.jpg",
  "https://conversationsabouther.net/wp-content/uploads/2019/04/asdfghjklefxefxrcdsfdsd-2-1.jpg",
];

const Carousel: React.FC<Props> = ({ style }) => {
  const slideImgs = [
    bannerImgs[bannerImgs.length - 1],
    ...bannerImgs,
    bannerImgs[0],
  ];
  const [currentIndex, setCurrentIndex] = useState(1);
  const currentIndexRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setLoading] = useState(true);
  const [isScrolling, setScrolling] = useState(false);
  const [isAutoplay, setAutoplay] = useState(true);
  const timeOutRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const windowWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: windowWidth,
        behavior: "instant",
      });
      setLoading(false);
      scrollRef.current.addEventListener("scrollend", handleScrollEnd);
    }
  }, [scrollRef.current]);

  const handleScrollEnd = () => {
    setTimeout(() => {
      if (currentIndexRef && currentIndexRef.current)
        if (scrollRef && scrollRef.current) {
          const windowWidth = scrollRef.current.offsetWidth;
          if (currentIndexRef.current === slideImgs.length - 2) {
            scrollRef.current.scrollTo({
              left: (slideImgs.length - 2) * windowWidth,
              behavior: "instant",
            });
          }
          if (currentIndexRef.current == 1) {
            scrollRef.current.scrollTo({
              left: windowWidth,
              behavior: "instant",
            });
          }
          setScrolling(false);
        }
    }, 200);
  };

  useEffect(() => {
    if (!isScrolling && isAutoplay) {
      timeOutRef.current = setTimeout(() => {
        handleNext();
      }, 5000);
    }
  }, [isScrolling, isAutoplay]);

  useEffect(() => {
    if (!isAutoplay && timeOutRef && timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  }, [isAutoplay]);

  const handlePrev = () => {
    if (scrollRef && scrollRef.current && !isScrolling) {
      setScrolling(true);
      const windowWidth = scrollRef.current.offsetWidth;
      if (currentIndex > 1) {
        scrollRef.current.scrollTo({
          left: windowWidth * (currentIndex - 1),
          behavior: "smooth",
        });
        setCurrentIndex(currentIndex - 1);
        currentIndexRef.current = currentIndex - 1;
      } else {
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setCurrentIndex(slideImgs.length - 2);
        currentIndexRef.current = slideImgs.length - 2;
      }
    }
  };

  const handleNext = () => {
    if (scrollRef && scrollRef.current && !isScrolling) {
      setScrolling(true);
      const windowWidth = scrollRef.current.offsetWidth;
      if (currentIndex < slideImgs.length - 2) {
        scrollRef.current.scrollTo({
          left: windowWidth * (currentIndex + 1),
          behavior: "smooth",
        });
        setCurrentIndex(currentIndex + 1);
        currentIndexRef.current = currentIndex + 1;
      } else {
        scrollRef.current.scrollTo({
          left: windowWidth * (currentIndex + 1),
          behavior: "smooth",
        });
        setCurrentIndex(1);
        currentIndexRef.current = 1;
      }
    }
  };

  return (
    <Container style={style}>
      <ButtonsContainer>
        <button
          onClick={() => {
            setAutoplay(false);
            handlePrev();
          }}
        >
          <ArrowBackIcon color="inherit" fontSize="inherit" />
        </button>
        <button
          onClick={() => {
            setAutoplay(false);
            handleNext();
          }}
        >
          <ArrowForwardIcon color="inherit" fontSize="inherit" />
        </button>
      </ButtonsContainer>
      <ScrollContainer
        ref={scrollRef}
        style={{ display: isLoading ? "none" : "flex" }}
      >
        {slideImgs.map((img, index) => (
          <BannerImage
            className={currentIndex === index ? "current" : ""}
            key={index}
            $bgImg={img}
          ></BannerImage>
        ))}
      </ScrollContainer>
    </Container>
  );
};

export default Carousel;
