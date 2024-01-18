import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {};

const Slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { addToCart } = Slice.actions;

export default Slice.reducer;
