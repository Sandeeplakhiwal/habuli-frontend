"use client";
import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Container,
  LinearProgress,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { deepOrange } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";

const ratingLabels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

export const ListImgComponent = () => {
  return (
    <CustomContainerBox>
      <Image
        src={
          "https://rukminim2.flixcart.com/image/416/416/xif0q/keyboard/gaming-keyboard/w/u/g/evofox-deathray-prism-rgb-silent-membrane-keys-amkette-original-imagp4fwhmyzuwme.jpeg?q=70"
        }
        height={40}
        width={40}
        alt="camera"
      />
    </CustomContainerBox>
  );
};

export const ProductImageBox = () => {
  return (
    <CustomProductImageBox>
      <Image
        src={
          "https://rukminim2.flixcart.com/image/416/416/xif0q/keyboard/gaming-keyboard/w/u/g/evofox-deathray-prism-rgb-silent-membrane-keys-amkette-original-imagp4fwhmyzuwme.jpeg?q=70"
        }
        height={300}
        width={350}
        alt="san-disk"
      />
    </CustomProductImageBox>
  );
};

export const ProductActionButtonBox = () => {
  return (
    <CustomProductActionBtnBox>
      <Button
        variant={"outlined"}
        startIcon={<ShoppingCartIcon />}
        fullWidth
        sx={{ marginRight: 1 }}
      >
        Add to cart
      </Button>
      <Button variant={"contained"} startIcon={<FlashOnIcon />} fullWidth>
        Buy now
      </Button>
    </CustomProductActionBtnBox>
  );
};

export const DetailsBoxContainer = () => {
  return (
    <CustomDetailBoxContainer>
      <Typography variant={"subtitle1"} fontWeight={550} fontSize={18}>
        SanDisk Ultra 128 GB MicroSDXC Class 10 140 MB/s Memory Card
      </Typography>
      <Typography variant={"subtitle2"} color={"green"}>
        4.1★{" "}
        <Typography variant={"caption"} color={"black"} sx={{ opacity: 0.7 }}>
          39,394 Ratings & 3008 Reviews
        </Typography>
      </Typography>
      <Typography fontWeight={"bold"} variant={"h5"}>
        ₹890
      </Typography>
      <Typography>Stock: 700</Typography>
      <Typography display={"flex"} flexDirection={"column"} mb={"10vh"}>
        About this item{" "}
        <Typography variant={"subtitle2"} pl={"1rem"}>
          <ul>
            <li>For Camera, Computer, Gaming Console, Mobile, Tablet</li>
            <li>Capacity: 128 GB</li>
            <li>MicroSDXC</li>
            <li>Class 10</li>
            <li>Read Speed: 140 MB/s</li>
          </ul>
        </Typography>
      </Typography>
      <RatingsAndReviewSection />
    </CustomDetailBoxContainer>
  );
};

