"use client";
import { getCategoryProductsApi } from "@/api/product";
import ProductsCarousel from "@/components/templates/caraousel/productsCarousel";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function HomeProductsCarouselWrapper() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["categoryProducts"],
    queryFn: () => getCategoryProductsApi("smartphone"),
  });
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
