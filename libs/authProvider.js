import { getRazorpayApiKeyApi } from "@/api/order";
import { LoadUserApi } from "@/api/user";
import { loadUser } from "@/redux/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const {
    data: userLoadData,
    error: userLoadError,
    isLoading: userLoading,
    isSuccess: userLoadSuccess,
  } = useQuery({ queryKey: ["user"], queryFn: LoadUserApi });

  const { data: razorpayKeyData, isSuccess: razorpayKeySuccess } = useQuery({
    queryKey: ["get-razorpay-api-key"],
    queryFn: getRazorpayApiKeyApi,
  });

  useEffect(() => {
    if (userLoadData && userLoadSuccess) {
      dispatch(loadUser(userLoadData.data?.user));
    }
  }, [userLoadData, userLoadError, userLoading]);
  return children;
};
