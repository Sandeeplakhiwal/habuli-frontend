import HeroCaraousel from "@/components/templates/caraousel/heroCaraousel";
import React from "react";
import roadImg from "@/public/road.jpg";
import { Box, Typography } from "@mui/material";
import slider1 from "@/public/slider1.jpg";
import slider2 from "@/public/slider2.jpg";
import slider3 from "@/public/slider3.jpg";
// import slider4 from "@/public/slider4.webp";
import slider5 from "@/public/slider5.webp";
import slider6 from "@/public/slider6.webp";
import slider7 from "@/public/slider7.webp";
import ProductsCarousel from "@/components/templates/caraousel/productsCarousel";
import HomeProductsCarouselWrapper from "@/components/client/homeCarouselsWrapper";

const Images = [
  {
    id: 1,
    image: slider7,
  },
  {
    id: 2,
    image: slider5,
  },
  {
    id: 3,
    image: slider6,
  },
  {
    id: 4,
    image: slider7,
  },
];

function HomeComponent() {
  return (
    <Box>
      <HeroCaraousel images={Images} />
      <HomeProductsCarouselWrapper />
      <Box sx={{ height: "50vh" }} />
    </Box>
  );
}

export default HomeComponent;
