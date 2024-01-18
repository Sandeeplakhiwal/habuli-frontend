"use client";
import { LoadUserApi } from "@/api/user";
import { loadUser } from "@/redux/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const LoadUser = () => {
  const dispatch = useDispatch();
  const {
    data: userLoadData,
    error: userLoadError,
    isLoading: userLoading,
    isSuccess: userLoadSuccess,
  } = useQuery({ queryKey: ["user"], queryFn: LoadUserApi });
  useEffect(() => {
    if (userLoadData && userLoadSuccess) {
      dispatch(loadUser(userLoadData.data?.user));
    }
  }, [userLoadData, userLoadError, userLoading]);
  return null;
};
