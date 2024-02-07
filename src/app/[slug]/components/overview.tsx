"use client";

import ImageSlider from "@/components/ImageSlider";
import { TProductDetails } from "@/types/api.type";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Variances, { TAttribute } from "./variancesDesktop";
import Price from "./price";
import QuantityInput from "@/components/QuantityInput";
import MyButton from "@/components/Button";
import useScreenWidth from "@/hooks/useScreenWidth";
import { UserService } from "@/services/user.service";
import useStore from "@/store/store";
import { useRouter } from "next/navigation";
import VariancesDesktop from "./variancesDesktop";
import VariancesMobile from "./variancesMobile";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import BlurImage from "@/components/BlurImage";

const Container = styled.div`
  width: 78%;
  background: white;
  padding: 20px;
  display: flex;
  flex-flow: row wrap;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 1000px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    flex-flow: column wrap;
    width: 100%;
    border: none;
    padding: 0px 0px 20px 0px;
  }
`;

const Left = styled.div`
  width: 40%;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 60%;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  gap: 30px;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
    gap: 20px;
  }
`;

const QuantitySelector = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  & > div {
    width: 120px;
  }
  p {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    user-select: none;
    @media (max-width: 768px) {
      padding-left: 0px;
    }
  }
  @media (max-width: 768px) {
    flex-flow: column wrap;
    gap: 15px;
    & > div {
      width: 100%;
    }
  }
`;

const ProductTitle = styled.div`
  width: 90%;
  font-weight: 500;
  font-size: 22px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
    font-size: 16px;
    padding: 0px 10px;
  }
`;

const ProductPrice = styled.div`
  width: 100%;
  font-size: 30px;
  @media (max-width: 768px) {
    text-align: center;
    padding: 0px 20px;
  }
`;

const CurrentImageContainer = styled.div`
  position: absolute;
  width: 90%;
  height: 400px;
  font-size: 30px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const OverviewSection = styled.section`
  display: flex;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    flex-flow: column wrap;
    gap: 10px;
  }
`;

const OverviewSectionTitle = styled.section`
  height: 100%;
  width: 20%;
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const OverviewSectionContent = styled.section`
  height: 100%;
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px 20px;
  }
  &.buttons-container {
    button {
      width: 150px;
      @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 15px;
      }
    }
  }
`;

const AddToCartMobileFooter = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45px;
  font-weight: 600;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  z-index: 10;
`;

type Props = {
  details: TProductDetails;
  attributes: TAttribute;
};

export const getVarianceInfo = (
  variance: { main: string; sub: string },
  details: TProductDetails
) => {
  let price = 0;
  let qty = 0;

  for (let key in details.product_variance) {
    const mainAttributeValue = key.split(":")[0];
    for (let subKey in details.product_variance[key]) {
      const subAttributeValue = subKey.split(":")[0];
      if (
        mainAttributeValue === variance.main &&
        subAttributeValue === variance.sub
      ) {
        price = details.product_variance[key][subKey].price;
        qty = details.product_variance[key][subKey].qty;
      }
    }
  }
  return { price, qty };
};

