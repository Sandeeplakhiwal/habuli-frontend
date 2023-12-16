import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { server } from "@/redux/store";

export const getCategoryProductsApi = (category) => {
  return axios.get(`${server}/products?category=${category}`, {
    withCredentials: true,
  });
};

export const getFilteredProductsApi = (category) => {
  return axios.get(`${server}/products?category=${category}`, {
    withCredentials: true,
  });
};
