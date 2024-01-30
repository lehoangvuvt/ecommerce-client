"use client";

import { TProductReview } from "@/types/api.type";
import styled from "styled-components";
import defaultAvatar from "/public/images/misc/default-avatar.jpg";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import moment from "moment";

const Container = styled.div`
  width: 100%;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const UserAvatar = styled.div`
  width: 38px;
  height: 38px;
  background-color: white;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
`;

const RightContent = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding-left: 15px;
  display: flex;
  flex-flow: column wrap;
  gap: 5px;
`;

const Username = styled.div`
  width: 100%;
  font-size: 14px;
`;

const Stars = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  .filled,
  .normal {
    color: red;
    font-size: 16px;
  }
`;

const Comment = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;
`;

const DateAndVarianceInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
`;

type Props = {
  data: TProductReview;
};

const ProductReviewItem: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <UserAvatar>
        <Image
          fill
          src={defaultAvatar.src}
          alt="user-avavar"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </UserAvatar>
      <RightContent>
        <Username>{data.username}</Username>
        <Stars>
          {Array(5)
            .fill("")
            .map((_, i) =>
              i < data.star ? (
                <StarIcon
                  key={i}
                  className="filled"
                  fontSize="inherit"
                  color="inherit"
                />
              ) : (
                <StarBorderIcon
                  className="normal"
                  fontSize="inherit"
                  color="inherit"
                  key={i}
                />
              )
            )}
        </Stars>
        <DateAndVarianceInfo>
          {moment(new Date(data.createdAt)).format("yy-MM-DD hh:mm")} |
          Variance: {data.variance_values[0]} {data.variance_values[1]}
        </DateAndVarianceInfo>
        <Comment>{data.comment}</Comment>
      </RightContent>
    </Container>
  );
};

export default ProductReviewItem;
