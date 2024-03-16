"use client";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getShippingInfoApi } from "@/api/order";
import AddIcon from "@mui/icons-material/Add";
import NextLink from "next/link";
import { CartItemsWrapper, PriceDetailsList } from "../cart";
import {
  addPaymentInfoToOrder,
  addShippingInfoToOrder,
  removeOrderItemFromOrder,
} from "@/redux/slices/orderSlice";
import {
  addCartPrices,
  decrementCartItem,
  getItemIndex,
  incrementCartItem,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { getDateAfter7DaysFormatted } from "@/components/templates/product/cartItem";
import {
  decrementBuyNowItem,
  incrementBuyNowItem,
  removeFromBuyNowCart,
  resetBuyNowCart,
} from "@/redux/slices/buyNowSlice";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function CheckBoxes() {
  const { buyNowItems } = useSelector((state) => state.buynow);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (buyNowItems?.length === 0) {
      console.log("chla");
      router.push("/");
    }
  }, [buyNowItems?.length, router]);
  return (
    <Box sx={{ p: { xs: "1rem 0", sm: "1rem 2rem", overflowY: "auto" } }}>
      <LoginCheckBox />
      <br />
      <DeliveryAddressCheckBox />
      <br />
      <OrderSummaryBox />
      <br />
      <PaymentOptionsBox />
    </Box>
  );
}

function LoginCheckBox() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Box display={"flex"} flexDirection={"row"} bgcolor={"white"}>
      <Typography
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        bgcolor={"primary.light"}
        width={"20px"}
        textAlign={"center"}
        alignItems={"center"}
        mr={1}
        p={"auto 0"}
        color={"white"}
        fontSize={{ xs: 12, sm: 14 }}
      >
        1
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }} pt={1} pb={1}>
        <Typography
          textTransform={"uppercase"}
          fontSize={{ xs: 12, sm: 14 }}
          color={"GrayText"}
          fontWeight={500}
          alignItems={"center"}
          //   bgcolor={"orange"}
          display={"flex"}
        >
          Login
          {isAuthenticated ? (
            <CheckIcon
              sx={{ pb: 0.5, ml: 0.5 }}
              color="primary"
              fontSize={"small"}
            />
          ) : (
            <ClearIcon sx={{ pb: 0.5, ml: 0.5 }} fontSize={"small"} />
          )}
        </Typography>
        <Typography fontSize={{ xs: 12, sm: 14 }} fontWeight={500}>
          {user ? user.name : "username"}
        </Typography>
      </Box>
    </Box>
  );
}

