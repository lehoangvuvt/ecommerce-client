"use client";

import Loading from "@/components/Loading";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 180px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export default function PageLoading() {
  return (
    <Container>
      <Loading />
    </Container>
  );
}
