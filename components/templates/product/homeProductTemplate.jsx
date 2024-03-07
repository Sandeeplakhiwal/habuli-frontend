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
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ImageWrapper>
          <Image
            src={product?.images?.[0].url || "/images/default-image.webp"}
            height={150} // Adjusted height
            width={200} // Keeping width consistent
            alt="camera"
          />
        </ImageWrapper>
        <DetailWrapper>
          <Typography
            variant="subtitle2"
            fontSize={12}
            fontWeight="bold"
            sx={{ textAlign: "center", marginTop: 1 }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ textAlign: "center", marginTop: 1 }}
            fontSize={10}
          >
            From {product.price} Rs
          </Typography>
        </DetailWrapper>
      </Link>
    </CustomContainerBox>
  );
}

export default HomeProductTemplate;

const CustomContainerBox = styled(Box)`
  width: 200px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  background-color: white;
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    width: 150px;
    margin: 0 auto 20px;
    padding: 0;
    padding-bottom: 10px;
  }
`;

const ImageWrapper = styled(Box)`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  flex-grow: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const DetailWrapper = styled(Box)`
  width: 100%;
  margin: 10px;
`;
