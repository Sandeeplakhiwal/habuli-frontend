"use client";
import React from "react";
import { Box, Container, InputBase, Typography, alpha } from "@mui/material";
import OrderProductTemplate from "@/components/templates/product/orderProductTemplate";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { fetchOrdersApi, useMyOrders } from "@/api/order";

function OrderComponent() {
  const {
    data: ordersData,
    error,
    isLoading: ordersIsLoading,
    isFetching,
  } = useQuery({
    queryKey: ["Orders"],
    queryFn: fetchOrdersApi,
  });
  console.log("Orders", ordersData);
  return (
    <Box mt={2}>
      {ordersIsLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Box alignItems={"center"} display={"flex"} justifyContent={"center"}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                fullWidth
              />
            </Search>
          </Box>
          {ordersData?.data?.orders?.length >= 1 ? (
            ordersData?.data?.orders?.map((i, index) => (
              <OrderProductTemplate key={index} order={i} />
            ))
          ) : (
            <Typography
              variant={"h4"}
              textAlign={"center"}
              color={"primary"}
              sx={{ cursor: "alias" }}
              alignItems={"center"}
              margin={"auto"}
              padding={"auto"}
            >
              No Orders Yet!
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default OrderComponent;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  marginTop: "1rem",
  marginBottom: "2rem",
  width: "50%",
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
