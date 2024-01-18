"use client";
import { Providers } from "@/redux/provider/provider";
import { store } from "@/redux/store";
import { Avatar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useSelector } from "react-redux";

export const UserAccountNameChit = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>
        {user ? user.name.charAt(0) : ""}
      </Avatar>
      <Typography
        display={"flex"}
        flexDirection={"column"}
        alignItems={"left"}
        variant={"subtitle2"}
      >
        <Typography variant={"caption"} mb={-0.5} fontSize={11}>
          Hello,
        </Typography>
        {user ? user.name : ""}
      </Typography>
    </>
  );
};
