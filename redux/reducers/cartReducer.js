import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const cartReducer = createReducer(initialState, {
  cartItemAdd: (state, action) => {
    state.cartItems = action.payload;
  },
});
