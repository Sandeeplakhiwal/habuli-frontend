import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

function CartItemTestTemplate({
  product,
  cartProductsRefetch,
  cartProductsData,
  cartProductsSuccess,
}) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const params = useParams();
  const slug = params.slug;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "200px",
        justifyContent: "space-between",
        minWidth: "320px",
        bgcolor: "white",
        mt: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{
          width: { md: "25%", sm: "35%" },
          maxWidth: { md: "25%", sm: "35%" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            // width: { md: "25%", sm: "35%" },
            // maxWidth: { md: "25%", sm: "35%" },
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={product?.images?.[0]?.url || "/images/default-image.webp"}
            height={isMobile ? 200 : 250}
            width={isMobile ? 150 : 200}
            sizes="(max-width: 576px) 200px, (max-width: 768px) 250px, 250px"
            alt={product?.name || "ProductImg"}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", sm: "row", xs: "column" },
          width: { md: "75%", sm: "70%", xs: "70%" },
          justifyContent: { md: "space-between", sm: "flex-start" },
          py: 2,
          px: { md: 2, xs: 1 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Link
            href={product ? `${slug}/item/${product._id}` : ""}
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color={"black"}
              fontWeight={500}
            >
              {product && product.name}
            </Typography>
          </Link>
          <Typography>
            {product
              ? `${product.ratings.toFixed(1)} ★ ${
                  product.reviews.length
                } ratings &
            reviews`
              : ""}
          </Typography>
          {!isMobile && (
            <>
              <Typography variant={"caption"} fontWeight={isMobile ? 400 : 500}>
                {product && product.description}
              </Typography>
              <Typography variant={"h6"} mt={isMobile ? 2 : 0}>
                ₹{product && product.price}
              </Typography>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { md: "center", sm: "flex-start" },
            alignItems: { md: "center", sm: "flex-start" },
          }}
        >
          <Typography variant={isMobile ? "h6" : "h5"} mt={isMobile ? 2 : 0}>
            ₹{product && product.price}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CartItemTestTemplate;
