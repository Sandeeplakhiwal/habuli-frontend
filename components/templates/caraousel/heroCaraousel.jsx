"use client";
import Slider from "react-slick";
// Importing styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Link, Typography } from "@mui/material";
import styled from "@emotion/styled";

import Image from "next/image";
import NextLink from "next/link";

const HeroCaraousel = ({ images }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Container sx={{ padding: "0 2rem", minWidth: "320px" }}>
      <Carousel {...sliderSettings}>
        {images.map((i) => (
          <Wrap key={i.id}>
            <Link href="/" component={NextLink}>
              <Image src={i.image} alt="image" />
            </Link>
          </Wrap>
        ))}
      </Carousel>
    </Container>
  );
};

export default HeroCaraousel;

const Carousel = styled(Slider)`
  ul li button {
    &:before {
      font-size: 7px;
      color: #6d258e;
    }
  }

  li.slick-active button::before {
    color: #6d258e;
    font-size: 8px;
  }

  .slick-list {
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  .slick-prev:before,
  .slick-next:before {
    // font-size: 25px; /* adjust this value to make the buttons bigger */
    color: #6d258e;
    height: 30px;
  }
`;

const Wrap = styled(Box)`
  border: 4px solid transparent;
  height: 50vh;
  min-width: 320px;
  @media (max-width: 768px) {
    height: 25vh;
  }
  a {
    object-fit: contain;
    min-width: 320px;
    img {
      border: 4px solid transparent;
      border-radius: 4px;
      width: 100%;
      height: 100%;
      transition-duration: 300ms;
      object-fit: contain;
      min-width: 320px;
    }
  }
`;
