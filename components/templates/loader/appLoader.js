// Loader.js

import React from "react";
import { Typography } from "@mui/material";

const pageStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
  overflow: "hidden",
  //   background: `linear-gradient(45deg, #A1C4FD 30%, #C2E9FB 90%)`,
  backgroundColor: "white",
};

const textStyle = {
  textAlign: "center",
  padding: "20px",
  borderRadius: "8px",

  animation: "growAndRotate 1.5s forwards",
};

const colorfulTextStyle = {
  background: `-webkit-linear-gradient(45deg, #662D8C 30%, #ED1E79 90%)`,
  WebkitBackgroundClip: "text",
  color: "transparent",
  fontWeight: "bold",
  textDecoration: "underline",
};

const AppLoader = () => {
  return (
    <div style={pageStyle}>
      <div style={textStyle}>
        <Typography variant="h4" style={colorfulTextStyle}>
          Habuli
        </Typography>
      </div>
    </div>
  );
};

export default AppLoader;
