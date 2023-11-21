import React from "react";
import { Box, Container, Divider, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import ForgotPasswordForm from "@/components/client/forgotPasswordForm";
import ResetPasswordForm from "@/components/client/resetPasswordForm";

function ResetPasswordComponent() {
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
            Reset Password
          </Typography>
          <Typography variant={"subtitle2"} pt={"0.5rem"}>
            To reset password enter new password and make sure to note down or
            save it somewhere, so that you can visit our site again without any
            hustle.
          </Typography>
          <ResetPasswordForm />
          <Divider />
          <Typography paddingTop={"1rem"}>
            Token expired?{" "}
            <Link
              component={NextLink}
              href={"/auth/password/forgot"}
              sx={{ textDecoration: "none" }}
              //   paddingTop={"0.5rem"}
            >
              request again
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ResetPasswordComponent;
