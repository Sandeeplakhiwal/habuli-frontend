import React from "react";
import { Box, Container, Divider, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import ForgotPasswordForm from "@/components/client/forgotPasswordForm";

function ForgotPasswordComponent() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        padding: { md: "0 30%", xs: 0, sm: "0 10%" },
      }}
    >
      <Container
        sx={{
          backgroundColor: "#fff",
          minHeight: "80vh",
          padding: { md: "10% 15%", xs: "10% 5%", sm: "10% 15%" },
        }}
      >
        <Box
          sx={{
            borderRadius: "5px",
            padding: "1rem",
            border: "1px solid #6D258E",
          }}
        >
          <Typography variant="h5" component={Box} fontWeight={"bold"}>
            Password Assistance
          </Typography>
          <Typography variant={"subtitle2"} pt={"0.5rem"}>
            Enter the email address associated with your Habuli account
          </Typography>
          <ForgotPasswordForm />
        </Box>
      </Container>
    </Box>
  );
}

export default ForgotPasswordComponent;
