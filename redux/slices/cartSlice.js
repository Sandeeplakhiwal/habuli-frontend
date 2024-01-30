"use client";
import { createSlice, nanoid } from "@reduxjs/toolkit";

export const getItemIndex = (cartItems = [], id) => {
  let index = cartItems.findIndex((item) => item._id === id);
  return index;
};

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartPrices: null,
};

const Slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (getItemIndex(state.cartItems, action.payload?._id) !== -1) {
        let index = getItemIndex(state.cartItems, action.payload._id);
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    addCartPrices: (state, action) => {
      state.cartPrices = action.payload;
    },
    removeCartPrices: (state, action) => {
      state.cartPrices = null;
    },
    removeFromCart: (state, action) => {
      let index = getItemIndex(state.cartItems, action.payload?._id);
      state.cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    incrementCartItem: (state, action) => {
      let index = getItemIndex(state.cartItems, action.payload?._id);
      state.cartItems[index].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrementCartItem: (state, action) => {
      let index = getItemIndex(state.cartItems, action.payload?._id);
      state.cartItems[index].quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  addCartPrices,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
} = Slice.actions;

export default Slice.reducer;
