"use client";

import Spinner from "@/components/Spinner";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 180px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export default function Loading() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}