const Overview: React.FC<Props> = ({ details, attributes }) => {
  const router = useRouter();
  const {
    showModal,
    closeModal,
    setModalContent,
    content,
    isOpenModal,
    closeAfterSeconds,
    setCloseAfterSeconds,
  } = useModal();
  const { deviceType } = useScreenWidth();
  const [selectedVariance, setSelectedVariance] = useState<{
    main: string;
    sub: string;
  } | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const { userInfo, setUserInfo } = useStore();
  const [OpenMobileVarianceModal, setOpenMobileVarianceModal] = useState<
    "add" | "buy" | "close"
  >("close");

  const addToCart = async () => {
    if (!selectedVariance) return;
    const selectedMainAttrVal = selectedVariance.main;
    const selectedSubAttrVal = selectedVariance.sub;
    let selectedVarianceId = "";
    for (let key1 in details.product_variance) {
      const mainAtrrValue = key1.split(":")[0];
      for (let key2 in details.product_variance[key1]) {
        const subAtrrValue = key2.split(":")[0];
        const varianceId = details.product_variance[key1][key2].id;
        if (
          selectedMainAttrVal === mainAtrrValue &&
          subAtrrValue === selectedSubAttrVal
        ) {
          selectedVarianceId = varianceId;
        }
      }
    }
    if (selectedVarianceId.length > 0) {
      setCloseAfterSeconds(0);
      setModalContent(
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner bgColor="black" width="100px" />
        </div>
      );
      showModal();
      const updatedCart = await UserService.addToCart(selectedVarianceId, qty);
      await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
      closeModal();
      if (updatedCart) {
        const updatedUserInfo = structuredClone(userInfo);
        if (updatedUserInfo && updatedUserInfo.cart) {
          updatedUserInfo.cart = updatedCart;
          setUserInfo(updatedUserInfo);
          setModalContent(
            <div
              className="flex flex-row justify-center items-center w-[250px] h-[80px] bg-[white] mx-auto my-[250px] rounded-[5px] text-[green] font-bold
            text-[16px]"
            >
              Add To Cart Success
            </div>
          );
          setCloseAfterSeconds(2);
          showModal();
        }
      }
    }
    if (OpenMobileVarianceModal === "add") {
      setOpenMobileVarianceModal("close");
    }
  };

  const handleSetVariance = (type: "main" | "sub", value: string) => {
    const updatedSelectedVariance = Object.assign({}, selectedVariance);
    updatedSelectedVariance[type] = value;
    setSelectedVariance(updatedSelectedVariance);
  };

  useEffect(() => {
    if (selectedVariance) {
      const maxQty = getVarianceInfo(selectedVariance, details).qty;
      if (qty > maxQty) setQty(maxQty);
    }
  }, [qty, selectedVariance]);

  return (
    <Container>
      <Modal
        isOpen={isOpenModal}
        closeModal={closeModal}
        content={content}
        closeAfterSeconds={closeAfterSeconds}
      />
      <Left>
        {currentImage && (
          <CurrentImageContainer>
            <BlurImage
              style={{
                objectFit: deviceType === "desktop" ? "contain" : "cover",
                objectPosition: deviceType === "desktop" ? "center" : "top",
                transform: deviceType === "desktop" ? "scale(0.9)" : "scale(1)",
              }}
              src={currentImage}
            />
          </CurrentImageContainer>
        )}
        <ImageSlider
          isShowCurrentImage={!currentImage}
          images={details.images.map((image) => {
            return image.image_url;
          })}
        />
      </Left>
      <Right>
        <ProductTitle>{details.product_name}</ProductTitle>
        <ProductPrice>
          <Price
            currentPrice={
              selectedVariance
                ? getVarianceInfo(selectedVariance, details).price
                : 0
            }
          />
        </ProductPrice>
        {deviceType === "desktop" && (
          <VariancesDesktop
            attributes={attributes}
            selectedVariance={selectedVariance}
            setVariance={handleSetVariance}
            setInitVariance={(initVariance) =>
              setSelectedVariance(initVariance)
            }
            onHoverMainAtrr={(imageURL) => setCurrentImage(imageURL)}
            onLeaveAtrr={() => setCurrentImage(null)}
          />
        )}
        {deviceType === "mobile" && (
          <VariancesMobile
            onClickModalSubmitBtn={async (type) => {
              if (type === "add") return addToCart();
              await addToCart();
              router.push("/cart");
            }}
            setQty={(qty) => setQty(qty)}
            qty={qty}
            closeModal={() => setOpenMobileVarianceModal("close")}
            openMobileModal={OpenMobileVarianceModal}
            attributes={attributes}
            selectedVariance={selectedVariance}
            setVariance={handleSetVariance}
            setInitVariance={(initVariance) =>
              setSelectedVariance(initVariance)
            }
            details={details}
            onHoverMainAtrr={(imageURL) => setCurrentImage(imageURL)}
            onLeaveAtrr={() => setCurrentImage(null)}
          />
        )}
        {deviceType === "desktop" && (
          <>
            <OverviewSection>
              <OverviewSectionTitle>Quantity</OverviewSectionTitle>
              <OverviewSectionContent>
                <QuantitySelector>
                  <QuantityInput
                    style={{ height: "35px" }}
                    onDecrease={() => qty > 1 && setQty(qty - 1)}
                    onIncrease={() => {
                      if (!selectedVariance) return;
                      if (
                        qty < getVarianceInfo(selectedVariance, details).qty
                      ) {
                        setQty(qty + 1);
                      }
                    }}
                    onChange={(value) => {
                      if (parseInt(value)) {
                        setQty(parseInt(value));
                      } else {
                        if (value === "") {
                          setQty(1);
                        }
                      }
                    }}
                    quantity={qty}
                  />
                  <p>
                    {selectedVariance
                      ? getVarianceInfo(selectedVariance, details).qty
                      : 0}{" "}
                    products available
                  </p>
                </QuantitySelector>
              </OverviewSectionContent>
            </OverviewSection>
            <OverviewSection>
              <OverviewSectionContent className="buttons-container">
                <MyButton
                  height="45px"
                  onClick={() => addToCart()}
                  background="rgb(255,0,0,0.05)"
                  fontColor="red"
                  fontSize="14px"
                  customStyle={{ marginRight: "20px", border: "1px solid red" }}
                >
                  <AddShoppingCartIcon
                    style={{ fontSize: "20px" }}
                    color="inherit"
                  />
                  Add To Cart
                </MyButton>
                <MyButton
                  height="45px"
                  onClick={async () => {
                    await addToCart();
                    router.push("/cart");
                  }}
                  background="red"
                  fontColor="white"
                  fontSize="14px"
                >
                  Buy Now
                </MyButton>
              </OverviewSectionContent>
            </OverviewSection>
          </>
        )}
      </Right>
      {deviceType === "mobile" && (
        <AddToCartMobileFooter>
          <MyButton
            height="100%"
            onClick={() => setOpenMobileVarianceModal("add")}
            background="white"
            fontColor="red"
            fontSize="13px"
            width="50%"
          >
            <AddShoppingCartIcon style={{ fontSize: "20px" }} color="inherit" />{" "}
            Add To Cart
          </MyButton>
          <MyButton
            height="100%"
            onClick={() => setOpenMobileVarianceModal("buy")}
            background="red"
            fontColor="white"
            fontSize="13px"
            width="50%"
          >
            Buy Now
          </MyButton>
        </AddToCartMobileFooter>
      )}
    </Container>
  );
};

export default Overview;
