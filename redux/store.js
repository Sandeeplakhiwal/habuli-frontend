import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import buyNowReducer from "./slices/buyNowSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    buynow: buyNowReducer,
  },
  devTools: true,
});

// export const server = "http://localhost:5000/api/v1";
export const server = "https://habuli-server.onrender.com/api/v1";
// export const server = "https://habuli-backend-production.up.railway.app/api/v1";
