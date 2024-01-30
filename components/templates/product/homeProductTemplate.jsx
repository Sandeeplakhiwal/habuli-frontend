"use client";
import styled from "@emotion/styled";
import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import NextLink from "next/link";

function HomeProductTemplate({ product }) {
  return (
    <CustomContainerBox>
      <Link
        component={NextLink}
        href={`/products/category/${product ? product.category : "/"}`}
        sx={{ textDecoration: "none", color: "black" }}
      >
        <ImageWrapper>
          <Image
            src={product?.images?.[0]?.url || "/images/default-image.webp"}
            height={119}
            width={150}
            alt="camera"
          />
        </ImageWrapper>
        <DetailWrapper>
          <Typography
            variant={{ sm: "caption", md: "subtitle1" }}
            sx={{ opacity: "0.7" }}
            fontSize={{ xs: "12px", sm: "15px" }}
          >
            {product?.name}
          </Typography>
          <Typography
            variant={{ sm: "caption", md: "subtitle2" }}
            fontWeight={"bold"}
            fontSize={{ xs: "12px", sm: "15px", md: "16px" }}
          >
            From {product?.price} Rs
          </Typography>
        </DetailWrapper>
      </Link>
    </CustomContainerBox>
  );
}

export default HomeProductTemplate;

const CustomContainerBox = styled(Box)`
  height: 170px;
  width: 150px;
  @media (max-width: 720px) {
    height: 120px;
    width: 80px;
  }
  @media (max-width: 1080px) {
    height: 140px;
    width: 100px;
  }
  border: 0.1px solid #e0e0e0;
  padding: 0 5px;
  padding-top: 5px;
  background-color: white;
`;

const ImageWrapper = styled(Box)`
  height: 70%;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const DetailWrapper = styled(Box)`
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

// const CustomImage = styled(Image)(({ theme }) => ({
//   objectFit: "contain",
//   backgroundColor: "orange",
//   borderRadius: "50%",
// }));
