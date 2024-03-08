"use client";
import { getCartProductsApi } from "@/api/order";
import CartItem from "@/components/templates/product/cartItem";
import { addToBuyNowCart } from "@/redux/slices/buyNowSlice";
import { addCartPrices, getItemIndex } from "@/redux/slices/cartSlice";
import { addOrderItemsToOrder } from "@/redux/slices/orderSlice";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BuyNowItem } from "../checkout";
import { useRouter } from "next/navigation";

export const PriceDetailsList = ({ items }) => {
  const dispatch = useDispatch();
  const { cartPrices } = useSelector((state) => state.cart);
  const productIds = [];
  items.forEach((item) => {
    productIds.push(item?._id);
  });
  const {
    data: cartProductsData,
    isSuccess: cartProductsSuccess,
    refetch: cartProductsRefetch,
    isLoading: cartProductsLoading,
  } = useQuery({
    queryKey: ["cart-items", items],
    queryFn: getCartProductsApi,
  });
  useEffect(() => {
    if (cartProductsData && cartProductsSuccess) {
      dispatch(addCartPrices(cartProductsData?.data?.prices));
    }
  }, [cartProductsData, cartProductsSuccess, dispatch]);
  return (
    <List dense={true} sx={{ bgcolor: "#fff" }}>
      <ListItem>
        <ListItemText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          primary="Price"
          secondary={`${cartPrices ? cartPrices.itemsPrice : 0}`}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          primary="Delivery charges"
          secondary={`${cartPrices ? cartPrices.shippingCharges : 0}`}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          primary="Tax"
          secondary={`${cartPrices ? cartPrices.taxPrice : 0}`}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#efefef",
            padding: 1,
          }}
          primary="Total amount"
          secondary={`${cartPrices ? cartPrices.totalAmount : 0}`}
        />
      </ListItem>
    </List>
  );
};

export const DeliveryAddressComp = () => {
  const { user } = useSelector((state) => state.user);
  let shippingInfo;
  if (typeof window !== "undefined" && window.localStorage) {
    shippingInfo = localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : "";
  }
  return (
    <Typography
      color={"GrayText"}
      variant={"subtitle2"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography variant={"caption"}>
        Deliver to: {user && user.name}
      </Typography>
      {shippingInfo && shippingInfo.address}
    </Typography>
  );
};

export const PlaceOrderButton = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const router = useRouter();

  function handlePlaceOrder(e) {
    console.log(cartItems.length);
    console.log(cartItems);
    if (cartItems.length > 0) {
      console.log("chla kya??");
      cartItems.forEach((item) => {
        console.log(item);
        dispatch(addToBuyNowCart([{ _id: item._id, quantity: item.quantity }]));
      });
      router.push("/checkout/init");
    }
  }
  return (
    <Box
      position={"sticky"}
      bottom={0}
      bgcolor={"#fff"}
      p={2}
      textAlign={"right"}
      sx={{ boxShadow: "0px -2px 4px 0px rgba(0, 0, 0, 0.2)" }}
    >
      {/* <Link href={"/checkout/init"} onClick={(e) => handlePlaceOrder}> */}
      <Button
        variant={"contained"}
        onClick={(e) => handlePlaceOrder(e)}
        disabled={!cartItems.length}
      >
        Place Order
      </Button>
      {/*  </Link> */}
    </Box>
  );
};

export const CartItemsWrapper = ({ items, isCart = false }) => {
  const dispatch = useDispatch();
  let {
    data: cartProductsData,
    isSuccess: cartProductsSuccess,
    refetch: cartProductsRefetch,
    isLoading: cartProductsLoading,
  } = useQuery({
    queryKey: ["cart-items", items],
    queryFn: getCartProductsApi,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (cartProductsData && cartProductsSuccess) {
      dispatch(addCartPrices(cartProductsData?.data?.prices));
      dispatch(
        addOrderItemsToOrder(
          (cartProductsData?.data?.products || []).map((item) => {
            const itemId = item ? item._id : "";
            const itemQuantity =
              items[getItemIndex(items, itemId)]?.quantity || 0;

            return { ...item, quantity: itemQuantity };
          })
        )
      );
    }
  }, [cartProductsData, cartProductsSuccess, dispatch, items]);

  if (!items.length) {
    return <Typography textAlign={"center"}>No items in cart</Typography>;
  }

  return cartProductsLoading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size={"medium"} />
    </Box>
  ) : (
    cartProductsData?.data?.products?.map((item) =>
      isCart ? (
        <CartItem
          key={item._id}
          product={item}
          cartProductsRefetch={cartProductsRefetch}
          cartProductsData={cartProductsData}
          cartProductsSuccess={cartProductsSuccess}
        />
      ) : (
        <BuyNowItem
          key={item._id}
          product={item}
          cartProductsRefetch={cartProductsRefetch}
          cartProductsData={cartProductsData}
          cartProductsSuccess={cartProductsSuccess}
        />
      )
    )
  );
};

export const CartItemsCartWrapper = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return <CartItemsWrapper items={cartItems} isCart={true} />;
};
