import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
});

export const server = "http://localhost:5000/api/v1";
// export const server = "https://habuli-server.onrender.com";