function DeliveryAddressCheckBox() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { data: shippingInfoData, isSuccess: shippingInfoSuccess } = useQuery({
    queryKey: ["shipping-info"],
    queryFn: getShippingInfoApi,
  });
  const [shippingAddress, setShippingAddress] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let shippingAddressInLocalStorage = localStorage.getItem("shippingInfo")
        ? [JSON.parse(localStorage.getItem("shippingInfo"))]
        : [];
      setShippingAddress(shippingAddressInLocalStorage);
    }
  }, []);

  const dispatch = useDispatch();

  const handleDeliveryAddress = (item) => {
    dispatch(addShippingInfoToOrder(item));
  };

  useEffect(() => {
    if (
      shippingInfoData?.data?.shippingInfo?.length >= 1 &&
      shippingInfoSuccess
    ) {
      setShippingAddress(shippingInfoData?.data?.shippingInfo);
    }
  }, [shippingInfoData, shippingInfoSuccess]);

  return (
    <Box display={"flex"} flexDirection={"row"} bgcolor={"white"}>
      <Typography
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        bgcolor={"primary.light"}
        width={"20px"}
        textAlign={"center"}
        alignItems={"center"}
        mr={1}
        p={"auto 0"}
        color={"white"}
        fontSize={{ xs: 12, sm: 14 }}
      >
        2
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        width={"100%"}
        pt={1}
        pb={1}
      >
        <Typography
          textTransform={"uppercase"}
          fontSize={{ xs: 12, sm: 14 }}
          color={"GrayText"}
          fontWeight={500}
          alignItems={"center"}
          //   bgcolor={"orange"}
          display={"flex"}
        >
          Delivery address
          {isAuthenticated && shippingAddress.length > 0 ? (
            <CheckIcon
              sx={{ pb: 0.5, ml: 0.5 }}
              color="primary"
              fontSize={"small"}
            />
          ) : (
            <ClearIcon sx={{ pb: 0.5, ml: 0.5 }} fontSize={"small"} />
          )}
        </Typography>
        {shippingAddress.map((item, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            pt={0.5}
            pb={0.5}
            key={item?._id}
          >
            <input
              type={"radio"}
              name="deliveryAddress"
              onChange={() => handleDeliveryAddress(item)}
              required
            />
            <Typography ml={1} fontSize={{ xs: 12, sm: 14 }} fontWeight={300}>
              <Typography fontSize={{ xs: 12, sm: 14 }} fontWeight={400}>{`${
                user && user.name
              } ${item && item.phoneNo}`}</Typography>
              {item ? item.address : ""}
            </Typography>
          </Box>
        ))}
        <Box width={"50%"}>
          <Link
            component={NextLink}
            href={"/account"}
            sx={{ textDecoration: "none" }}
          >
            <Typography
              fontSize={{ xs: 12, sm: 14 }}
              alignItems={"center"}
              display={"flex"}
              color={"primary"}
              fontWeight={500}
              p={1}
            >
              <AddIcon fontSize="small" /> Add new address
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

function OrderSummaryBox() {
  const { buyNowItems } = useSelector((state) => state.buynow);
  return (
    <Box display={"flex"} flexDirection={"row"} bgcolor={"white"}>
      <Typography
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        bgcolor={"primary.light"}
        width={"20px"}
        textAlign={"center"}
        alignItems={"center"}
        mr={1}
        p={"auto 0"}
        color={"white"}
        fontSize={{ xs: 12, sm: 14 }}
      >
        3
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        width={"100%"}
        pt={1}
        pb={1}
      >
        <Typography
          textTransform={"uppercase"}
          fontSize={{ xs: 12, sm: 14 }}
          color={"GrayText"}
          fontWeight={500}
          alignItems={"center"}
          display={"flex"}
          pb={1}
        >
          Order Summary
        </Typography>
        <CartItemsWrapper items={buyNowItems} />
      </Box>
    </Box>
  );
}

function PaymentOptionsBox() {
  const [paymentOption, setPaymentOption] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentOptionChange = (selectedOption) => {
    setPaymentOption(selectedOption);
    dispatch(addPaymentInfoToOrder(selectedOption));
    if (selectedOption === "COD") {
      setShowCaptcha(true);
    } else {
      setShowCaptcha(false);
    }
  };

  return (
    <Box display={"flex"} flexDirection={"row"} bgcolor={"white"}>
      <Typography
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        bgcolor={"primary.light"}
        width={"20px"}
        textAlign={"center"}
        alignItems={"center"}
        mr={1}
        p={"auto 0"}
        color={"white"}
        fontSize={{ xs: 12, sm: 14 }}
      >
        4
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        bgcolor={"white"}
        pt={1}
        pb={1}
      >
        <Typography
          textTransform={"uppercase"}
          fontSize={{ xs: 12, sm: 14 }}
          color={"GrayText"}
          fontWeight={500}
          alignItems={"center"}
          display={"flex"}
          pb={1}
        >
          Payment Options
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          pt={0.5}
          pb={0.5}
        >
          <input
            type={"radio"}
            name="paymentOption"
            onChange={() => handlePaymentOptionChange("Online")}
            required
          />
          <Typography ml={1} fontSize={{ xs: 12, sm: 14 }} fontWeight={300}>
            <Typography
              fontSize={{ xs: 12, sm: 14 }}
              fontWeight={400}
            >{`Online Payment`}</Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          pt={0.5}
          pb={0.5}
        >
          <input
            type={"radio"}
            name="paymentOption"
            onChange={() => handlePaymentOptionChange("COD")}
            required
          />
          <Typography ml={1} fontSize={{ xs: 12, sm: 14 }} fontWeight={300}>
            <Typography
              fontSize={{ xs: 12, sm: 14 }}
              fontWeight={400}
            >{`Cash On Delivery`}</Typography>
          </Typography>
        </Box>
        {showCaptcha && <CaptchaComponent />}
      </Box>
    </Box>
  );
}

const CaptchaComponent = () => {
  const [captchaValue, setCaptchaValue] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState(generateCaptcha());

  function generateCaptcha() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return captcha;
  }

  const handleRefreshCaptcha = () => {
    setGeneratedCaptcha(generateCaptcha());
    setCaptchaValue("");
  };

  const handleCaptchaInputChange = (event) => {
    setCaptchaValue(event.target.value);
  };

  return (
    <Box mt={"2px"} p={2} pt={1}>
      <Typography variant="body2" gutterBottom>
        Please enter the characters you see in the image:
      </Typography>
      <Box display="flex" alignItems="center" mt={1}>
        <Typography variant="h6" style={{ marginRight: "10px" }}>
          {generatedCaptcha}
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          value={captchaValue}
          onChange={handleCaptchaInputChange}
          sx={{ bgcolor: "white" }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleRefreshCaptcha}
          style={{ marginLeft: "10px" }}
        >
          Refresh
        </Button>
      </Box>
    </Box>
  );
};

export const PriceDetailsWrapper = () => {
  const { buyNowItems } = useSelector((state) => state.buynow);
  return <PriceDetailsList items={buyNowItems} />;
};

