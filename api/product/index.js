import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { server } from "@/redux/store";

export const getCategoryProductsApi = ({ queryKey }) => {
  const category = queryKey[1];
  return axios.get(`${server}/products?category=${category}`, {
    withCredentials: true,
  });
};

export const getAllProductsApi = () => {
  return axios.get(`${server}/products`, {
    withCredentials: true,
  });
};

export const getFilteredProductsApi = (category) => {
  return axios.get(`${server}/products?category=${category}`, {
    withCredentials: true,
  });
};

export const searchProductApi = ({ queryKey }) => {
  const keyword = queryKey[1];
  return axios.get(`${server}/products?keyword=${keyword}`, {
    withCredentials: true,
  });
};
