"use client";

import useStore from "@/store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
`;

type Props = {
  style?: React.CSSProperties;
  customBackFn?: () => void;
};

const BackButton: React.FC<Props> = ({ customBackFn, style }) => {
  const router = useRouter();
  const pathName = usePathname();

  const handleBack = () => {
    router.back();
  };

  return (
    <Container style={style} onClick={customBackFn ? customBackFn : handleBack}>
      <ArrowBackIcon color="inherit" fontSize="inherit" />
    </Container>
  );
};

export default BackButton;
