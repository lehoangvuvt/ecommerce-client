import { MouseEventHandler } from "react";
import styled, { CSSProperties } from "styled-components";
import Loading from "../Loading";

interface Props {
  children: React.ReactNode;
  height: string;
  width?: string;
  background: string;
  fontSize: string;
  fontColor: string;
  customStyle?: CSSProperties;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}

interface ButtonPropsType {
  height: string;
  width: string;
  $background: string;
  fontSize: string;
  $fontColor: string;
}

const Button = styled.button<ButtonPropsType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.$background};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.$fontColor};
  user-select: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    filter: brightness(95%);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MyButton: React.FC<Props> = ({
  children,
  height,
  width = "100%",
  background,
  fontColor,
  fontSize,
  customStyle,
  onClick,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <Button
      disabled={disabled || isLoading}
      height={height}
      width={width}
      $background={background}
      $fontColor={fontColor}
      fontSize={fontSize}
      style={customStyle}
      onClick={onClick}
    >
      {!isLoading ? (
        children
      ) : (
        <Loading
          style={{
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          bgColor="white"
          width="30px"
        />
      )}
    </Button>
  );
};

export default MyButton;
