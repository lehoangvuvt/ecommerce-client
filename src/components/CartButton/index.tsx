"use client";

import useStore from "@/store/store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  color: black;
  font-size: 26px;
  position: relative;
  cursor: pointer;
`;

const ItemsCounter = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transform: translate(13px, -45px);
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    transform: translate(10px, -42px);
    font-size: 12px;
  }
`;

type Props = {
  style?: React.CSSProperties;
};

const CartButton: React.FC<Props> = ({ style }) => {
  const router = useRouter();
  const { userInfo } = useStore();

  return (
    <Container
      style={style}
      onClick={() => {
        userInfo ? router.push("/cart") : router.push("/login");
      }}
    >
      <ShoppingCartIcon color="inherit" fontSize="inherit" />
      {userInfo &&
        userInfo.cart &&
        userInfo.cart.cart_items &&
        userInfo.cart.cart_items.length > 0 && (
          <ItemsCounter>
            {userInfo.cart.cart_items.reduce(
              (prev, curr) => prev + curr.quantity,
              0
            )}
          </ItemsCounter>
        )}
    </Container>
  );
};

export default CartButton;
