import axios from "axios";
import { cache } from "react";

export const getProduct = cache(async (id) => {
  const server = "http://localhost:5000/api/v1";
  // const server = "https://habuli-backend-production.up.railway.app/api/v1";
  // const server = "https://habuli-server.onrender.com/api/v1";

  try {
    const response = await axios.get(`${server}/product/${id}`, {
      withCredentials: true,
    });
    return response.data.product;
  } catch (error) {
    return error;
  }
});
