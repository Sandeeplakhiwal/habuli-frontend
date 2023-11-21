"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Link, Stack } from "@mui/material";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "@/schema/auth";
import toast from "react-hot-toast";
import { forgotPasswordApi } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";

function ForgotPasswordForm() {
  const initialValues = {
    email: "",
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: (values, action) => {
        submitHandler(values);
        action.resetForm();
      },
    });

  const { data, error, isSuccess, isPending, mutateAsync } = useMutation({
    mutationFn: forgotPasswordApi,
  });

  const submitHandler = async (values) => {
    mutateAsync(values);
  };

  useEffect(() => {
    if (data && isSuccess) {
      console.log(data);
      toast.success(data?.data.message);
      //   redirect("/");
    }
    if (error) {
      toast.error(error.response.data.error);
    }
  }, [data, isSuccess, error]);

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
      <Button variant={"contained"} type="submit" onClick={handleSubmit}>
        Continue
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;