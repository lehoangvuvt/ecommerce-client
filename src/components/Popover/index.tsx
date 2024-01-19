"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: auto;
  height: auto;
`;

const PopoverContainer = styled.div<{
  $left: number;
  $translateY: string;
  $translateX: string;
}>`
  position: absolute;
  left: ${({ $left }) => `${$left}px` || 0};
  z-index: 200;
  transform: translate(
      ${(props) => `${props.$translateX},${props.$translateY}`}
    )
    scale(0);
  animation: PopoverAppear 0.2s ease forwards;
  transform-origin: top;
  @keyframes PopoverAppear {
    from {
      transform: translate(
          ${(props) => `${props.$translateX},${props.$translateY}`}
        )
        scale(0);
    }
    to {
      transform: translate(
          ${(props) => `${props.$translateX},${props.$translateY}`}
        )
        scale(1);
    }
  }
`;

const PopoverContent = styled.div`
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
  place: "top" | "bottom" | "left" | "right";
};

const Popover: React.FC<Props> = ({ children, content, place }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [translateX, setTranslateX] = useState("0%");
  const [translateY, setTranslateY] = useState("0%");
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      const childElem = wrapperRef.current.firstElementChild;

      if (!childElem) return;

      const left = childElem.getBoundingClientRect().left;
      const height = childElem.getBoundingClientRect().height;
      const width = childElem.getBoundingClientRect().width;
      switch (place) {
        case "top":
          setTranslateY(`calc(-100% - ${height}px)`);
          setTranslateX("calc(0% - 10px)");
          break;
        case "bottom":
          setTranslateY("0%");
          setTranslateX("calc(0% - 10px)");
          break;
        case "left":
          setTranslateY("calc(-50% - 10px)");
          setTranslateX(`-100%`);
          break;
        case "right":
          setTranslateY("calc(-50% - 10px)");
          setTranslateX(`${width}px`);
          break;
      }
      setLeft(left);
    }
  }, [place]);

  return (
    <Wrapper
      onMouseLeave={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
      ref={wrapperRef}
    >
      {children}
      {isOpen && (
        <PopoverContainer
          onMouseEnter={() => setOpen(true)}
          $left={left}
          $translateY={translateY}
          $translateX={translateX}
          ref={wrapperRef}
        >
          <PopoverContent>{content}</PopoverContent>
        </PopoverContainer>
      )}
    </Wrapper>
  );
};

export default Popover;
