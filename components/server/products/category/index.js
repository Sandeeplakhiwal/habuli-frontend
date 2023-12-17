import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import ListProductTemplate from "@/components/templates/product/listProductTemplate";
import FilterBar from "@/components/client/filterBar";
import ListProductsWrapper from "@/components/client/listProductsWrapper";

function CategoryProductsListComponent() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <FilterBar />
      </Grid>
      <Grid item xs={9}>
        <ListProductsWrapper />
      </Grid>
    </Grid>
  );
}

export default CategoryProductsListComponent;
