"use client";
import React, { useEffect, useState } from "react";
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
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { addToBuyNowCart } from "@/redux/slices/buyNowSlice";
import { PageRoutes } from "@/constants/routes";

function HeaderComponent() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [initializedFromLocalStorage, setInitializedFromLocalStorage] =
    useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { cartItems } = useSelector((state) => state.cart);
  const { buyNowItems } = useSelector((state) => state.buynow);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!initializedFromLocalStorage) {
      // Fetch items from localStorage on component mount
      let itemsInLocalStorage = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];
      // Fetch buyNowCartItems from localStorage on component mount
      let buyNowItemsInLocalStorage = localStorage.getItem("buyNowItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];

      if (itemsInLocalStorage && itemsInLocalStorage.length) {
        itemsInLocalStorage.forEach((element) => {
          dispatch(addToCart(element));
        });
      }

      if (buyNowItemsInLocalStorage && buyNowItemsInLocalStorage.length) {
        buyNowItemsInLocalStorage.forEach((element) => {
          dispatch(addToBuyNowCart([element]));
        });
      }

      setInitializedFromLocalStorage(true);
    }
  }, [dispatch, initializedFromLocalStorage]);

  useEffect(() => {
    // Update local storage whenever cartItems change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Update local storage whenever cartItems change
    localStorage.setItem("buyNowItems", JSON.stringify(buyNowItems));
  }, [buyNowItems]);

  return (
    <Box
      width={"full"}
      maxWidth={"xl"}
      mx={"auto"}
      position={"sticky"}
      top={0}
      zIndex={100}
    >
      <AppBar
        position="static"
        sx={{
          minWidth: "320px",
          height: { xs: "40px", sm: 80 },
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <LogoBox>
            <LogoText href="/" component={NextLink}>
              Habuli
            </LogoText>
          </LogoBox>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flex: 1,
            }}
          >
            <Search style={{ width: "full", display: "flex", flex: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ display: { sm: "none", xs: "flex" }, flex: 1 }} />
          <MdStack
            direction={"row"}
            spacing={2}
            flex={1}
            justifyContent={"right"}
          >
            <CustomLink
              component={NextLink}
              href={isAuthenticated ? "/" : "/auth/signup"}
              display={{ sm: "none", md: "block" }}
            >
              <NavButton color="inherit">
                Become a <NavSpan>Seller</NavSpan>
              </NavButton>
            </CustomLink>
            <CustomLink
              component={NextLink}
              href={isAuthenticated ? "/account" : "/auth/login"}
            >
              <NavButton color="inherit">
                {isAuthenticated ? <AccountIcon /> : <LoginIcon />}
                <NavSpan>{isAuthenticated ? "Account" : "Login"}</NavSpan>
              </NavButton>
            </CustomLink>
            <Link
              sx={{
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                pb: 1,
              }}
              component={NextLink}
              href={PageRoutes.CART}
            >
              <NavButton color="inherit">
                <Badge
                  badgeContent={cartItems ? cartItems.length : 0}
                  color="badgeColor"
                >
                  <CartIcon sx={{ fontSize: "30px" }} />
                </Badge>
              </NavButton>
            </Link>
          </MdStack>
          <XsStack direction={"row"} spacing={{ xs: 0.001, sm: 2 }}>
            <AccountIcon onClick={handleClick} sx={{ cursor: "pointer" }} />
            <Link
              sx={{ color: "#fff" }}
              component={NextLink}
              href={PageRoutes.CART}
            >
              <Badge
                badgeContent={cartItems ? cartItems.length : 0}
                color="badgeColor"
              >
                <CartIcon />
              </Badge>
            </Link>
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
              cursor: "pointer",
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
            <Link
              component={NextLink}
              href={PageRoutes.ACCOUNT}
              style={{ textDecoration: "none", fontSize: "12px" }}
            >
              My Account
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              component={NextLink}
              href={PageRoutes.ORDERS}
              style={{ textDecoration: "none", fontSize: "12px" }}
            >
              Orders
            </Link>
          </MenuItem>
        </Menu>
      </AppBar>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flex: 1,
          py: 1,
          pt: 0,
          px: 1,
          bgcolor: "#6D258E",
        }}
        minWidth={"xl"}
      >
        <Search
          style={{
            width: "full",
            display: "flex",
            margin: "0 8px",
          }}
        >
          <StyledInputBase
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>
      </Box>
    </Box>
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
    flexGrow: 0,
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
  width: "100%",
  [theme.breakpoints.up("sm")]: {
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
    // backgroundColor: "gold",
    borderRadius: "0 5px 5px 0",
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
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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
