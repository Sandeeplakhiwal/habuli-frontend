import FilterBar from "@/components/client/filterBar";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import SearchQueryProductsListWrapper from "./SearchQueryProductsListWrapper";

function SearchQueryProductsListComponent() {
  return (
    <Box maxWidth={"xl"} mx={"auto"}>
      <Grid container spacing={1}>
        <Grid item md={3} sx={{ display: { xs: "none", md: "grid" } }}>
          <FilterBar />
        </Grid>
        <Grid item md={9} xs={12}>
          <SearchQueryProductsListWrapper />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchQueryProductsListComponent;
