"use client";
import React, { useState } from "react";
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
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import styled from "@emotion/styled";
import NextLink from "next/link";
import AccountIcon from "@mui/icons-material/PersonRounded";
import CartIcon from "@mui/icons-material/ShoppingCartRounded";

function HeaderComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" sx={{ minWidth: "320px" }}>
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
        <MdStack
          direction={"row"}
          spacing={2}
          flex={1}
          justifyContent={"right"}
        >
          <CustomLink component={NextLink} href="/auth/signup">
            <NavButton color="inherit">
              Become a <NavSpan>Influencer</NavSpan>
            </NavButton>
          </CustomLink>
          <CustomLink component={NextLink} href={"/auth/login"}>
            <NavButton color="inherit">
              <AccountIcon />
              <NavSpan>Account</NavSpan>
            </NavButton>
          </CustomLink>
          <NavButton color="inherit">
            <Badge badgeContent={4} color="badgeColor">
              <CartIcon sx={{ fontSize: "30px" }} />
            </Badge>
          </NavButton>
        </MdStack>
        <XsStack direction={"row"} spacing={{ xs: 0.001, sm: 2 }}>
          <AccountIcon onClick={handleClick} />
          <Badge badgeContent={4} color="badgeColor">
            <CartIcon />
          </Badge>
        </XsStack>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Link component={NextLink} href={"/auth/login"}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
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
    fontSize: "1.5rem",
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
  marginLeft: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  color: theme.palette.primary.light,
  height: "30px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 1),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    },
    // backgroundColor: "green",
  },
}));
const MdStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const XsStack = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  padding: 0,
  margin: 0,
}));
const NavButton = styled(Button)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textTransform: "capitalize",
  gap: 0,
}));
const CustomLink = styled(Link)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textTransform: "capitalize",
  gap: 0,
  textDecoration: "none",
  color: "#fff",
}));
const NavSpan = styled("span")(({ theme }) => ({
  fontSize: "14px",
  marginTop: "-4px",
  fontWeight: "bold",
  letterSpacing: "1px",
  textAlign: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
