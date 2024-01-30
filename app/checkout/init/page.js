import { PriceDetailsList } from "@/components/client/cart";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ShieldIcon from "@mui/icons-material/Shield";
import { CheckBoxes, PriceDetailsWrapper } from "@/components/client/checkout";
import { ConfirmOrderButton } from "@/components/server/cart/confirmOrderButton";
import { useSelector } from "react-redux";

function Page() {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container gap={2}>
        <Grid item xs={12} sm={7}>
          <CheckBoxes />
        </Grid>
        <Grid item xs={12} sm={3} height={"auto"} mt={1}>
          <Typography
            sx={{ color: "GrayText", textTransform: "uppercase", p: 1 }}
            variant={"subtitle2"}
            bgcolor={"#fff"}
          >
            Price details
          </Typography>
          <hr />
          <PriceDetailsWrapper />
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "green",
              p: 1,
              fontSize: 12,
              gap: 1,
            }}
          >
            <ShieldIcon fontSize="small" /> Safe and secure payment
          </Typography>
          <ConfirmOrderButton />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Page;
