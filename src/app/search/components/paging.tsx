"use client";

import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useStore from "@/store/store";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const PageButton = styled.button`
  height: 32px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.7);
  transition: all 0.1s ease;
  font-size: 14px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
  }
  &.disabled {
    border: 1px solid rgba(0, 0, 0, 0.05);
    background-color: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.3);
    cursor: default;
  }
`;

const PageText = styled.div`
  padding-right: 30px;
`;

type Props = {
  current_page: number;
  total_page: number;
  has_next: boolean;
  style?: React.CSSProperties;
};

const Paging: React.FC<Props> = ({
  current_page,
  has_next,
  total_page,
  style,
}) => {
  const { addFilterValue, filters, setNewFilters } = useStore();
  const prevPage = () => {
    if (current_page === 0) return;
    if (filters["page"]) {
      const updatedFilters = Object.assign({}, filters);
      updatedFilters["page"][0] = (
        parseInt(updatedFilters["page"][0]) - 1
      ).toString();
      setNewFilters(updatedFilters);
    } else {
      addFilterValue("page", "1");
    }
  };

  const nextPage = () => {
    if (!has_next) return;
    if (filters["page"]) {
      const updatedFilters = Object.assign({}, filters);
      updatedFilters["page"][0] = (
        parseInt(updatedFilters["page"][0]) + 1
      ).toString();
      setNewFilters(updatedFilters);
    } else {
      addFilterValue("page", "1");
    }
  };

  return (
    <Container style={style}>
      <PageText>
        {current_page + 1}/{total_page}
      </PageText>
      <PageButton
        disabled={current_page === 0}
        onClick={() => prevPage()}
        className={current_page === 0 ? "disabled" : ""}
      >
        <ArrowForwardIosIcon
          style={{ transform: "rotate(180deg)" }}
          color="inherit"
          fontSize="inherit"
        />
      </PageButton>
      <PageButton
        disabled={!has_next}
        onClick={() => nextPage()}
        className={!has_next ? "disabled" : ""}
      >
        <ArrowForwardIosIcon color="inherit" fontSize="inherit" />
      </PageButton>
    </Container>
  );
};

export default Paging;
