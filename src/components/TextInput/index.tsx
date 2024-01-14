"use client";

import { ChangeEvent } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  outline: none;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.25);

  padding: 8px 8px;
  font-size: 14px;
  border-radius: 3px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
  color: rgba(0, 0, 0, 0.8);
  &.error {
    border-color: red;
    &:focus {
      border-color: red;
    }
  }
  &:focus {
    border-color: rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.06);
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

type Props = {
  style?: React.CSSProperties;
  type?: "text" | "password";
  placeholder?: string;
  isError?: boolean;
  value: string;
  maxLength?: number;
  onChange: (value: string) => void;
};

const TextInput: React.FC<Props> = ({
  style,
  value,
  type = "text",
  maxLength = -1,
  placeholder,
  isError = false,
  onChange,
}) => {
  return (
    <Input
      maxLength={maxLength ?? 524288}
      value={value}
      className={isError ? "error" : ""}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onChange && onChange(e.target.value)
      }
      type={type}
      placeholder={placeholder ?? ""}
      style={style}
    />
  );
};

export default TextInput;
