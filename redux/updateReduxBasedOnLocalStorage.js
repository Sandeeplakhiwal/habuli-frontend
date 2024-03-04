"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBuyNowInitialState } from "./slices/buyNowSlice";
import { setCartItemsInitialState } from "./slices/cartSlice";

function UpdateReduxBasedOnLocalStorage() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedBuyNowItems = JSON.parse(localStorage.getItem("buyNowItems"));
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
      dispatch(setBuyNowInitialState(storedBuyNowItems));
      dispatch(setCartItemsInitialState(storedCartItems));
    }
  }, []);
  return null;
}

export default UpdateReduxBasedOnLocalStorage;
