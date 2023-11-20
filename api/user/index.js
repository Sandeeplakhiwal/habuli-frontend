import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { server } from "@/redux/store";

export const login = (formData) => {
  console.log("Form data check", formData);
  return axios.post(`${server}/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const useLoginApi = () => {
  return useMutation(login);
};
