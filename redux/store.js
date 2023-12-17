import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export default store;

export const server = `https://habuli-server.onrender.com/api/v1`;
// export const server = `http://localhost:5000/api/v1`;
