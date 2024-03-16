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
    <CustomStack direction={"row"} pl={1} pr={1}>
      <CustomWrapperLink
        component={NextLink}
        href={`${slug}/item/${product ? product._id : ""}`}
      >
        <ImageBox>
          <Image
            src={product?.images?.[0]?.url || "/images/default-image.webp"}
            height={150}
            width={250}
            alt="camera"
          />
        </ImageBox>
        <ProductDetailBox>
          <CustomLink
            component={NextLink}
            href={`${slug}/item/${product?._id}`}
            sx={{ fontSize: 12 }}
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
  justifyContent: "space-between",
}));
const CustomWrapperLink = styled(Link)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100%",
  width: "100%",
  alignItems: "flex-start",
  textDecoration: "none",
  color: "black",
}));

const ImageBox = styled(Box)`
  width: 25%;
  height: 100%;
  padding-right: 10px;
  margin: auto 0;
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
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));
const ReviewsTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  paddingTop: "5px",
  [theme.breakpoints.down("sm")]: {
    fontSize: 10,
  },
}));
const ProductDetailUL = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "5px 14px",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: 10,
  },
}));
const PruductDetailList = styled("li")(({ theme }) => ({
  fontWeight: 500,
}));
const ProductDetailTypo = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 10,
}));
const ProductPriceTypo = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 25,
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
}));
