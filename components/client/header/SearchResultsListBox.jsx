import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import NextLink from "next/link";

const SearchResultsList = ({ name, category, productId, handleClick }) => (
  <Link
    component={NextLink}
    href={`/products/category/${category}/item/${productId}`}
    sx={{ textDecoration: "none" }}
    onClick={handleClick}
  >
    <Box
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <SearchIcon fontSize="small" sx={{ color: "black" }} />
      <Typography sx={{ fontSize: 12, color: "black" }}>{name}</Typography>
    </Box>
  </Link>
);

function SearchResultsListBox({ searchProducts = [], handleLinkClick }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 30,
        bgcolor: "white",
        width: "96%",
        py: 2,
        pb: 4,
        px: 1,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
      }}
    >
      {searchProducts.map((product) => (
        <SearchResultsList
          key={product._id}
          name={product.name}
          category={product.category}
          productId={product._id}
          handleClick={handleLinkClick}
        />
      ))}
    </Box>
  );
}

export default SearchResultsListBox;
