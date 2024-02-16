"use client";

import MyButton from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import MobilePageHeader from "@/components/MobilePageHeader";
import Table, { TColumn } from "@/components/Table";
import useScreenWidth from "@/hooks/useScreenWidth";
import { UserService } from "@/services/user.service";
import useStore from "@/store/store";
import { convertNumberToCurrencyString } from "@/utils/string.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  padding-top: 40px;
  margin: 0 auto;
  gap: 15px;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  min-height: calc(100vh - 150px);
  @media (max-width: 1000px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CheckoutContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-flow: row;
  background-color: white;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-flow: column;
  }
`;

const CheckoutLeft = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CheckoutRight = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  gap: 20px;
  font-size: 15px;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    font-size: 14px;
  }
`;

const Cart = () => {
  const { userInfo, setUserInfo } = useStore();
  const [data, setData] = useState<{ [key: string]: any }[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const { deviceType } = useScreenWidth();
  const router = useRouter();

  useEffect(() => {
    if (userInfo && userInfo.cart && userInfo.cart.cart_items) {
      setData(userInfo.cart.cart_items);
    }
  }, [userInfo]);

  const handleRemoveFromCart = async (productVarianceId: string) => {
    const updatedCart = await UserService.removeFromCart(productVarianceId);
    if (updatedCart) {
      const updatedUserInfo = structuredClone(userInfo);
      if (updatedUserInfo && updatedUserInfo.cart) {
        updatedUserInfo.cart = updatedCart;
        setUserInfo(updatedUserInfo);
      }
    }
  };

  const columns: TColumn[] = [
    {
      field: "product",
      headerName: "Product",
      flex: 0.6,
      customHeader: (headerName: string, field: string) => {
        return (
          <div style={{ height: "100%", display: "flex", gap: "10px" }}>
            <Checkbox
              checked={selectedProductIds.length === data.length}
              onChange={() => {
                selectedProductIds.length < data.length
                  ? setSelectedProductIds(
                      data.map((item) => {
                        return item.id;
                      })
                    )
                  : setSelectedProductIds([]);
              }}
            />
            {headerName}
          </div>
        );
      },
      customRender: (value, rowIndex, field, rowValue) => {
        return (
          <div
            style={{
              width: "100%",
              padding: "20px 10px",
              display: "flex",
              flexFlow: "row wrap",
              alignItems: "center",
              gap: "15px",
              boxSizing: "border-box",
            }}
          >
            <Checkbox
              onChange={() =>
                selectedProductIds.includes(rowValue.id)
                  ? setSelectedProductIds((prev) =>
                      prev.filter((id) => id !== rowValue.id)
                    )
                  : setSelectedProductIds((prev) => [...prev, rowValue.id])
              }
              checked={selectedProductIds.includes(rowValue.id)}
            />
            <Image
              src={rowValue.image}
              alt="product-image"
              width={65}
              height={65}
            />
            <p
              onClick={() => router.push(`/${value.slug}`)}
              className="hover:underline cursor-pointer"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                flex: 1,
              }}
            >
              {value.product_name}
            </p>
          </div>
        );
      },
    },
    {
      field: "variance",
      headerName: "",
      sortable: false,
      flex: 0.15,
      customRender: (value, rowIndex, field, rowValue) => {
        return `${value["main"]["attribute_value"]}, ${value["sub"]["attribute_value"]}`;
      },
    },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
      sortField: "price",
      flex: 0.17,
      customRender: (value, rowIndex, field, rowValue) => {
        return convertNumberToCurrencyString(value);
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      sortField: "quantity",
      sortable: true,
      flex: 0.17,
    },
    {
      field: "total_price",
      headerName: "Total Price",
      sortField: "total_price",
      sortable: true,
      flex: 0.17,
      customRender: (value) => {
        return convertNumberToCurrencyString(value);
      },
    },
    {
      field: "",
      headerName: "Actions",
      flex: 0.12,
      customRender: (value, rowIndex, field, rowValue) => {
        return (
          <button
            className="hover:text-[red]"
            onClick={() =>
              handleRemoveFromCart(rowValue["product_variance_id"])
            }
          >
            Remove
          </button>
        );
      },
    },
  ];

  const getTotalItemsPrice = () => {
    let total = 0;
    if (selectedProductIds.length === 0) return total;
    selectedProductIds.forEach((itemId) => {
      const item = userInfo?.cart?.cart_items?.find(
        (item) => item.id === itemId
      );
      if (item) {
        total += item.price * item.quantity;
      }
    });
    return total;
  };

  const handleCheckout = () => {
    if (selectedProductIds.length === 0) return;
    let checkoutParams = "?cart_items=";
    selectedProductIds.forEach((id, index) => {
      checkoutParams += `${id}`;
      if (index < selectedProductIds.length - 1) {
        checkoutParams += ",";
      }
    });
    checkoutParams += `&step=information`;
    router.push(
      "/check-out" + checkoutParams
    );
  };

  return (
    <Container>
      {deviceType === "mobile" && <MobilePageHeader headerText="Cart" />}
      {data.length > 0 && (
        <>
          <Table
            mode={deviceType === "desktop" ? "desktop" : "mobile"}
            columns={columns}
            rows={data}
          />
          <CheckoutContainer>
            <CheckoutLeft></CheckoutLeft>
            <CheckoutRight>
              {deviceType === "desktop" && (
                <>
                  <span>
                    Total ({selectedProductIds.length}
                    {selectedProductIds.length > 1 ? " items" : " item"}):&nbsp;
                    <span className="text-[red] font-[400] text-[20px]">
                      {convertNumberToCurrencyString(getTotalItemsPrice())}
                    </span>
                  </span>
                  <MyButton
                    disabled={selectedProductIds.length === 0}
                    background="red"
                    fontColor="white"
                    onClick={() => handleCheckout()}
                    width="33%"
                    height="40px"
                    fontSize="15px"
                  >
                    Check Out
                  </MyButton>
                </>
              )}

              {deviceType === "mobile" && (
                <div className="w-full">
                  <div
                    className="w-full mb-[10px]"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Total ({selectedProductIds.length}
                    {selectedProductIds.length > 1 ? " items" : " item"}):&nbsp;
                    <span className="text-[red] font-[400] text-[20px]">
                      {convertNumberToCurrencyString(getTotalItemsPrice())}
                    </span>
                  </div>
                  <MyButton
                    disabled={selectedProductIds.length === 0}
                    background="red"
                    fontColor="white"
                    onClick={() => handleCheckout()}
                    width="100%"
                    height="40px"
                    fontSize="15px"
                  >
                    Check Out
                  </MyButton>
                </div>
              )}
            </CheckoutRight>
          </CheckoutContainer>
        </>
      )}
    </Container>
  );
};

export default Cart;
