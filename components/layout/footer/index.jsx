import { Box, Button, IconButton, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      maxWidth={"xl"}
      mx={"auto"}
      minWidth={"320px"}
    >
      <Box sx={{ bgcolor: "#2b333f" }}>
        <Link component={NextLink} href={"/"} sx={{ textDecoration: "none" }}>
          <Button
            sx={{
              color: "#fff",
              textTransform: "capitalize",
              flex: 1,
            }}
            fullWidth
          >
            Back to top
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          bgcolor: "#232f3e",
          py: 4,
          px: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { md: "row", sm: "column", xs: "column" },
        }}
      >
        <Typography color={"#fff"} sx={{ fontWeight: 450, fontSize: 14 }}>
          Connect With Me
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: "row",
            px: 4,
            alignItems: "center",
          }}
        >
          <Link
            href={"https://www.facebook.com/sandeep.lakhiwal.184/"}
            component={NextLink}
            sx={{ color: "white" }}
          >
            <IconButton>
              <FacebookIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Link>
          <Link
            href={"https://twitter.com/SandeepLakhiwa2"}
            component={NextLink}
            sx={{ color: "white" }}
          >
            <IconButton>
              <TwitterIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Link>
          <Link
            href={"https://www.instagram.com/sandeep.lakhiwal/"}
            component={NextLink}
            sx={{ color: "white" }}
          >
            <IconButton>
              <InstagramIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          bgcolor: "#232f3e",
        }}
      >
        <Typography sx={{ fontSize: 14, color: "white" }}>
          All Right Reserved, Copyright @habuli.vercel.app
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
