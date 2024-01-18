"use client";
import {
  DetailsBoxContainer,
  ListImgComponent,
  ProductActionButtonBox,
  ProductImageBox,
} from "@/components/client/detailedProductComponent";
import { Box, Grid, ListItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import { server } from "@/redux/store";
import { useSelector } from "react-redux";
import { LoadUser } from "@/libs/fetch";

function DetailedProductComponent() {
  const params = useParams();
  const getDetailedProductApi = (pId) => {
    return axios.get(`${server}/product/${pId}`, {
      withCredentials: true,
    });
  };
  const { data } = useQuery({
    queryKey: "DetailedProduct",
    queryFn: () => getDetailedProductApi(params.pId),
  });

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Grid
      container
      spacing={1}
      pt={"5vh"}
      pl={"1vw"}
      pr={"4px"}
      bgcolor={"white"}
    >
      {isAuthenticated ? null : <LoadUser />}
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
          <ProductImageBox />
        </Grid>
        <Grid item xs={10}>
          <ProductActionButtonBox />
        </Grid>
      </Grid>
      <Grid item sm={7} xs={12}>
        <DetailsBoxContainer product={data?.data?.product} />
      </Grid>
    </Grid>
  );
}

export default DetailedProductComponent;
