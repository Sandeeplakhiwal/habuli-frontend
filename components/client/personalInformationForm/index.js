"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadUser } from "@/libs/fetch";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateProfileSchema } from "@/schema/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileApi } from "@/api/user";
import toast from "react-hot-toast";

function PersonalInformationForm() {
  const [pIEClicked, setPieClicked] = useState(false);
  const [emailEditClicked, setEmailEditClicked] = useState(false);
  const queryClient = useQueryClient();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const updateProfileInitialValues = {
    name: user ? user.name : "",
    email: user ? user.email : "",
  };

  const { mutateAsync: updateProfileMutate } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
      setPieClicked(false);
      setEmailEditClicked(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const {
    values: profileValues,
    errors: profileErrors,
    handleChange: handleProfileChange,
    handleBlur: handleProfileBlur,
    handleSubmit: handleProfileSubmit,
  } = useFormik({
    initialValues: updateProfileInitialValues,
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      updateProfileMutate(values);
    },
  });

  console.log(profileErrors);

  return (
    <Box mt={2} p={1}>
      <Typography alignItems={"center"}>
        Personal Information
        {pIEClicked ? (
          <Button
            variant={"text"}
            sx={{ textTransform: "capitalize", ml: 2 }}
            onClick={() => setPieClicked(false)}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant={"text"}
            sx={{ textTransform: "capitalize", ml: 2 }}
            onClick={() => setPieClicked(true)}
          >
            Edit
          </Button>
        )}
      </Typography>
      <Box display={"flex"} flexDirection={"row"} gap={1} mt={1}>
        <TextField
          type="text"
          size="small"
          placeholder={user?.name}
          sx={{
            "&:hover": { cursor: pIEClicked ? "auto" : "not-allowed" },
          }}
          disabled={pIEClicked ? false : true}
          name="name"
          id="name"
          value={profileValues.name}
          onChange={handleProfileChange}
          onBlur={handleProfileBlur}
        />
      </Box>

      {pIEClicked ? (
        <Box sx={{ mt: 1, textAlign: "right" }}>
          <Button
            variant={"contained"}
            sx={{ textTransform: "capitalize" }}
            onClick={handleProfileSubmit}
            size="small"
          >
            Save
          </Button>
        </Box>
      ) : null}
      <Box mt={2}>
        <Typography alignItems={"center"} mb={1}>
          Email Address
          {emailEditClicked ? (
            <Button
              variant={"text"}
              sx={{ textTransform: "capitalize", ml: 2 }}
              onClick={() => setEmailEditClicked(false)}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant={"text"}
              sx={{ textTransform: "capitalize", ml: 2 }}
              onClick={() => setEmailEditClicked(true)}
            >
              Edit
            </Button>
          )}
        </Typography>
        <TextField
          type="email"
          size="small"
          fullWidth
          placeholder={user?.email}
          disabled={emailEditClicked ? false : true}
          name="email"
          id="email"
          onChange={handleProfileChange}
          onBlur={handleProfileBlur}
          value={profileValues.email}
        />
        {emailEditClicked ? (
          <Box sx={{ mt: 1, textAlign: "right" }}>
            <Button
              variant={"contained"}
              sx={{ textTransform: "capitalize" }}
              onClick={handleProfileSubmit}
              size="small"
            >
              Save
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default PersonalInformationForm;
