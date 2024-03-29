import { Box, Typography } from "@mui/material";
import React from "react";

function Page({ params }) {
  return (
    <Box height={"100vh"} maxWidth={"md"} mx={"auto"} py={4} px={4}>
      <Typography>No results for {params.slug}</Typography>
      <Typography variant={"caption"}>
        Try checking your spelling or use more general terms
      </Typography>
    </Box>
  );
}

export default Page;
