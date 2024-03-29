"use client";
import {
  DetailsBoxContainer,
  ListImgComponent,
  ProductActionButtonBox,
  ProductImageBox,
} from "@/components/client/detailedProductComponent";
import { Box, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { server } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { addToBuyNowCart } from "@/redux/slices/buyNowSlice";
import Head from "next/head";

function DetailedProductComponent() {
  const params = useParams();
  const [pImage, setPImage] = useState("");
  const [product, setProduct] = useState({});

  const getDetailedProductApi = (pId) => {
    return axios.get(`${server}/product/${pId}`, {
      withCredentials: true,
    });
  };
  const { data } = useQuery({
    queryKey: ["DetailedProduct"],
    queryFn: () => getDetailedProductApi(params.pId),
  });

  useEffect(() => {
    if (data) {
      setProduct(data?.data?.product);
    }

    return () => {
      setPImage("");
      setProduct({});
    };
  }, [data]);

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    dispatch(addToCart({ _id: id, quantity: 1 }));
    toast.success("Item added to cart");
  };
  const router = useRouter();

  const buyNowBtnHandler = (id) => {
    dispatch(addToBuyNowCart([{ _id: id, quantity: 1 }]));
    router.push("/checkout/init");
  };

  // Metadata
  const title = data?.data?.product?.name || "Product";
  const description = data?.data?.product?.description || "Product description";
  const imageUrl = data?.data?.product?.imageUrl || "/default-image.webp"; // Provide a default image URL if the product image is not available

  const handleImgClick = (img) => {
    setPImage(img?.url);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://habuli.vercel.app/products/${params.pId}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <Box maxWidth={"xl"} mx={"auto"} minWidth={"320px"}>
        <Grid
          container
          spacing={1}
          pt={"5vh"}
          pl={"1vw"}
          pr={"4px"}
          bgcolor={"white"}
        >
          <Grid item sm={1} xs={2}>
            {product &&
              product?.images?.map((img, index) => (
                <Grid item xs={12} key={index}>
                  <ListImgComponent img={img} handleClick={handleImgClick} />
                </Grid>
              ))}
          </Grid>
          <Grid item sm={4} xs={10}>
            <Grid item xs={12}>
              <ProductImageBox product={data?.data?.product} img={pImage} />
            </Grid>
            <Grid item xs={10}>
              <ProductActionButtonBox
                id={data?.data?.product?._id}
                handleAddToCart={addToCartHandler}
                handleBuyNowBtn={buyNowBtnHandler}
              />
            </Grid>
          </Grid>
          <Grid item sm={7} xs={12}>
            <DetailsBoxContainer product={data?.data?.product} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DetailedProductComponent;
