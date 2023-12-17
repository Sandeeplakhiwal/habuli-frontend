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
