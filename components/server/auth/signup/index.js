import React from "react";
import { Box, Container, Divider, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import SignupForm from "@/components/client/signupForm";

function SignupComponent() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        padding: { md: "0 30%", xs: 0 },
        minWidth: "320px",
      }}
    >
      <Container
        sx={{
          backgroundColor: "#fff",
          minHeight: "80vh",
          padding: { md: "10% 15%", xs: "10% 5%" },
        }}
      >
        <Box
          sx={{
            borderRadius: "5px",
            padding: "1rem",
            border: "1px solid #6D258E",
          }}
        >
          <Typography variant="h5" component={Box}>
            Create Account
          </Typography>
          <SignupForm />
          <Divider />
          <Typography paddingTop={"1rem"}>
            Already have an account?{" "}
            <Link
              component={NextLink}
              href={"/auth/login"}
              sx={{ textDecoration: "none" }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupComponent;
