"use client";
import { getAllProductsApi, getCategoryProductsApi } from "@/api/product";
import { LoadUserApi } from "@/api/user";
import ProductsCarousel from "@/components/templates/caraousel/productsCarousel";
import { loadUser } from "@/redux/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function HomeProductsCarouselWrapper() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useQuery({
    queryKey: ["categoryProducts"],
    // queryFn: () => getCategoryProductsApi("tv"),
    queryFn: () => getAllProductsApi(),
  });
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
  const productsData = data ? data : [];
  return (
    <>
      <ProductsCarousel
        title={"Best of electronics"}
        productsData={productsData}
      />
    </>
  );
}

export default HomeProductsCarouselWrapper;
