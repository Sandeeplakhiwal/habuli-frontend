"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "@/schema/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { login } from "@/api/user";
import { useMutation } from "@tanstack/react-query";

function LoginForm() {
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

  const { data, error, isSuccess, isPending, mutateAsync } = useMutation({
    mutationFn: login,
  });

  const submitHandler = async (values) => {
    mutateAsync(values);
  };

  useEffect(() => {
    if (data && isSuccess) {
      console.log(data);
      toast.success("Logged in successfully");
    }
    if (error) {
      toast.error(error.response.data.error);
    }
  }, [data, isSuccess, error]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        paddingTop: "1rem",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <label style={{ fontWeight: 550, letterSpacing: "1px" }}>Email</label>
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
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
  );
}

export default LoginForm;
