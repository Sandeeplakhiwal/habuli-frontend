import {
  DetailsBoxContainer,
  ListImgComponent,
  ProductActionButtonBox,
  ProductImageBox,
} from "@/components/client/detailedProductComponent";
import { Box, Grid, ListItem } from "@mui/material";
import React from "react";

function DetailedProductComponent() {
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
          <ProductImageBox />
        </Grid>
        <Grid item xs={10}>
          <ProductActionButtonBox />
        </Grid>
      </Grid>
      <Grid item sm={7} xs={12}>
        <DetailsBoxContainer />
      </Grid>
    </Grid>
  );
}

export default DetailedProductComponent;
