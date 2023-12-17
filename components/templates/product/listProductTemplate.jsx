"use client";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
import NextLink from "next/link";
import { useParams } from "next/navigation";

function ListProductTemplate({ product }) {
  const params = useParams();
  const slug = params.slug;
  return (
    <CustomStack direction={"row"}>
      <CustomWrapperLink
        component={NextLink}
        href={`${slug}/item/${product?._id}`}
      >
        <ImageBox>
          <Image
            src={
              "https://rukminim2.flixcart.com/image/416/416/xif0q/keyboard/gaming-keyboard/w/u/g/evofox-deathray-prism-rgb-silent-membrane-keys-amkette-original-imagp4fwhmyzuwme.jpeg?q=70"
            }
            height={150}
            width={250}
            alt="camera"
          />
        </ImageBox>
        <ProductDetailBox>
          <CustomLink
            component={NextLink}
            href={`${slug}/item/${product?._id}`}
          >
            {product?.name}
          </CustomLink>
          <ReviewsTypography>
            {product?.ratings?.toFixed(1)}★ {product?.reviews.length} ratings &
            reviews
          </ReviewsTypography>
          <ProductDetailUL>
            <PruductDetailList>
              <ProductDetailTypo>{product?.description}</ProductDetailTypo>
            </PruductDetailList>
            <PruductDetailList>
              <ProductDetailTypo>Effective Pixels: 24.3 MP</ProductDetailTypo>
            </PruductDetailList>
            <PruductDetailList>
              <ProductDetailTypo>Sensor Type: CMOS</ProductDetailTypo>
            </PruductDetailList>
            <PruductDetailList>
              <ProductDetailTypo>WiFi Available</ProductDetailTypo>
            </PruductDetailList>
            <PruductDetailList>
              <ProductDetailTypo>Full HD</ProductDetailTypo>
            </PruductDetailList>
            <PruductDetailList>
              <ProductDetailTypo>2 Year Warranty</ProductDetailTypo>
            </PruductDetailList>
          </ProductDetailUL>
        </ProductDetailBox>
        <ProductPriceBox>
          <ProductPriceTypo variant={"h4"}>₹{product?.price}</ProductPriceTypo>
        </ProductPriceBox>
      </CustomWrapperLink>
    </CustomStack>
  );
}

export default ListProductTemplate;

const CustomStack = styled(Stack)(({ theme }) => ({
  backgroundColor: "white",
  display: "flex",
  flexDirection: "row",
  height: "auto",
  alignItems: "flex-start",
  marginTop: "8px",
  marginBottom: "8px",
}));
const CustomWrapperLink = styled(Link)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "flex-start",
  textDecoration: "none",
  color: "black",
}));

const ImageBox = styled(Box)`
  width: 25%;
  padding-top: 50px;
  padding-right: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ProductDetailBox = styled(Box)(({ theme }) => ({
  width: "50%",
  padding: "5px 8px",
}));

const ProductPriceBox = styled(Box)(({ theme }) => ({
  width: "25%",
  paddingTop: "50px",
}));

const CustomLink = styled(Link)(({ theme }) => ({
  color: "black",
  textDecoration: "none",
  fontWeight: 545,
  fontSize: 18,
  letterSpacing: "0.5px",
  ":hover": {
    color: theme.palette.primary.light,
  },
}));
const ReviewsTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  paddingTop: "5px",
}));
const ProductDetailUL = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "5px 14px",
  justifyContent: "center",
}));
const PruductDetailList = styled("li")(({ theme }) => ({
  fontWeight: 500,
}));
const ProductDetailTypo = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 10,
}));
const ProductPriceTypo = styled(Typography)(({ theme }) => ({
  fontWeight: 550,
  fontSize: 25,
}));
