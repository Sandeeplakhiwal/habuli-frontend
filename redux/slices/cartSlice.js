"use client";
import { createSlice } from "@reduxjs/toolkit";

export const getItemIndex = (cartItems = [], id) => {
  let index = cartItems.findIndex((item) => item._id === id);
  return index;
};

const initialState = {
  cartItems: [],
  cartPrices: null,
};

const Slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, quantity } = action.payload;

      if (getItemIndex(state.cartItems, _id) !== -1) {
        let index = getItemIndex(state.cartItems, _id);
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
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
    },
    incrementCartItem: (state, action) => {
      let index = getItemIndex(state.cartItems, action.payload?._id);
      state.cartItems[index].quantity += 1;
    },
    decrementCartItem: (state, action) => {
      let index = getItemIndex(state.cartItems, action.payload?._id);
      state.cartItems[index].quantity -= 1;
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
