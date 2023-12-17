"use client";
import ListProductTemplate from "@/components/templates/product/listProductTemplate";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { server } from "@/redux/store";
import axios from "axios";
import { useParams } from "next/navigation";

function ListProductsWrapper() {
  const params = useParams();
  const getFilteredProductsApi = (category) => {
    return axios.get(`${server}/products?category=${category}`, {
      withCredentials: true,
    });
  };
  const { data } = useQuery({
    queryKey: "ListProducts",
    queryFn: () => getFilteredProductsApi(params.slug),
  });
  console.log("ListProducts", data);
  return (
    <>
      {data?.data?.products?.map((product) => (
        <ListProductTemplate product={product} />
      ))}
    </>
  );
}

export default ListProductsWrapper;
