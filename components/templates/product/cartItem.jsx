"use client";
import styled from "@emotion/styled";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";

function CartItem() {
  return (
    <Box mb={2}>
      <Grid container gap={1}>
        <Grid item xs={3}>
          <ImgBox>
            <img
              src="https://rukminim2.flixcart.com/image/224/224/kg9qbgw0-0/t-shirt/o/v/f/xl-shp395402-shapphr-original-imafwjx7wqgcznvx.jpeg?q=90"
              alt="item-img"
              height={90}
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
            SHAPPHR Printed Men Hooded Neck White, Black, Grey
          </Typography>
          <Typography fontSize={{ sm: 12, xs: 10 }} sx={{ opacity: 0.8 }}>
            Size: M
          </Typography>
          <Typography
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            fontSize={{ sm: 12, xs: 10 }}
            sx={{ opacity: 0.8 }}
          >
            Seller: SHAPPHR
          </Typography>
          <Typography mt={0.5}>₹678</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography fontSize={{ sm: 14, xs: 12 }} textAlign={"right"}>
            Delivery by Sun Jan 7
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
            2
          </Typography>
          <Typography
            component={"button"}
            borderRadius={"50%"}
            padding={"1px 10px"}
            border={"none"}
          >
            +
          </Typography>
        </Grid>
        <Typography
          p={"0.5rem"}
          fontSize={{ sm: 14, xs: 12 }}
          variant={"text"}
          color={"primary"}
          textTransform={"uppercase"}
          sx={{ cursor: "pointer", "&:hover": { opacity: 0.9 } }}
        >
          Save For Later
        </Typography>
        <Typography
          p={{ sm: "0.5rem" }}
          fontSize={{ sm: 14, xs: 12 }}
          variant="text"
          color={"primary"}
          textTransform={"uppercase"}
          sx={{ cursor: "pointer", "&:hover": { opacity: 0.9 } }}
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
