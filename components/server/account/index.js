import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NextLink from "next/link";
import PersonalInformationForm from "@/components/client/personalInformationForm";
import { useSelector } from "react-redux";
import { UserAccountNameChit } from "@/components/client/account";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ManageAddressForm from "@/components/client/manageAddressForm";

function AccountComponent() {
  return (
    <Grid container gap={1} mt={2} maxWidth={"100vw"} padding={2}>
      <Grid item xs={12} sm={4} md={2.5} pb={1} flexDirection={"column"}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
          p={1}
          bgcolor={"white"}
          mb={1}
        >
          <UserAccountNameChit />
        </Box>
      </Grid>
      <Grid item xs={12} sm={7} md={8} bgcolor={"white"}>
        <Box width={"full"} textAlign={"center"} mt={4}>
          <Button
            variant={"contained"}
            color="tertiary"
            sx={{ margin: 1, width: "50%" }}
          >
            <Link
              component={NextLink}
              href={"/account/orders"}
              sx={{ textDecoration: "none", color: "white" }}
            >
              My Orders
            </Link>
            <ChevronRightIcon sx={{ color: "white" }} />
          </Button>
        </Box>
        <Box p={2} mt={4}>
          <Typography
            textTransform={"uppercase"}
            sx={{ opacity: 0.5, display: "flex", alignItems: "end", gap: 1 }}
            fontWeight={700}
          >
            <PersonIcon sx={{ color: "blue", opacity: 1 }} />
            Account Settings
          </Typography>
          <PersonalInformationForm />

          <Typography
            textTransform={"uppercase"}
            sx={{
              opacity: 0.5,
              display: "flex",
              alignItems: "end",
              gap: 1,
              mt: 4,
            }}
            fontWeight={700}
          >
            <PinDropIcon sx={{ color: "blue", opacity: 1 }} />
            Manage Addresses
          </Typography>
          <ManageAddressForm />

          <Box mt={4}>
            <Typography>FAQs</Typography>
            <ul style={{ paddingLeft: "20px", marginTop: "1rem" }}>
              <li>
                <Typography variant="subtitle2">
                  What happens when I update my email address?
                </Typography>
                <Typography variant="subtitle2" fontSize={12}>
                  Your login email id (or mobile number) changes, likewise. You
                  &apos;ll receive all your account related communication on
                  your updated email address (or mobile number).
                </Typography>
              </li>
            </ul>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AccountComponent;
