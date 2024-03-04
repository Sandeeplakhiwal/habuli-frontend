"use client";
import {
  addCartPrices,
  decrementCartItem,
  getItemIndex,
  incrementCartItem,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import styled from "@emotion/styled";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export function getDateAfter7DaysFormatted() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 7);

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    currentDate
  );
  const dayOfMonth = currentDate.getDate();

  // Format the date
  const formattedDate = `${dayOfWeek} ${month} ${dayOfMonth}`;

  return formattedDate;
}

function CartItem({
  product,
  cartProductsRefetch,
  cartProductsData,
  cartProductsSuccess,
}) {
  // Example usage
  const deliveryDateFormatted = getDateAfter7DaysFormatted();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { cartItems, cartPrices } = useSelector((state) => state.cart);

  const handleRemoveItem = (id = "") => {
    dispatch(removeFromCart({ _id: id }));
    queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    toast.success("Item has removed");
  };

  const handleIncrementCartItem = (id = "") => {
    dispatch(incrementCartItem({ _id: id }));
    // cartProductsRefetch();
    queryClient.invalidateQueries({ queryKey: ["cart-items", cartItems] });
  };

  const handleDecrementCartItem = (id = "") => {
    dispatch(decrementCartItem({ _id: id }));
    cartProductsRefetch();
  };

  useEffect(() => {
    if (cartProductsData && cartProductsSuccess) {
      dispatch(addCartPrices(cartProductsData?.data?.prices));
    }
  }, [cartProductsData, cartProductsSuccess, dispatch]);

  return (
    <Box mb={2}>
      <Grid container gap={1}>
        <Grid item xs={3}>
          <ImgBox>
            <Image
              src={product?.images?.[0]?.url || "/images/default-image.webp"}
              alt="item-img"
              height={90}
              width={150}
            />
          </ImgBox>
        </Grid>
        <Grid item xs={5} display={"flex"} flexDirection={"column"}>
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
          <Typography mt={0.5}>{`₹${
            product
              ? product.price *
                (cartItems
                  ? cartItems[
                      getItemIndex(cartItems, product ? product._id : "")
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
              cartItems &&
              cartItems[getItemIndex(cartItems, product ? product._id : "")]
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
            {cartItems
              ? cartItems[getItemIndex(cartItems, product ? product._id : "")]
                  .quantity
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

export default CartItem;

const ImgBox = styled(Box)`
  height: 90px;
  width: 90%;
  margin: auto;
  text-align: center;
`;
