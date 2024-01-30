"use client";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function CountDown({ isTimerRunning, setIsTimerRunning }) {
  const [counter, setCounter] = useState(60);
  useEffect(() => {
    let timerId;

    if (isTimerRunning && counter > 0) {
      timerId = setInterval(
        () => setCounter((prevCounter) => prevCounter - 1),
        1000
      );
    }

    return () => clearInterval(timerId);
  }, [counter, isTimerRunning]);
  return <Typography variant={"caption"}>00:00:{counter} seconds</Typography>;
}

export default CountDown;