export function BuyNowItem({
  product,
  cartProductsRefetch,
  cartProductsData,
  cartProductsSuccess,
}) {
  // Example usage
  const deliveryDateFormatted = getDateAfter7DaysFormatted();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { buyNowItems } = useSelector((state) => state.buynow);
  const router = useRouter();

  const handleRemoveItem = (id = "") => {
    dispatch(removeFromBuyNowCart({ _id: id }));
    dispatch(removeOrderItemFromOrder({ _id: id }));
    queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    toast.success("Item has removed");
  };

  const handleIncrementCartItem = (id = "") => {
    dispatch(incrementBuyNowItem({ _id: id }));
    // cartProductsRefetch();
    queryClient.invalidateQueries({ queryKey: ["cart-items", buyNowItems] });
  };

  const handleDecrementCartItem = (id = "") => {
    dispatch(decrementBuyNowItem({ _id: id }));
    cartProductsRefetch();
  };

  useEffect(() => {
    if (cartProductsData && cartProductsSuccess) {
      dispatch(addCartPrices(cartProductsData?.data?.prices));
    }
  }, [cartProductsData, cartProductsSuccess, dispatch]);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box mb={2}>
      <Grid container gap={2}>
        <Grid item xs={3}>
          <ImgBox
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
            }}
          >
            <Image
              src={product?.images?.[0]?.url || "/images/default-image.webp"}
              alt="item-img"
              height={isMobile ? 70 : 90}
              width={isMobile ? 90 : 120}
              style={{ borderRadius: "5px" }}
            />
          </ImgBox>
        </Grid>
        <Grid item xs={4} display={"flex"} flexDirection={"column"}>
          <Typography
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            fontSize={{ sm: 14, xs: 12 }}
          >
            {product ? product.name : ""}
          </Typography>
          <Typography fontSize={{ sm: 12, xs: 10 }} sx={{ opacity: 0.8 }}>
            {/* Size: M */}
            {product ? product.description : ""}
          </Typography>
          <Typography
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            fontSize={{ sm: 12, xs: 10 }}
            sx={{ opacity: 0.8 }}
          >
            Seller: {product ? product.user.name : ""}
          </Typography>
          <Typography mt={0.5} variant={"subtitle2"}>{`${
            product
              ? product.price *
                (buyNowItems
                  ? buyNowItems[
                      getItemIndex(buyNowItems, product ? product._id : "")
                    ].quantity
                  : 1)
              : 0
          }`}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography fontSize={{ sm: 14, xs: 12 }} textAlign={"right"}>
            {`Delivery by ${deliveryDateFormatted}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ flexDirection: "row", alignItems: "center" }}>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            p: "0.5rem",
            alignItems: "center",
          }}
        >
          <Typography
            component={"button"}
            borderRadius={"50%"}
            padding={"1px 10px"}
            border={"none"}
            onClick={() => handleDecrementCartItem(product ? product._id : "")}
            disabled={
              buyNowItems &&
              buyNowItems[getItemIndex(buyNowItems, product ? product._id : "")]
                .quantity <= 1
            }
            sx={{ cursor: "pointer", ":disabled": { cursor: "default" } }}
          >
            -
          </Typography>
          <Typography
            component={"article"}
            borderRadius={1}
            pl={0.5}
            pr={0.5}
            fontSize={{ sm: 14, xs: 12 }}
          >
            {buyNowItems
              ? buyNowItems[
                  getItemIndex(buyNowItems, product ? product._id : "")
                ].quantity
              : 0}
          </Typography>
          <Typography
            component={"button"}
            borderRadius={"50%"}
            padding={"1px 10px"}
            border={"none"}
            onClick={() => handleIncrementCartItem(product ? product._id : "")}
            sx={{ cursor: "pointer" }}
          >
            +
          </Typography>
        </Grid>
        {/*         <Typography
          p={"0.5rem"}
          fontSize={{ sm: 14, xs: 12 }}
          variant={"text"}
          color={"primary"}
          textTransform={"uppercase"}
          sx={{ cursor: "pointer", "&:hover": { opacity: 0.9 } }}
        >
          Save For Later
        </Typography> */}
        <Typography
          p={{ sm: "0.5rem" }}
          fontSize={{ sm: 14, xs: 12 }}
          ml={{ xs: 1, sm: 0 }}
          variant="text"
          color={"primary"}
          textTransform={"uppercase"}
          sx={{ cursor: "pointer", "&:hover": { opacity: 0.9 } }}
          onClick={() => handleRemoveItem(product ? product._id : "")}
        >
          Remove
        </Typography>
      </Grid>
      <Divider />
    </Box>
  );
}

const ImgBox = styled(Box)`
  height: 90px;
  width: 90%;
  margin: auto;
  text-align: center;
`;
