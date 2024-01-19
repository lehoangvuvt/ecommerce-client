"use client";

import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
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
        background-image: linear-gradient(to top, white 50%, transparent 50%);
      }
    }
  }
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0px 9px;
  font-size: 14px;
  &:focus {
    border: 2px solid rgba(0, 0, 0, 0.5);
  }
`;

type Props = {
  title: string;
  value: string | null;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  type?: "text" | "password" | "number";
};

const InputField: React.FC<Props> = ({
  onChange,
  title,
  value = null,
  type = "text",
  style,
}) => {
  const [isFocus, setFocus] = useState(false);

  return (
    <Container
      style={style}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <Title
        className={
          isFocus || value || (value && value.length > 0) ? "focus" : ""
        }
      >
        {title}
      </Title>
      <Input
        type={type}
        autoComplete="new-password"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </Container>
  );
};

export default InputField;
