"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useFormik } from "formik";
import { loginSchema } from "@/schema/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginComponent() {
  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        console.log(values);
        submitHandler(values);
        action.resetForm();
      },
    });

  const submitHandler = (values) => {
    console.log("Values in handle", values);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                type={"text"}
                variant={"outlined"}
                size="small"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <Typography variant={"caption"} color={"red"}>
                  {errors.email}
                </Typography>
              ) : null}
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}
            >
              <label style={{ fontWeight: 550, letterSpacing: "1px" }}>
                Password
              </label>
              <TextField
                hiddenLabel
                variant={"outlined"}
                size="small"
                placeholder="Atleast 6 characters"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <Typography variant={"caption"} color={"red"}>
                  {errors.password}
                </Typography>
              ) : (
                <Button
                  sx={{
                    height: "15px",
                    textTransform: "capitalize",
                    width: 150,
                    marginTop: "10px",
                  }}
                  startIcon={showPassword ? <VisibilityOff /> : <Visibility />}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? "Hide password" : "Show password"}
                </Button>
              )}
            </Box>
            <Button variant={"contained"} type="submit" onClick={handleSubmit}>
              Sign in
            </Button>
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
