import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import CartItem from "@/components/templates/product/cartItem";
import {
  CartItemsCartWrapper,
  CartItemsWrapper,
  DeliveryAddressComp,
  PlaceOrderButton,
  PriceDetailsList,
} from "@/components/client/cart";
import ShieldIcon from "@mui/icons-material/Shield";
import { useSelector } from "react-redux";
import { PriceDetailsWrapper } from "@/components/client/checkout";

function CartComponent() {
  return (
    <Box
      sx={{
        pl: { sm: 2, xs: 0 },
        pr: { sm: 2, xs: 0 },
      }}
    >
      <Grid container gap={2}>
        <Grid item xs={12} md={7} sm={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,

              margin: "auto",
              mt: 1,
              justifyContent: "center",
            }}
          >
            <Box bgcolor={"#fff"} p={2}>
              <DeliveryAddressComp />
            </Box>
            <Box bgcolor={"#fff"} p={{ sm: 2, xs: 0.5 }} position={"relative"}>
              <CartItemsCartWrapper />
              <PlaceOrderButton />
            </Box>
            {/*             <Box bgcolor={"#fff"} p={{ sm: 2, xs: 0.5 }}>
              <CartItem />
            </Box> */}
          </Box>
        </Grid>
        <Grid item md={4} sm={12} xs={12} height={"auto"} mt={1}>
          <Typography
            sx={{ color: "GrayText", textTransform: "uppercase", p: 1 }}
            variant={"subtitle2"}
            bgcolor={"#fff"}
          >
            Price details
          </Typography>
          <hr />
          <PriceDetailsWrapper />
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "green",
              p: 1,
              fontSize: 12,
              gap: 1,
            }}
          >
            <ShieldIcon fontSize="small" /> Safe and secure payment
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartComponent;
