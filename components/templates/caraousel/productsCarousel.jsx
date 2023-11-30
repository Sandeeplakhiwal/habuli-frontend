"use client";
import Slider from "react-slick";
// Importing styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Link, Typography } from "@mui/material";
import styled from "@emotion/styled";
import HomeProductTemplate from "../product/homeProductTemplate";

const ProductsCarousel = ({ title }) => {
  const mdSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
  };
  const smSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
  };
  const xsSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
  };
  const product = {};
  return (
    <>
      <Container
        sx={{
          padding: "0 2rem",
          minWidth: "320px",
          mt: "4rem",
          mb: "1rem",
          backgroundColor: "white",
          display: { sm: "none", md: "block", xs: "none" },
        }}
      >
        <Typography
          variant={"h5"}
          pt={"1rem"}
          pl={"1rem"}
          pb="5px"
          fontWeight={550}
        >
          {title}
        </Typography>
        <Carousel {...mdSliderSettings}>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
        </Carousel>
      </Container>
      <Container
        sx={{
          padding: "0 2rem",
          minWidth: "320px",
          mt: "4rem",
          mb: "1rem",
          backgroundColor: "white",
          display: { sm: "block", md: "none", xs: "none" },
        }}
      >
        <Typography
          variant={"h5"}
          pt={"1rem"}
          pl={"1rem"}
          pb="5px"
          fontWeight={550}
        >
          {title}
        </Typography>
        <Carousel {...smSliderSettings}>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
        </Carousel>
      </Container>
      <Container
        sx={{
          padding: "0 2rem",
          minWidth: "320px",
          mt: "4rem",
          mb: "1rem",
          backgroundColor: "white",
          display: { sm: "none", md: "none", xs: "block" },
        }}
      >
        <Typography variant={"h6"} pt="0.5rem" pb="5px" fontWeight={550}>
          {title}
        </Typography>
        <Carousel {...xsSliderSettings}>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
          <Wrap>
            <HomeProductTemplate product={product} />
          </Wrap>
        </Carousel>
      </Container>
    </>
  );
};

const Carousel = styled(Slider)`
  ul li button {
    &:before {
      font-size: 10px;
      color: #6d258e;
    }
  }

  li.slick-active button::before {
    color: #6d258e;
    font-size: 11px;
  }

  .slick-list {
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  .slick-prev:before,
  .slick-next:before {
    // font-size: 25px; /* adjust this value to make the buttons bigger */
    // color: #6d258e;
    color: black;
    height: 30px;
  }
`;

const Wrap = styled(Box)(({ theme }) => ({
  height: "170px",
  width: "150px",
}));

export default ProductsCarousel;

/* import React from "react";
import Slider from "react-slick";
import "./App.css";
import BasicCard from "./Card";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
}

export default function App() {
  const slider = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    // customPaging: function (i) {
    //   return <p>{i + 1}</p>;
    // },

    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
        REACT-SLICK CAROUSEL
      </h1>

      <div style={{ margin: 20 }}>
        <button onClick={() => slider?.current?.slickPrev()}>Prev</button>
        <button
          style={{ marginLeft: 20 }}
          onClick={() => slider?.current?.slickNext()}
        >
          Next
        </button>
      </div>

      <Slider ref={slider} {...settings}>
        {products?.map((item, index) => {
          return <BasicCard item={item} />;
        })}
      </Slider>
    </div>
  );
}

const products = [
  {
    id: 1,
    image: "https://shravanmeena.netlify.app/static/media/gym.c7d7ed62.png",
  },
  {
    id: 2,
    image: "https://shravanmeena.netlify.app/static/media/gym.c7d7ed62.png",
  },
  {
    id: 3,
    image: "https://shravanmeena.netlify.app/static/media/gym.c7d7ed62.png",
  },
  {
    id: 4,
    image: "https://shravanmeena.netlify.app/static/media/gym.c7d7ed62.png",
  },

  {
    id: 5,
    image: "https://shravanmeena.netlify.app/static/media/gym.c7d7ed62.png",
  },
  {
    id: 6,
    image: "https://shravanmeena.netlify.app/static/media/gym.c7d7ed62.png",
  },
]; */
