"use client";

import styled from "styled-components";

const Container = styled.div<{ $width: string }>`
  width: ${(props) => props.$width};
  aspect-ratio: 1;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-flow: row wrap;
  gap: 2.5px;
`;

const Square = styled.div<{ $index: number; $bgColor: string }>`
  width: calc(50% - 1.25px);
  height: calc(50% - 1.25px);
  background-color: ${(props) => props.$bgColor};
  animation: squareBlur 1s ease infinite alternate
    ${(props) => props.$index * 0.25}s;
  @keyframes squareBlur {
    0% {
      opacity: 0.5;
      transform: scale(0.8);
    }
    25% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

type Props = {
  width?: string;
  bgColor?: string;
  style?: React.CSSProperties;
};

const Spinner: React.FC<Props> = ({
  width = "50px",
  bgColor = "rgba(0, 0, 0, 0.2)",
  style,
}) => {
  return (
    <Container $width={width} style={style}>
      {Array(4)
        .fill("")
        .map((_, i) => (
          <Square $bgColor={bgColor} $index={i} key={i} />
        ))}
    </Container>
  );
};

export default Spinner;
