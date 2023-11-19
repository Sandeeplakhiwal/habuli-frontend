"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6D258E",
      light: "#8F309F",
      dark: "#501D7E",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    badgeColor: {
      main: "orange",
    },
  },
});
