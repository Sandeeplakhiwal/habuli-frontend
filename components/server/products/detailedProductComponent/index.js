"use client";
import {
  DetailsBoxContainer,
  ListImgComponent,
  ProductActionButtonBox,
  ProductImageBox,
} from "@/components/client/detailedProductComponent";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { server } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { addToBuyNowCart } from "@/redux/slices/buyNowSlice";

function DetailedProductComponent() {
  const params = useParams();
  const getDetailedProductApi = (pId) => {
    return axios.get(`${server}/product/${pId}`, {
      withCredentials: true,
    });
  };
  const { data } = useQuery({
    queryKey: ["DetailedProduct"],
    queryFn: () => getDetailedProductApi(params.pId),
  });

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    dispatch(addToCart({ _id: id, quantity: 1 }));
    toast.success("Item added to cart");
  };
  const router = useRouter();

  const buyNowBtnHandler = (id) => {
    dispatch(addToBuyNowCart([{ _id: id, quantity: 1 }]));
    router.push("/checkout/init");
  };

  return (
    <Grid
      container
      spacing={1}
      pt={"5vh"}
      pl={"1vw"}
      pr={"4px"}
      bgcolor={"white"}
    >
      <Grid item sm={1} xs={2}>
        <Grid item xs={12}>
          <ListImgComponent />
        </Grid>
        <Grid item xs={12}>
          <ListImgComponent />
        </Grid>
        <Grid item xs={12}>
          <ListImgComponent />
        </Grid>
        <Grid item xs={12}>
          <ListImgComponent />
        </Grid>
      </Grid>
      <Grid item sm={4} xs={10}>
        <Grid item xs={12}>
          <ProductImageBox product={data?.data?.product} />
        </Grid>
        <Grid item xs={10}>
          <ProductActionButtonBox
            id={data?.data?.product?._id}
            handleAddToCart={addToCartHandler}
            handleBuyNowBtn={buyNowBtnHandler}
          />
        </Grid>
      </Grid>
      <Grid item sm={7} xs={12}>
        <DetailsBoxContainer product={data?.data?.product} />
      </Grid>
    </Grid>
  );
}

export default DetailedProductComponent;
