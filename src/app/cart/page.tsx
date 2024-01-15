"use client";

import MyButton from "@/components/Button";
import Table, { TColumn } from "@/components/Table";
import useScreenWidth from "@/hooks/useScreenWidth";
import { convertNumberToCurrencyString } from "@/utils/string.utils";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  padding-top: 10px;
  margin: 0 auto;
  gap: 15px;
  display: flex;
  flex-flow: column;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const CheckoutContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-flow: row;
  background-color: white;
  margin-bottom: 20px;
`;

const CheckoutLeft = styled.div`
  width: 50%;
`;

const CheckoutRight = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
`;

const rows = [
  {
    id: "product_1",
    productDetails: {
      productName: "product 1",
      productImage:
        "https://down-vn.img.susercontent.com/file/vn-11134207-23030-ng84drd6glov2b",
    },
    price: 1000,
    quantity: 10,
    total_price: 1000 * 10,
  },
  {
    id: "product_2",
    productDetails: {
      productName: "product 2",
      productImage:
        "https://down-vn.img.susercontent.com/file/vn-11134207-23030-ng84drd6glov2b",
    },
    price: 2000,
    quantity: 11,
    total_price: 2000 * 11,
  },
  {
    id: "product_3",
    productDetails: {
      productName: "product 3",
      productImage:
        "https://down-vn.img.susercontent.com/file/vn-11134207-23030-ng84drd6glov2b",
    },
    price: 3000,
    quantity: 12,
    total_price: 3000 * 12,
  },
  {
    id: "product_4",
    productDetails: {
      productName: "product 4",
      productImage:
        "https://down-vn.img.susercontent.com/file/vn-11134207-23030-ng84drd6glov2b",
    },
    price: 4000,
    quantity: 13,
    total_price: 4000 * 13,
  },
];

const Cart = () => {
  const { deviceType } = useScreenWidth();
  const [data, setData] = useState<{ [key: string]: any }[]>(rows);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const deleteItem = (rowIndex: number) => {
    if (data.length > 1) {
      setData((prevData) =>
        prevData.filter((item, index) => index !== rowIndex)
      );
    } else {
      setData([]);
    }
  };

  const columns: TColumn[] = [
    {
      field: "productDetails",
      headerName: "Product",
      flex: 0.5,
      customHeader: (headerName: string, field: string) => {
        return (
          <div>
            <input
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
              type="checkbox"
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
              gap: "10px",
            }}
          >
            <input
              onChange={() =>
                selectedProductIds.includes(rowValue.id)
                  ? setSelectedProductIds((prev) =>
                      prev.filter((id) => id !== rowValue.id)
                    )
                  : setSelectedProductIds((prev) => [...prev, rowValue.id])
              }
              checked={selectedProductIds.includes(rowValue.id)}
              type="checkbox"
            />
            <Image
              src={value.productImage}
              alt="product-image"
              width={80}
              height={80}
            />
            <p>{value.productName}</p>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
      sortField: "price",
      flex: 0.125,
      customRender: (value, rowIndex, field, rowValue) => {
        return convertNumberToCurrencyString(value);
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      sortField: "quantity",
      sortable: true,
      flex: 0.125,
    },
    {
      field: "total_price",
      headerName: "Total Price",
      sortField: "total_price",
      sortable: true,
      flex: 0.125,
      customRender: (value) => {
        return convertNumberToCurrencyString(value);
      },
    },
    {
      field: "",
      headerName: "Actions",
      flex: 0.125,
      customRender: (value, rowIndex) => {
        return <button onClick={() => deleteItem(rowIndex)}>Remove</button>;
      },
    },
  ];

  return (
    <Container>
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
              Total ({selectedProductIds.length}{" "}
              {selectedProductIds.length > 1 ? "items" : "item"})
              <MyButton
                background="red"
                fontColor="white"
                onClick={() => {}}
                width="30%"
                height="38px"
                fontSize="14px"
              >
                Check Out
              </MyButton>
            </CheckoutRight>
          </CheckoutContainer>
        </>
      )}
    </Container>
  );
};

export default Cart;
