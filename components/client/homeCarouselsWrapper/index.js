"use client";
import { getAllProductsApi, getCategoryProductsApi } from "@/api/product";
import { LoadUserApi } from "@/api/user";
import ProductsCarousel from "@/components/templates/caraousel/productsCarousel";
import AppLoader from "@/components/templates/loader/appLoader";
import { loadUser } from "@/redux/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function HomeProductsCarouselWrapper() {
  const dispatch = useDispatch();
  const { data: smartPhoneCategoryData } = useQuery({
    queryKey: ["categoryProducts", "smartphone"],
    queryFn: getCategoryProductsApi,
  });
  const { data: electronicsCategoryData } = useQuery({
    queryKey: ["categoryProducts", "electronics"],
    queryFn: getCategoryProductsApi,
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
  }, [userLoadData, userLoadError, userLoading, dispatch, userLoadSuccess]);

  const smartPhoneCategoryProducts = smartPhoneCategoryData
    ? smartPhoneCategoryData
    : [];
  const electronicsCategoryProducts = electronicsCategoryData
    ? electronicsCategoryData
    : [];
  return (
    <>
      <ProductsCarousel
        title={"Best of electronics"}
        productsData={electronicsCategoryProducts}
      />
      <ProductsCarousel
        title={"Best of smartphones"}
        productsData={smartPhoneCategoryProducts}
      />
    </>
  );
}

export default HomeProductsCarouselWrapper;
