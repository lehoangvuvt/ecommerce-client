"use client";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InputField from "@/components/InputField";
import MobilePageHeader from "@/components/MobilePageHeader";
import Select from "@/components/Select";
import Option from "@/components/Select/option";
import { vietnameCities } from "@/const/others.const";
import useScreenWidth from "@/hooks/useScreenWidth";
import { UserService } from "@/services/user.service";
import { TFormattedCartItem } from "@/types/api.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import OrderSummaryItem from "./components/orderSummaryItem";
import { convertNumberToCurrencyString } from "@/utils/string.utils";
import MyButton from "@/components/Button";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: auto;
  gap: 20px;
  padding: 20px 0px;
  min-height: 100vh;
  @media (max-width: 768px) {
    flex-flow: column wrap;
    margin-top: 10px;
    gap: 0px;
  }
`;

const BaseContainer = styled.div`
  width: 45%;
  padding: 0px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.025);
  & > h1 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: auto;
    padding: 20px 20px;
    border-radius: 0px;
    & > h1 {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
`;

const Left = styled(BaseContainer)`
  display: flex;
  flex-flow: column;
  background-color: transparent;
  align-items: flex-end;
  gap: 20px;
  box-shadow: none;
  @media (max-width: 768px) {
    width: 100%;
    margin: auto;
    padding: 20px 0px;
  }
`;

const Right = styled(BaseContainer)`
  display: flex;
  flex-flow: column;
  background: transparent;
  gap: 20px;
  @media (max-width: 768px) {
    width: 100%;
    margin: auto;
    padding: 20px 0px;
  }
`;

const FieldsContainer = styled(BaseContainer)`
  display: flex;
  flex-flow: column;
  gap: 20px 40px;
  width: 100%;
  padding: 20px 30px;
  @media (max-width: 768px) {
    width: 100%;
    margin: auto;
    padding: 20px 20px;
  }
`;

const PaymentInfo = styled(BaseContainer)`
  background-color: white;
  width: 100%;
  padding: 0px;
  height: 500px;
  padding: 20px 30px;
  gap: 20px 40px;
`;

const OrderSummary = styled(BaseContainer)`
  background-color: white;
  width: 100%;
  padding: 20px 30px;
  display: flex;
  flex-flow: column;
  gap: 10px;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 425px;
  position: relative;
  padding-bottom: 50px;
  &.view-all {
    max-height: 10000px;
  }
  &.view-short {
    max-height: 425px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: auto;
    padding: 20px 20px 50px 20px;
  }
`;

const OrderTotalPrice = styled(BaseContainer)`
  background-color: white;
  width: 100%;
  padding: 20px 30px;
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 425px;
  position: relative;
  &.view-all {
    max-height: 10000px;
  }
  &.view-short {
    max-height: 425px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: auto;
    padding: 20px 20px 30px 20px;
  }
`;

const OrderTotalPriceItem = styled.div<{ $withBorder: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: ${(props) =>
    props.$withBorder ? "1px solid rgba(0, 0, 0, 0.2)" : "none"};
  padding-bottom: ${(props) => (props.$withBorder ? "15px" : "0px")};
  margin-top: 5px;
`;

const OrderTotalPriceLeft = styled.div`
  width: 80px;
  font-weight: 600;
  font-size: 15px;
`;

const OrderTotalPriceRight = styled.div`
  flex: 1;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 15px;
`;

const ViewMoreBtn = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 52px;
  backdrop-filter: blur(1.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.025);
`;

const Checkout = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { deviceType } = useScreenWidth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState<string | null>("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [currentStep, setCurrentStep] = useState(params.get("step"));
  const [checkoutSummary, setCheckoutSummary] = useState<TFormattedCartItem[]>(
    []
  );
  const [isViewAll, setViewAll] = useState(false);

  useEffect(() => {
    const getCheckoutSummary = async () => {
      const response = await UserService.getCheckoutSummary(
        params.get("cart_items")
      );
      if (response) {
        setCheckoutSummary(response);
      }
    };
    if (params && params.get("cart_items")) {
      getCheckoutSummary();
    }
  }, [params]);

  const getSubmitButtonText = () => {
    let text = "";
    switch (currentStep) {
      case "information":
        text = "Continue to shipping";
        break;
      case "shipping":
        text = "Continue to payment";
        break;
      case "payment":
        text = "Pay now";
        break;
    }
    return text;
  };

  const getBackButtonText = () => {
    let text = "";
    switch (currentStep) {
      case "shipping":
        text = "Return to information";
        break;
      case "payment":
        text = "Return to shipping";
        break;
    }
    return text;
  };

  const handleClickSubmitButton = () => {
    let url = "";
    let nextStep = "";
    switch (currentStep) {
      case "information":
        nextStep = "shipping";
        break;
      case "shipping":
        nextStep = "payment";
        break;
    }
    for (var key of params.keys()) {
      if (key !== "step") {
        url += `${key}=${params.get(key)}&`;
      } else {
        url += `${key}=${nextStep}&`;
      }
    }
    setCurrentStep(nextStep);
    router.push(`/check-out?${url.slice(0, -1)}`);
  };

  const handleClickBackButton = () => {
    let url = "";
    let prevStep = "";
    switch (currentStep) {
      case "shipping":
        prevStep = "information";
        break;
      case "payment":
        prevStep = "shipping";
        break;
    }
    for (var key of params.keys()) {
      if (key !== "step") {
        url += `${key}=${params.get(key)}&`;
      } else {
        url += `${key}=${prevStep}&`;
      }
    }
    setCurrentStep(prevStep);
    router.push(`/check-out?${url.slice(0, -1)}`);
  };

  const renderInformation = () => {
    return (
      <FieldsContainer>
        <h1>Shipping Address</h1>
        <InputField
          style={{ height: "50px" }}
          onChange={(value) => setFirstName(value)}
          title="First Name"
          value={firstName}
        />
        <InputField
          style={{ height: "50px" }}
          onChange={(value) => setLastName(value)}
          title="Last Name"
          value={lastName}
        />
        <InputField
          style={{ height: "50px" }}
          onChange={(value) => setPhone(value)}
          title="Mobile Number"
          value={phone}
        />
        <Select
          style={{ height: "50px" }}
          title="City"
          value={city}
          onChangeValue={setCity}
        >
          {vietnameCities.map((city) => (
            <Option value={city.slug} key={city.slug}>
              {city.name}
            </Option>
          ))}
        </Select>
        <InputField
          style={{ height: "50px" }}
          onChange={(value) => setAddress(value)}
          title="Address"
          value={address}
        />
      </FieldsContainer>
    );
  };

  const renderShipping = () => {
    return (
      <FieldsContainer>
        <h1>Shipping method</h1>
      </FieldsContainer>
    );
  };

  return (
    <Container>
      {deviceType === "mobile" && <MobilePageHeader headerText="Checkout" />}
      <Left>
        {currentStep === "information" && renderInformation()}
        {currentStep === "shipping" && renderShipping()}
        <div className="w-full flex items-center justify-between">
          <MyButton
            disabled={currentStep === "information"}
            height="45px"
            width={deviceType === "desktop" ? "auto" : "95%"}
            background="transparent"
            fontSize="14px"
            onClick={handleClickBackButton}
            fontColor="#0061FF"
            customStyle={{
              fontWeight: 500,
              borderRadius: "4px",
              padding: "10px 20px",
              cursor:
                currentStep === "information"
                  ? "default !important"
                  : "pointer",
            }}
          >
            {currentStep !== "information" && (
              <ArrowBackIosIcon color="inherit" fontSize="inherit" />
            )}
            {getBackButtonText()}
          </MyButton>

          <MyButton
            disabled={
              firstName.length === 0 ||
              lastName.length === 0 ||
              phone.length === 0 ||
              city?.length === 0 ||
              address.length === 0
            }
            height="45px"
            width={deviceType === "desktop" ? "auto" : "95%"}
            background="red"
            fontSize="16px"
            onClick={handleClickSubmitButton}
            fontColor="white"
            customStyle={{
              fontWeight: 600,
              borderRadius: "4px",
              padding: "10px 20px",
            }}
          >
            {getSubmitButtonText()}
          </MyButton>
        </div>
      </Left>
      <Right>
        <OrderSummary className={isViewAll ? "view-all" : "view-short"}>
          <h1>Order Summary</h1>
          {checkoutSummary &&
            checkoutSummary.length > 0 &&
            checkoutSummary.map((item) => (
              <OrderSummaryItem key={item.id} data={item} />
            ))}
          {checkoutSummary && checkoutSummary.length >= 4 && (
            <ViewMoreBtn onClick={() => setViewAll(!isViewAll)}>
              {isViewAll ? "Hide" : "See More"}
            </ViewMoreBtn>
          )}
        </OrderSummary>
        <OrderTotalPrice>
          <OrderTotalPriceItem $withBorder={false}>
            <OrderTotalPriceLeft>Subtotal</OrderTotalPriceLeft>
            <OrderTotalPriceRight>
              {convertNumberToCurrencyString(
                checkoutSummary.reduce(
                  (prev, curr) => prev + curr.total_price,
                  0
                )
              )}
            </OrderTotalPriceRight>
          </OrderTotalPriceItem>
          <OrderTotalPriceItem $withBorder={true}>
            <OrderTotalPriceLeft>Shipping</OrderTotalPriceLeft>
            <OrderTotalPriceRight>
              {convertNumberToCurrencyString(0)}
            </OrderTotalPriceRight>
          </OrderTotalPriceItem>
          <OrderTotalPriceItem $withBorder={false}>
            <OrderTotalPriceLeft>Total</OrderTotalPriceLeft>
            <OrderTotalPriceRight>
              {convertNumberToCurrencyString(
                checkoutSummary.reduce(
                  (prev, curr) => prev + curr.total_price,
                  0
                )
              )}
            </OrderTotalPriceRight>
          </OrderTotalPriceItem>
        </OrderTotalPrice>
      </Right>
    </Container>
  );
};

export default Checkout;
