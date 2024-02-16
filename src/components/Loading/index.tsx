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

const Dot = styled.div<{ $index: number; $bgColor: string }>`
  width: calc(30% - 1.25px);
  height: calc(30% - 1.25px);
  border-radius: 50%;
  background-color: ${(props) => props.$bgColor};
  animation: dotBlur 0.8s ease infinite alternate
    ${(props) => props.$index * 0.25}s;
  @keyframes dotBlur {
    0% {
      opacity: 1;
    }
    20% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

type Props = {
  width?: string;
  bgColor?: string;
  style?: React.CSSProperties;
};

const Loading: React.FC<Props> = ({
  width = "50px",
  bgColor = "rgba(0, 0, 0, 0.2)",
  style,
}) => {
  return (
    <Container $width={width} style={style}>
      {Array(3)
        .fill("")
        .map((_, i) => (
          <Dot $bgColor={bgColor} $index={i} key={i} />
        ))}
    </Container>
  );
};

export default Loading;
