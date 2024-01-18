import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

export const PriceDetailsList = () => {
  return (
    <List dense={true} sx={{ bgcolor: "#fff" }}>
      <ListItem>
        <ListItemText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          primary="Price"
          secondary="₹4000"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          primary="Discount"
          secondary="₹4000"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          primary="Delivery charges"
          secondary="₹4000"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          primary="Tax"
          secondary="₹4000"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#efefef",
            padding: 1,
          }}
          primary="Total amount"
          secondary="₹4000"
        />
      </ListItem>
    </List>
  );
};

export const DeliveryAddressComp = () => {
  return (
    <Typography
      color={"GrayText"}
      variant={"subtitle2"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography variant={"caption"}>Deliver to: Sandeep Lakhiwal</Typography>
      Lakhiwalo ki dhani, kalwar road
    </Typography>
  );
};

export const PlaceOrderButton = () => (
  <Box
    position={"sticky"}
    bottom={0}
    bgcolor={"#fff"}
    p={2}
    textAlign={"right"}
    sx={{ boxShadow: "0px -2px 4px 0px rgba(0, 0, 0, 0.2)" }}
  >
    <Button variant={"contained"}>Place Order</Button>
  </Box>
);
