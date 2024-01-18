"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  height: 55px;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 5px;
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  height: 50%;
  left: 0;
  transform: translate(6px, -50%);
  background-image: linear-gradient(to top, white 50%, white 50%);
  padding: 0px 5px;
  font-weight: 500;
  font-size: 14px;
  box-sizing: border-box;
  transition: transform 0.1s ease, background-image 0.5s ease;
  display: flex;
  color: rgba(0, 0, 0, 0.6);
  align-items: center;
  pointer-events: none;
  &.focus {
    color: rgba(0, 0, 0, 0.9);
    transform: translate(6px, -150%);
    animation: inputTitleFocusAnim 0s ease forwards 0.05s;
    @keyframes inputTitleFocusAnim {
      to {
        background-image: linear-gradient(to top, white 60%, transparent 50%);
      }
    }
  }
`;

const ItemsContainer = styled.div`
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  top: 55px;
  background-color: white;
  z-index: 10;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &.show {
    transition: max-height 0.2s ease;
    display: inline;
    max-height: 300px;
  }
  &.hide {
    max-height: 0px;
  }
`;

const DataShowContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 14px;
`;

type Props = {
  children: ReactNode;
  value: string | null;
  title: string;
  onChangeValue: (value: string | null) => void;
  style?: React.CSSProperties;
};

const Select: React.FC<Props> = ({
  children,
  value,
  onChangeValue,
  title,
  style,
}) => {
  const [isFocus, setFocus] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [openItemsContainer, setOpenItemsContainer] = useState(false);
  const [dataToShow, setDataToShow] = useState<string | null>(null);

  useEffect(() => {
    if (value && containerRef && containerRef.current) {
      const children = containerRef.current.children;
      for (let child of children) {
        if (child.getAttribute("data-item") === value) {
          setDataToShow(child.getAttribute("data-show"));
          break;
        }
      }
    }
  }, [value]);

  const onClickOption = (e: Event) => {
    if (containerRef && containerRef.current) {
      const elem = e.target as Element;
      const optionValue = elem.getAttribute("data-item");

      const children = containerRef.current.children;
      for (let child of children) {
        if (child.className.includes(" selected")) {
          child.className = child.className.replace(" selected", "");
          break;
        }
      }

      elem.className += " selected";
      onChangeValue(optionValue);
    }
  };

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const children = containerRef.current.children;
      for (let child of children) {
        child.addEventListener("click", onClickOption);
      }
      return () => {
        for (let child of children) {
          child.removeEventListener("click", onClickOption);
        }
      };
    }
  }, []);

  return (
    <Container
      style={style}
      onClick={(e) => {
        setOpenItemsContainer(!openItemsContainer);
      }}
    >
      <Title className={isFocus || (value && value.length > 0) ? "focus" : ""}>
        {title}
      </Title>
      <DataShowContainer>{dataToShow}</DataShowContainer>
      <ItemsContainer
        ref={containerRef}
        className={openItemsContainer ? "show" : "hide"}
      >
        {children}
      </ItemsContainer>
    </Container>
  );
};

export default Select;
