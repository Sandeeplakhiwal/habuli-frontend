"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { SignupSchema, loginSchema } from "@/schema/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { loginApi, signupApi } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { loadUser } from "@/redux/slices/userSlice";

function LoginForm() {
  const initialValues = {
    name: "",
    phoneNo: "",
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: SignupSchema,
      onSubmit: (values, action) => {
        submitHandler(values);
        action.resetForm();
      },
    });

  const { data, error, isSuccess, isPending, mutateAsync } = useMutation({
    mutationFn: signupApi,
  });

  const submitHandler = async (values) => {
    mutateAsync(values);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success("Registered successfully");
      dispatch(loadUser(data?.data.user));
      redirect("/");
    }
    if (error) {
      toast.error(error.response.data.error);
    }
  }, [data, isSuccess, error, dispatch]);

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
        <label style={{ fontWeight: 550, letterSpacing: "1px" }}>
          Your name
        </label>
        <TextField
          hiddenLabel
          type={"text"}
          variant={"outlined"}
          size="small"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="First and last name"
        />
        {errors.name && touched.name ? (
          <Typography variant={"caption"} color={"red"}>
            {errors.name}
          </Typography>
        ) : null}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <label style={{ fontWeight: 550, letterSpacing: "1px" }}>
          Mobile number <span>(optional)</span>
        </label>
        <TextField
          hiddenLabel
          type={"text"}
          variant={"outlined"}
          size="small"
          name="phoneNo"
          id="phoneNo"
          value={values.phoneNo}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Mobile number"
        />
        {errors.phoneNo && touched.phoneNo ? (
          <Typography variant={"caption"} color={"red"}>
            {errors.phoneNo}
          </Typography>
        ) : null}
      </Box>
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
        Sign up
      </Button>
    </form>
  );
}

export default LoginForm;
