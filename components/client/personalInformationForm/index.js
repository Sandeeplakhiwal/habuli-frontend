"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

function PersonalInformationForm() {
  const [pIEClicked, setPieClicked] = useState(false);
  const [emailEditClicked, setEmailEditClicked] = useState(false);
  const personalInfoSaveHandler = () => {};
  const emailSaveHandler = () => {};
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
          defaultValue={"Sandeep"}
          sx={{
            opacity: 0.7,
            "&:hover": { cursor: pIEClicked ? "auto" : "not-allowed" },
          }}
          disabled={pIEClicked ? false : true}
        />
        <TextField
          type="text"
          size="small"
          defaultValue={"Lakhiwal"}
          sx={{
            opacity: 0.7,
            "&:hover": { cursor: pIEClicked ? "auto" : "not-allowed" },
          }}
          disabled={pIEClicked ? false : true}
        />
      </Box>
      {pIEClicked ? (
        <Box sx={{ mt: 1, textAlign: "right" }}>
          <Button
            variant={"contained"}
            sx={{ textTransform: "capitalize" }}
            onClick={personalInfoSaveHandler}
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
          defaultValue={"sandeeplakhiwal98@gmail.com"}
          sx={{ opacity: 0.7 }}
          fullWidth
          disabled={emailEditClicked ? false : true}
        />
        {emailEditClicked ? (
          <Box sx={{ mt: 1, textAlign: "right" }}>
            <Button
              variant={"contained"}
              sx={{ textTransform: "capitalize" }}
              onClick={emailSaveHandler}
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
