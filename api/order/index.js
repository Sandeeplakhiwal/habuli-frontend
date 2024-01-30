import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { server } from "@/redux/store";

export const fetchOrdersApi = () => {
  return axios.get(`${server}/orders`, {
    withCredentials: true,
  });
};

export const useMyOrders = () => {
  return useQuery({
    queryKey: ["Orders"],
    queryFn: fetchOrdersApi,
  });
};

export const getCordtAddressApi = ({ queryKey }) => {
  const { longitude, latitude } = queryKey[1];
  return axios.get(
    `https://api.opencagedata.com/geocode/v1/json?key=12688f5615dd47bbb4833b63a4ca6d8d&q=${latitude}%2C${longitude}&pretty=1`
  );
};

export const addShippingInfoApi = (formData) => {
  return axios.post(`${server}/shippinginfo/add`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const getShippingInfoApi = () => {
  return axios.get(`${server}/shippinginfo`, {
    withCredentials: true,
  });
};

export const deleteShippingInfo = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.delete(`${server}/shippinginfo/${id}`, {
    withCredentials: true,
  });
};

export const getCartProductsApi = ({ queryKey }) => {
  const cartItems = queryKey[1];

  // Map cartItems to include quantities
  const itemsWithQuantities = cartItems.map((item) => ({
    _id: item._id,
    quantity: item.quantity || 1, // default to 1 if quantity is not provided
  }));

  const queryParam = JSON.stringify(itemsWithQuantities);

  return axios.get(`${server}/cartitems`, {
    params: {
      items: queryParam,
    },
    withCredentials: true,
  });
};

export const getRazorpayApiKeyApi = () => {
  return axios.get(`${server}/razorpayapikey`, {
    withCredentials: true,
  });
};

export const createNewOrderApi = (formData) => {
  return axios.post(`${server}/order/new`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