const RatingsAndReviewSection = () => {
  const value = 4;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [hover, setHover] = React.useState(-1);
  const [ratingValue, setRatingValue] = useState(0);
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${ratingLabels[value]}`;
  }
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        pr={3}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography
          fontWeight={600}
          variant={"h6"}
          letterSpacing={1}
          m={"0.5rem 0"}
          flexGrow={1}
        >
          Ratings & Reviews
        </Typography>
        <Button
          variant={"text"}
          size={"small"}
          sx={{ textTransform: "capitalize" }}
          onClick={handleOpen}
        >
          Rate Product
        </Button>
      </Box>
      <Typography alignItems={"center"} display={"flex"} flexDirection={"row"}>
        <Rating name="read-only" value={value} readOnly /> 4 out of 5
      </Typography>
      <Typography variant={"caption"} pl={"5px"}>
        125 global ratings
      </Typography>
      <CustomProgressBarBox>
        <Typography variant={"subtitle2"}>5 star</Typography>
        <LinearProgress
          value={63}
          variant={"determinate"}
          sx={{
            width: { md: "50%", sm: "70%", xs: "50%" },
            height: "15px",
            marginLeft: 1,
            mr: 1,
          }}
        />
        <Typography variant={"subtitle2"}>63%</Typography>
      </CustomProgressBarBox>
      <CustomProgressBarBox>
        <Typography variant={"subtitle2"}>4 star</Typography>
        <LinearProgress
          value={19}
          variant={"determinate"}
          sx={{
            width: { md: "50%", sm: "70%", xs: "50%" },
            height: "15px",
            marginLeft: 1,
            mr: 1,
          }}
        />
        <Typography variant={"subtitle2"}>19%</Typography>
      </CustomProgressBarBox>
      <CustomProgressBarBox>
        <Typography variant={"subtitle2"}>3 star</Typography>
        <LinearProgress
          value={11}
          variant={"determinate"}
          sx={{
            width: { md: "50%", sm: "70%", xs: "50%" },
            height: "15px",
            marginLeft: 1,
            mr: 1,
          }}
        />
        <Typography variant={"subtitle2"}>11%</Typography>
      </CustomProgressBarBox>
      <CustomProgressBarBox>
        <Typography variant={"subtitle2"}>2 star</Typography>
        <LinearProgress
          value={0}
          variant={"determinate"}
          sx={{
            width: { md: "50%", sm: "70%", xs: "50%" },
            height: "15px",
            marginLeft: 1,
            mr: 1,
          }}
        />
        <Typography variant={"subtitle2"}>0%</Typography>
      </CustomProgressBarBox>
      <CustomProgressBarBox>
        <Typography variant={"subtitle2"}>1 star</Typography>
        <LinearProgress
          value={7}
          variant={"determinate"}
          sx={{
            width: { md: "50%", sm: "70%", xs: "50%" },
            height: "15px",
            marginLeft: 1,
            mr: 1,
          }}
        />
        <Typography variant={"subtitle2"}>7%</Typography>
      </CustomProgressBarBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={rateModalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
            mb={2}
          >
            Rate our product
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              // gap: 5,
            }}
          >
            <Rating
              name="hover-feedback"
              value={ratingValue}
              size="large"
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {ratingValue !== null && (
              <Typography>
                {ratingLabels[hover !== -1 ? hover : ratingValue]}
              </Typography>
            )}
          </Box>
          <Box textAlign={"right"}>
            <Typography mt={2} mb={2} textAlign={"left"}>
              Add a review
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              fullWidth
              placeholder="Description..."
            />
            <Button type="submit" variant={"contained"} sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <ReviewsContainer />
    </Box>
  );
};

const ReviewsContainer = () => {
  return (
    <CustomReviewsContainer>
      <Typography m={"1rem 0"}>Top Reviews</Typography>
      <SingleReviewBox />
      <SingleReviewBox />
      <SingleReviewBox />
    </CustomReviewsContainer>
  );
};

const SingleReviewBox = () => {
  return (
    <CustomSingleReviewBox>
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
        <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24 }}>
          S
        </Avatar>
        <Typography fontSize={"13px"} color={"#007185"}>
          Sandeep Lakhiwal
        </Typography>
      </Box>
      <Box>
        <Rating name="read-only" value={4} readOnly size="small" />
        <Typography color={"#007185"} fontSize={"12px"}>
          Reviewed on 1 December 2023
        </Typography>
        <Typography fontSize={13} letterSpacing={0.5} fontWeight={400}>
          Although I have not fished a lot around, but I think this keyboard
          provides the best value for money. I have been using it for about a
          month now, and can say that I got what I was looking for.
        </Typography>
      </Box>
    </CustomSingleReviewBox>
  );
};

const rateModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 400, xs: "80vw" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { md: 4, xs: 2 },
};

const CustomContainerBox = styled(Box)`
  width: 50%;
  margin: auto;
  text-align: center;
  align-items: center;
  margin-bottom: 0.5rem;
  height: 40;
  width: 40;
  cursor: pointer;
  border: 0.1px solid #e0e0e0;
  img {
    object-fit: contain;
  }
  @media (max-width: 1024px) {
    width: 100%;
    img: {
      height: 20px;
      width: 20px;
    }
  }
`;

const CustomProductImageBox = styled(Box)`
  height: 350px;
  padding: auto;
  text-align: center;
  img {
    object-fit: contain;
  }
  @media (max-width: 1024px) {
    height: 300px;
    img {
      height: 100%;
      width: 100%;
    }
  }
`;

const CustomProductActionBtnBox = styled(Box)`
  display: flex;
  flex-direction: row;
  text-transform: uppercase;
  justify-content: space-around;
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const CustomDetailBoxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 0.5rem;
  height: 90vh;
  overflow-y: auto;
  @media (max-width: 767px) {
    height: auto;
    overflow-y: hidden;
    margin-top: 2rem;
  }
`;

const CustomProgressBarBox = styled(Box)`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #007185;
  @media (max-width: 1024px) {
    width: 70%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CustomReviewsContainer = styled(Box)`
  padding-top: 2rem;
  padding-bottom: 20vh;
`;
const CustomSingleReviewBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "70%",
  marginBottom: "2rem",
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },
}));
