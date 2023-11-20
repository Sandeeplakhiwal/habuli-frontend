import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

function SignupComponent() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        padding: { md: "0 30%", xs: 0 },
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
            // backgroundColor: "lightblue",
            borderRadius: "5px",
            padding: "1rem",
            border: "1px solid #6D258E",
          }}
        >
          <Typography variant="h5" component={Box}>
            Create Account
          </Typography>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              paddingTop: "1rem",
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}
            >
              <label style={{ fontWeight: 550, letterSpacing: "1px" }}>
                Your name
              </label>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                variant={"outlined"}
                size="small"
                placeholder="First and last name"
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}
            >
              <label style={{ fontWeight: 550, letterSpacing: "1px" }}>
                Mobile number <span>(optional)</span>
              </label>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                // defaultValue="Small"
                variant={"outlined"}
                size="small"
                placeholder="Mobile number"
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}
            >
              <label style={{ fontWeight: 550, letterSpacing: "1px" }}>
                Email
              </label>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                variant={"outlined"}
                size="small"
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}
            >
              <label style={{ fontWeight: 550, letterSpacing: "1px" }}>
                Password
              </label>
              <TextField
                hiddenLabel
                // id="filled-hidden-label-small"
                variant={"outlined"}
                size="small"
                placeholder="Atleast 6 characters"
              />
            </Box>
            <Button variant={"contained"}>Sign up</Button>
          </form>
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
