"use client";

import styled from "styled-components";

const Container = styled.div<{
  $width: string;
  $height: string;
  $color: string;
}>`
  height: ${(props) => props.$height};
  min-width: ${(props) => props.$width};
  background: ${(props) => props.$color};
  transform: translateY(-50%);
  top: 50%;
  position: relative;
`;

type Props = {
  color?: string;
  width?: string;
  height?: string;
};

const Line: React.FC<Props> = ({
  color = "rgba(0, 0, 0, 0.4)",
  width = "1px",
  height = "10px",
}) => {
  return <Container $color={color} $height={height} $width={width}></Container>;
};

export default Line;
