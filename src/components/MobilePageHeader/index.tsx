"use client";

import BackButton from "@/components/BackButton";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-flow: row;
  padding: 0px 10px;
  align-items: center;
`;

const HeaderText = styled.div`
  width: calc(100% - 45px - 25px);
  padding: 0px 5px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  font-size: 16px;
`;

const RightItem = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  headerText?: string;
  headerTextAlign?: "left" | "center" | "right";
  effectOn?: boolean;
  style?: React.CSSProperties;
  customBackFn?: () => void;
  rightItem?: React.ReactNode;
};

const MobilePageHeader: React.FC<Props> = ({
  headerText,
  effectOn = false,
  headerTextAlign = "center",
  style,
  customBackFn,
  rightItem,
}) => {
  const [headerOpacity, setHeaderOpacity] = useState(effectOn ? 0 : 1);

  useEffect(() => {
    if (effectOn) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [effectOn]);

  const handleScroll = () => {
    const scrollValToFull = 400;
    const opacity =
      window.scrollY >= scrollValToFull ? 1 : window.scrollY / scrollValToFull;
    setHeaderOpacity(opacity);
  };

  return (
    <Container
      style={{
        ...style,
        backgroundColor: `rgba(255,255,255,${headerOpacity})`,
        textAlign: headerTextAlign,
      }}
    >
      <BackButton customBackFn={customBackFn} />
      <HeaderText
        style={{
          color: `rgba(0,0,0,${headerOpacity})`,
        }}
      >
        {headerText}
      </HeaderText>
      {rightItem && <RightItem>{rightItem}</RightItem>}
    </Container>
  );
};

export default MobilePageHeader;
