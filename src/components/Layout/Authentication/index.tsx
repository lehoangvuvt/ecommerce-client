"use client";

import Loading from "@/components/Loading";
import { UserService } from "@/services/user.service";
import useStore from "@/store/store";
import { useEffect, useState } from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: white;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Authentication = () => {
  const [loading, setLoading] = useState(true);
  const { setUserInfo } = useStore();

  useEffect(() => {
    authentication();
  }, []);

  const authentication = async () => {
    const response = await UserService.authentication();
    if (response) {
      setUserInfo(response);
    } else {
      setUserInfo(null);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <LoadingContainer>
          <Loading width="100px" />
        </LoadingContainer>
      )}
    </>
  );
};

export default Authentication;
