import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import ListProductTemplate from "@/components/templates/product/listProductTemplate";
import FilterBar from "@/components/client/filterBar";
import ListProductsWrapper from "@/components/client/listProductsWrapper";

function CategoryProductsListComponent() {
  return (
    <Box maxWidth={"xl"} mx={"auto"}>
      <Grid container spacing={1}>
        <Grid item md={3} sx={{ display: { xs: "none", md: "grid" } }}>
          <FilterBar />
        </Grid>
        <Grid item md={9} xs={12}>
          <ListProductsWrapper />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryProductsListComponent;
