"use client";
import React, { useEffect, useState } from "react";
import { Box, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { fetchOrdersApi } from "@/api/order";
import { useSelector } from "react-redux";
import OrderProductTemplate from "@/components/templates/product/orderProductTemplate";

function getDeliveryDate(createdAt) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const theDate = new Date(createdAt);
  theDate.setDate(theDate.getDate() + 7);
  const dayOfWeek = daysOfWeek[theDate.getDay()];
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    theDate
  );
  const dayOfMonth = theDate.getDate();
  const formattedDate = `${dayOfWeek} ${month} ${dayOfMonth}`;
  return formattedDate;
}

function OrderComponent() {
  const {
    data: ordersData,
    isLoading: ordersIsLoading,
    isSuccess: ordersSuccess,
  } = useQuery({
    queryKey: ["Orders"],
    queryFn: fetchOrdersApi,
    refetchOnMount: true,
  });

  const { isAuthenticated } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleSearch = (orders) => {
    const lowerKeyword = keyword.toLowerCase().trim();

    if (lowerKeyword === "") {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) =>
      order.orderItems.some((item) =>
        item.name.toLowerCase().includes(lowerKeyword)
      )
    );

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    if (ordersData && ordersSuccess) {
      handleSearch(ordersData?.data?.orders);
      setOrders(ordersData?.data?.orders);
    }
  }, [ordersData, ordersSuccess, handleSearch]);

  return (
    <Box mt={2}>
      {ordersIsLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              fullWidth
              onKeyDown={(e) =>
                e.key === "Enter" ? handleSearch(orders) : null
              }
              autoFocus={true}
            />
          </Search>
          {filteredOrders.length >= 1 ? (
            filteredOrders.map((order, index) =>
              order?.orderItems?.map((orderItem, indx) => (
                <OrderProductTemplate
                  key={indx}
                  order={order}
                  status={order ? order.orderStatus : ""}
                  deliveryDate={getDeliveryDate(order ? order.createdAt : "")}
                  orderItem={orderItem}
                />
              ))
            )
          ) : (
            <Typography
              variant="h4"
              textAlign="center"
              color="primary"
              sx={{ cursor: "alias" }}
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
  marginLeft: "auto",
  marginRight: "auto",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
