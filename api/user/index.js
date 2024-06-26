import axios from "axios";
import { server } from "@/redux/store";

export const loginApi = (formData) => {
  return axios.post(`${server}/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
export const signupApi = (formData) => {
  return axios.post(`${server}/register`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const LoadUserApi = () => {
  return axios.get(`${server}/me`, {
    withCredentials: true,
  });
};

export const forgotPasswordApi = (formData) => {
  return axios.post(`${server}/password/forgot`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const resetPasswordApi = (data) => {
  const { password, token } = data;
  return axios.put(
    `${server}/password/reset/${token}`,
    { password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const updateProfileApi = (formData) => {
  return axios.put(`${server}/profile/update`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
