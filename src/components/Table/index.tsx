"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ContainerDesktop = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  background-color: white;
  padding: 15px 10px;
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  flex-flow: row;
  margin-bottom: 10px;
  border: 1px solid rgba(0,0,0,0.05);
`;

const HeaderCol = styled.div<{ $flex: number }>`
  flex: ${(props) => props.$flex};
  height: 100%;
  box-sizing: border-box;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 0px;
  font-weight: 500;
  padding: 0px 10px;
  box-sizing: border-box;
`;

const Rows = styled.div`
  display: flex;
  flex-flow: column;
  background: white;
  border-radius: 2px;
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0.05);
`;

const ItemRow = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0px 10px;
  box-sizing: border-box;
`;

const ItemCol = styled.div<{ $flex: number }>`
  flex: ${(props) => props.$flex};
  height: 100%;
  box-sizing: border-box;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const SortContainer = styled.div`
  width: 30px;
  height: 16px;
  display: flex;
  flex-flow: column;
  button {
    width: 100%;
    height: calc(50%);
    display: flex;
    font-size: 26px;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.2);
    &.selected {
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;

const ContainerMobile = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  margin: auto;
  gap: 10px;
`;

const TableItemMobile = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  gap: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
`;

const ItemMobileField = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  padding: 5px 20px 15px 20px;
`;

const ItemMobileFieldName = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
`;

const ItemMobileFieldValue = styled.div`
  width: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  font-size: 14px;
`;

export type TColumn = {
  headerName: string;
  field: string;
  flex?: number;
  sortable?: boolean;
  sortField?: string;
  customHeader?: (headerName: string, field: string) => React.ReactNode;
  customRender?: (
    value: any,
    rowIndex: number,
    field: string,
    rowValue: { [key: string]: any }
  ) => React.ReactNode;
};

type Props = {
  columns: TColumn[];
  rows: { [key: string]: any }[];
  mode?: "desktop" | "mobile";
};

const Table: React.FC<Props> = ({ columns, rows, mode = "desktop" }) => {
  const [items, setItems] = useState<{ [key: string]: any }[]>([]);
  const [currentSortType, setCurrentSortType] = useState<{
    field: string;
    type: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    if (columns && columns.length > 0 && rows && rows.length > 0) {
      const items: { [key: string]: any }[] = [];
      rows.forEach((row) => {
        const totalKeys = Object.keys(row).length;
        let item: { [key: string]: any } = {};
        let itemFieldCountNotEmpty = 0;
        columns.forEach((col) => {
          if (col.field !== "") {
            itemFieldCountNotEmpty++;
          }
          item[col.field] = row[col.field];
        });
        if (totalKeys > itemFieldCountNotEmpty) {
          for (let key in row) {
            if (!item[key]) {
              item[key] = row[key];
            }
          }
        }
        items.push(item);
      });
      setItems(items);
    } else {
      setItems([]);
    }
  }, [columns, rows]);

  const renderData = (
    field: string,
    value: any,
    rowIndex: number,
    rowValue: { [key: string]: any }
  ): React.ReactNode => {
    const col = columns.find((c) => c.field === field);
    if (col) {
      if (!col.customRender) return <p>{value}</p>;
      return col.customRender(value, rowIndex, field, rowValue);
    }
  };

  const renderHeader = (field: string, headerName: string): React.ReactNode => {
    const col = columns.find((c) => c.field === field);
    if (col) {
      if (!col.customHeader) return <p>{col.headerName}</p>;
      return col.customHeader(headerName, field);
    }
  };

  const handleSort = (field: string, sortType: "asc" | "desc") => {
    const sortedItems = structuredClone(items);
    if (currentSortType) {
      if (currentSortType.field !== field) {
        switch (sortType) {
          case "asc":
            sortedItems.sort((a, b) => a[field] - b[field]);
            break;
          case "desc":
            sortedItems.sort((a, b) => b[field] - a[field]);
            break;
        }
        setCurrentSortType({
          field,
          type: sortType,
        });
      } else {
        switch (currentSortType.type) {
          case "asc":
            sortedItems.sort((a, b) => b[field] - a[field]);
            break;
          case "desc":
            sortedItems.sort((a, b) => a[field] - b[field]);
            break;
        }
        setCurrentSortType({
          field,
          type: currentSortType.type === "asc" ? "desc" : "asc",
        });
      }
    } else {
      switch (sortType) {
        case "asc":
          sortedItems.sort((a, b) => a[field] - b[field]);
          break;
        case "desc":
          sortedItems.sort((a, b) => b[field] - a[field]);
          break;
      }
      setCurrentSortType({
        field,
        type: sortType,
      });
    }
    setItems(sortedItems);
  };

  const renderDesktop = () => {
    return (
      <ContainerDesktop>
        <Header>
          {columns.length > 0 &&
            columns.map((item) => (
              <HeaderCol $flex={item.flex ?? 1} key={item.field}>
                {renderHeader(item.field, item.headerName)}
                {item.sortable && (
                  <SortContainer>
                    <button
                      className={
                        currentSortType &&
                        currentSortType.field === item.field &&
                        currentSortType.type === "asc"
                          ? "selected"
                          : ""
                      }
                      onClick={() => handleSort(item.field, "asc")}
                    >
                      <ArrowDropUpIcon
                        style={{ pointerEvents: "none" }}
                        color="inherit"
                        fontSize="inherit"
                      />
                    </button>
                    <button
                      className={
                        currentSortType &&
                        currentSortType.field === item.field &&
                        currentSortType.type === "desc"
                          ? "selected"
                          : ""
                      }
                      onClick={() => handleSort(item.field, "desc")}
                    >
                      <ArrowDropDownIcon
                        style={{ pointerEvents: "none" }}
                        color="inherit"
                        fontSize="inherit"
                      />
                    </button>
                  </SortContainer>
                )}
              </HeaderCol>
            ))}
        </Header>
        <Rows>
          {!items ||
            (items && items.length === 0 && (
              <div
                style={{
                  height: "80px",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Empty
              </div>
            ))}
          {items &&
            items.length > 0 &&
            items.map((item, i) => (
              <ItemRow key={i}>
                {Object.keys(item)
                  .slice(0, columns.length)
                  .map((key) => (
                    <ItemCol
                      key={key}
                      $flex={
                        columns.find((col) => col.field === key)!.flex ?? 1
                      }
                    >
                      {renderData(key, item[key], i, item)}
                    </ItemCol>
                  ))}
              </ItemRow>
            ))}
        </Rows>
      </ContainerDesktop>
    );
  };

  const renderMobile = () => {
    return (
      <ContainerMobile>
        {items &&
          items.length > 0 &&
          items.map((item, i) => (
            <TableItemMobile key={i}>
              {Object.keys(item)
                .slice(0, columns.length)
                .map((key, keyIndex) => (
                  <ItemMobileField key={key}>
                    <ItemMobileFieldName>
                      {columns[keyIndex].headerName}
                    </ItemMobileFieldName>
                    <ItemMobileFieldValue>
                      {renderData(key, item[key], i, item)}
                    </ItemMobileFieldValue>
                  </ItemMobileField>
                ))}
            </TableItemMobile>
          ))}
      </ContainerMobile>
    );
  };

  return (
    <>
      {mode === "desktop" && renderDesktop()}
      {mode === "mobile" && renderMobile()}
    </>
  );
};

export default Table;
