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

function LoginComponent() {
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
          <Typography variant="h5" component={Box}>
            Sign in
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
            <Button variant={"contained"}>Sign in</Button>
          </form>
          <Divider />
          <Typography paddingTop={"1rem"} textAlign={"center"}>
            New to Habuli?
            <Divider />
            <Link
              component={NextLink}
              href={"/auth/signup"}
              sx={{ textDecoration: "none" }}
              paddingTop={"0.5rem"}
            >
              Create your Habuli account
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginComponent;
