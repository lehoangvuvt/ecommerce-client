"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useScreenWidth from "@/hooks/useScreenWidth";
import BlurImage from "../BlurImage";

const Container = styled.div`
  width: 100%;
  flex-flow: column wrap;
  display: flex;
  gap: 14px;
`;

const CurrentImageContainer = styled.div`
  width: 90%;
  height: 400px;
  cursor: pointer;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Slider = styled.div`
  width: 90%;
  overflow-x: hidden;
  display: flex;
  flex-flow: row;
  position: relative;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SliderItem = styled.div`
  width: calc(20% - 10px);
  aspect-ratio: 1;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  border-style: solid;
  border-width: 2px;
  border-color: transparent;
  border-radius: 5px;
  overflow: hidden;
  &:hover,
  &.selected {
    border-color: red;
    border-radius: 5px;
  }
  @media (max-width: 400px) {
    width: calc(25% - 10px);
  }
  @media (max-width: 300px) {
    width: calc(50% - 10px);
  }
`;

const SliderControls = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  top: 0;
  background-color: transparent;
  pointer-events: none;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
`;

const ControlButton = styled.button`
  height: 60%;
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  pointer-events: auto;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 2px;
`;

const SliderModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderModalContent = styled.div`
  width: 850px;
  height: 540px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 10px;
  gap: 5px;
  opacity: 0;
  animation: SliderModalContent 0.1s ease forwards;
  @keyframes SliderModalContent {
    to {
      opacity: 1;
    }
  }
`;

const SliderModalCurrentImage = styled.div`
  width: 60%;
  height: 100%;
  position: relative;
`;

const SliderModalImagesContainer = styled.div`
  width: calc(40% - 5px);
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
  padding-left: 5px;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
`;

const SlideModalItem = styled.div`
  width: calc(33% - 5px);
  aspect-ratio: 1;
  position: relative;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  overflow: hidden;
  border-color: transparent;
  border-radius: 4px;
  &:hover {
    filter: brightness(105%);
  }
  &.selected {
    border-color: red;
  }
`;

type Props = {
  images: string[];
  isShowCurrentImage?: boolean;
};

const ImageSlider: React.FC<Props> = ({
  images,
  isShowCurrentImage = true,
}) => {
  const { deviceType } = useScreenWidth();
  const [isOpenModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>("");
  const [range, setRange] = useState<{ start: number; end: number } | null>(
    null
  );

  useEffect(() => {
    setCurrentImage(images[0]);
    if (images.length < 5) {
      setRange({ start: 0, end: images.length });
    } else {
      setRange({ start: 0, end: 5 });
    }
  }, []);

  const prevRange = () => {
    if (!range) return;
    if (range.start > 0) {
      setRange({ start: range.start - 1, end: range.end - 1 });
    }
  };

  const nextRange = () => {
    if (!range) return;
    if (range.end + 1 <= images.length) {
      setRange({ start: range.start + 1, end: range.end + 1 });
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      handleOnResizeWindow();
      window.addEventListener("resize", handleOnResizeWindow);
      return () => window.removeEventListener("resize", handleOnResizeWindow);
    }
  }, []);

  const handleOnResizeWindow = (e?: UIEvent) => {
    const width = window.screen.width;
    if (width <= 400) {
      if (width > 300) {
        if (images.length < 3) {
          setRange({ start: 0, end: images.length });
        } else {
          setRange({ start: 0, end: 4 });
        }
      } else {
        if (images.length < 2) {
          setRange({ start: 0, end: images.length });
        } else {
          setRange({ start: 0, end: 2 });
        }
      }
    } else {
      if (images.length < 5) {
        setRange({ start: 0, end: images.length });
      } else {
        setRange({ start: 0, end: 5 });
      }
    }
  };

  return (
    <Container>
      <CurrentImageContainer
        onClick={() => {
          if (deviceType === "mobile") return;
          setOpenModal(true);
        }}
      >
        {currentImage && (
          <Image
            src={currentImage}
            alt="current-slider-img"
            fill
            style={{
              objectFit: deviceType === "desktop" ? "contain" : "cover",
              objectPosition: deviceType === "desktop" ? "center" : "top",
              opacity: isShowCurrentImage ? 1 : 0,
            }}
          />
        )}
      </CurrentImageContainer>
      <Slider>
        {range &&
          images.slice(range.start, range.end).map((image, i) => (
            <SliderItem
              className={currentImage === image ? "selected" : ""}
              onClick={() => {
                if (deviceType === "mobile") return;
                setOpenModal(true);
              }}
              onMouseEnter={() => setCurrentImage(image)}
              key={image}
            >
              <Image
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                src={image}
                alt={`slider-image-${i}`}
              />
            </SliderItem>
          ))}
        <SliderControls>
          <ControlButton onClick={() => prevRange()}>
            <ArrowForwardIosIcon
              style={{ transform: "rotate(180deg)" }}
              color="inherit"
              fontSize="inherit"
            />
          </ControlButton>
          <ControlButton onClick={() => nextRange()}>
            <ArrowForwardIosIcon color="inherit" fontSize="inherit" />
          </ControlButton>
        </SliderControls>
      </Slider>
      {isOpenModal && (
        <SliderModal
          onClick={(e) => e.currentTarget === e.target && setOpenModal(false)}
        >
          <SliderModalContent>
            <SliderModalCurrentImage>
              <BlurImage
                src={currentImage ?? ""}
                style={{ objectFit: "cover" }}
              />
            </SliderModalCurrentImage>
            <SliderModalImagesContainer>
              {images.map((image, i) => (
                <SlideModalItem
                  className={currentImage === image ? "selected" : ""}
                  onClick={() => setCurrentImage(image)}
                  key={i}
                >
                  <BlurImage
                    style={{
                      objectFit: "cover",
                    }}
                    src={image}
                  />
                </SlideModalItem>
              ))}
            </SliderModalImagesContainer>
          </SliderModalContent>
        </SliderModal>
      )}
    </Container>
  );
};

export default ImageSlider;
