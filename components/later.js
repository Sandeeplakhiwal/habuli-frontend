"use client";
import styled from "@emotion/styled";
import { Box, InputBase, Link as MuiLink, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Link from "next/link";

function HeaderComponent() {
  return (
    <HeaderBox>
      <LogoBox>
        <LogoText>Habuli</LogoText>
      </LogoBox>
      {/* <SearchBox>
        <SearchInput placeholder="Search..." />
      </SearchBox> */}
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <BecomeBox>
        <LinkComp component={Link} href={"/"}>
          Become a Influencer
        </LinkComp>
      </BecomeBox>
      <ProfileBox>
        <ProfileTypography>
          Hello, Sandeep
          <span>Your Account</span>
        </ProfileTypography>
      </ProfileBox>
    </HeaderBox>
  );
}

export default HeaderComponent;

// Styles
const HeaderBox = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: "1rem",
  backgroundColor: theme.palette.primary.main,
  height: "40px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));
const LogoBox = styled(Box)(({ theme }) => ({
  height: "100%",
  color: "white",
  width: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontFamily: "fantasy",
  letterSpacing: "1.5px",
}));
const SearchBox = styled(Typography)(({ theme }) => ({
  width: "200px",
  height: "100%",
  backgroundColor: "#fff",
  borderRadius: "5px",
}));
const SearchInput = styled("input")(({ theme }) => ({
  border: "none",
  height: "100%",
  width: "100%",
  paddingLeft: "0.5rem",
  ":focus": {
    outline: "none",
  },
  color: theme.palette.primary.light,
  borderRadius: "5px",
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
const BecomeBox = styled(Box)(({ theme }) => ({
  //   width: 100,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  letterSpacing: "1px",
  border: "1px solid white",
  height: "auto",
  padding: "5px 10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const LinkComp = styled(MuiLink)({
  color: "white",
  textDecoration: "none",
  fontFamily: "sans-serif",
});
const ProfileBox = styled(Box)({
  color: "white",
});
const ProfileTypography = styled(Box)({
  fontFamily: "sans-serif",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  fontSize: "15px",
  fontWeight: 500,
  letterSpacing: "1px",
  gap: "3px",
});
