"use client";
import { createSlice } from "@reduxjs/toolkit";
import { getItemIndex } from "./cartSlice";

const initialState = {
  buyNowItems: [],
  buyNowPrices: null,
};

const Slice = createSlice({
  name: "buyNowCart",
  initialState,
  reducers: {
    addToBuyNowCart: (state, action) => {
      const newItem = action.payload[0];

      const existingItemIndex = getItemIndex(state.buyNowItems, newItem?._id);

      if (existingItemIndex !== -1) {
        state.buyNowItems[existingItemIndex].quantity += 1;
      } else {
        state.buyNowItems.push(newItem);
      }

      // Make sure to create a new array to trigger Immer's immutability check
      state.buyNowItems = [...state.buyNowItems];
    },
    removeFromBuyNowCart: (state, action) => {
      let index = getItemIndex(state.buyNowItems, action.payload?._id);
      state.buyNowItems.splice(index, 1);
    },
    removeBuyNowPrices: (state, action) => {
      state.buyNowPrices = null;
    },
    incrementBuyNowItem: (state, action) => {
      let index = getItemIndex(state.buyNowItems, action.payload?._id);
      state.buyNowItems[index].quantity += 1;
    },
    decrementBuyNowItem: (state, action) => {
      let index = getItemIndex(state.buyNowItems, action.payload?._id);
      state.buyNowItems[index].quantity -= 1;
    },
    resetBuyNowCart: (state, action) => {
      state.buyNowItems = [];
      state.buyNowPrices = null;
    },
  },
});

export const {
  addToBuyNowCart,
  removeFromBuyNowCart,
  incrementBuyNowItem,
  decrementBuyNowItem,
  resetBuyNowCart,
  removeBuyNowPrices,
} = Slice.actions;

export default Slice.reducer;
