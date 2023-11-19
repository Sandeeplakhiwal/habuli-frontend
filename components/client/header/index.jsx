"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Link,
  Stack,
  Button,
  InputBase,
  Badge,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import styled from "@emotion/styled";
import NextLink from "next/link";
import AccountIcon from "@mui/icons-material/PersonRounded";
import CartIcon from "@mui/icons-material/ShoppingCartRounded";

function HeaderComponent() {
  return (
    <AppBar position="static">
      <Toolbar>
        <LogoBox>
          <LogoText href="/" component={NextLink}>
            Habuli
          </LogoText>
        </LogoBox>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Stack direction={"row"} spacing={2} flex={1} justifyContent={"right"}>
          <NavButton color="inherit">
            Become a <NavSpan>Influencer</NavSpan>
          </NavButton>
          <NavButton color="inherit">
            <AccountIcon />
            <NavSpan>Account</NavSpan>
          </NavButton>
          <NavButton color="inherit">
            <Badge badgeContent={4} color="badgeColor">
              <CartIcon sx={{ fontSize: "30px" }} />
            </Badge>
          </NavButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderComponent;

//Styles
const LogoBox = styled(Box)(({ theme }) => ({
  height: "100%",
  color: "white",
  width: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 0.5,
  [theme.breakpoints.down("sm")]: {
    width: "auto",
    marginRight: "10px",
  },
}));
const LogoText = styled(Link)(({ theme }) => ({
  fontSize: "2rem",
  fontFamily: "fantasy",
  letterSpacing: "1.5px",
  color: "#fff",
  textDecoration: "none",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  color: theme.palette.primary.light,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const NavButton = styled(Button)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textTransform: "capitalize",
  gap: 0,
}));
const NavSpan = styled("span")(({ theme }) => ({
  fontSize: "14px",
  marginTop: "-4px",
  fontWeight: "bold",
  letterSpacing: "1px",
  textAlign: "center",
  alignItems: "center",
}));
