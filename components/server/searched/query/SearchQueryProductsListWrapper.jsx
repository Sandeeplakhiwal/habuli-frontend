"use client";
import { searchProductApi } from "@/api/product";
import ListProductTestTemplate from "@/components/test-templates/ListProductTestTemplate";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchQueryProductsList from "./SearchQueryProductsList";

function SearchQueryProductsListWrapper() {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const query = params.slug;
  const {
    data: searchData,
    error: searchError,
    isSuccess: searchSuccess,
    isLoading: searchLoading,
  } = useQuery({
    queryKey: ["search-product-list", query],
    queryFn: searchProductApi,
  });

  useEffect(() => {
    if (searchSuccess && searchData) {
      setProducts(searchData.data?.products);
    }
  }, [searchSuccess, searchData, searchError]);

  return products.map((product) => (
    <SearchQueryProductsList key={product._id} product={product} />
  ));
}

export default SearchQueryProductsListWrapper;
