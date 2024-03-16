"use client";

import { Box, Container, Typography } from "@mui/material";

import HomeProductTemplate from "../product/homeProductTemplate";

const ProductsCarousel = ({ title, productsData }) => {
  return (
    <Container
      sx={{
        padding: "1rem 0",
        minWidth: "320px",
        mt: "4rem",
        backgroundColor: "white",
      }}
    >
      <Typography variant={"h6"} fontWeight={550} px={2} pb={2}>
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: { sm: "space-evenly", xs: "space-between" },
          gap: 5,
          paddingX: 5,
          paddingBottom: 2,
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            width: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8F309F",
            borderRadius: "50px",
            height: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // Set the color of the track
            borderRadius: "50px", // Set the border radius of the track
          },
        }}
      >
        {productsData?.data?.products?.map((product, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <HomeProductTemplate product={product} />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default ProductsCarousel;
