"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Modal,
  Rating,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import { reviewSchema } from "@/schema/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { server } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import StarIcon from "@mui/icons-material/Star";
import toast from "react-hot-toast";
import Image from "next/image";
import { format } from "date-fns";
// import Image from "next/image";
import NextLink from "next/link";

const ratingLabels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function OrderProductTemplate({ order, status, deliveryDate, orderItem }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ratingValue, setRatingValue] = useState(2);
  const [hover, setHover] = useState(-1);
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${ratingLabels[value]}`;
  }
  const params = useParams();
  const router = useRouter();
  const initialValues = {
    rating: 0,
    comment: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: reviewSchema,
    onSubmit: (values, action) => {
      submitHandler(values);
      action.resetForm();
      setRatingValue(0);
    },
  });

  const reviewPostApi = (formData) => {
    return axios.post(`${server}/product/reviews/${params.pId}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  };

  const queryClient = useQueryClient();

  const {
    data: reviewPostData,
    error: reviewPostError,
    isError: reviewPostIsError,
    isLoading: reviewPostIsLoading,
    isSuccess: reviewPostIsSuccess,
    mutateAsync,
  } = useMutation({
    mutationFn: reviewPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DetailedProduct"] });
      router.refresh();
    },
  });

  const submitHandler = async (values) => {
    mutateAsync(values);
  };

  useEffect(() => {
    if (reviewPostData && reviewPostIsSuccess) {
      toast.success("Review added successfully");
      setOpen(false);
      router.refresh();
    }
    if (reviewPostError) {
      toast.error(reviewPostError?.response?.data?.error);
    }
  }, [reviewPostData, reviewPostIsSuccess, reviewPostError, router]);

  return (
    <Box fontSize={14} padding={{ md: "0 2rem", xs: "0 10px" }} mb={2}>
      <Box bgcolor={"white"} p={{ md: 1, xs: 0.5 }} pl={1.5} pr={1.5}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Link
              component={NextLink}
              href={`/products/category/${orderItem.product.category}/item/${orderItem.product._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
              >
                <Image
                  src={orderItem.Image || "/images/default-image.webp"}
                  height={200}
                  width={200}
                  alt="san-disk"
                  style={{ height: "90%", width: "90%", objectFit: "contain" }}
                />
              </Box>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography fontSize={{ md: 14, xs: 10 }}>
                <Link
                  component={NextLink}
                  href={`/products/category/${orderItem.product.category}/item/${orderItem.product._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {orderItem.name}
                </Link>
              </Typography>

              <Typography
                variant="caption"
                fontSize={{ xs: 8, md: 12 }}
                sx={{ opacity: 0.7 }}
              >
                {orderItem.product.description}
              </Typography>
              <Typography
                variant="caption"
                color={"GrayText"}
                fontSize={{ xs: 7, md: 11 }}
              >
                Ordered on {format(order.createdAt, "dd/MM/yyyy")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <Typography fontSize={{ md: 14, xs: 10 }}>
                ₹{orderItem.price}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              gap={2}
            >
              <Box
                height={{ md: 10, xs: 7 }}
                width={{ md: 10, xs: 7 }}
                borderRadius={"50%"}
                bgcolor={"#26a541"}
              ></Box>
              <Typography
                fontSize={{ md: 14, xs: 9 }}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                {status === "Processing"
                  ? `Delivery by ${deliveryDate}`
                  : `Delivered on ${deliveryDate}`}
                <Typography fontSize={{ md: 14, xs: 7 }} sx={{ opacity: 0.7 }}>
                  {status === "Processing"
                    ? "Order is being processed"
                    : "Your order has shipped"}
                </Typography>
                <Typography
                  fontSize={{ md: 14, xs: 8 }}
                  color={status === "Delivered" ? "#2874f0" : "GrayText"}
                  sx={{
                    cursor: `${
                      status === "Delivered" ? "pointer" : "not-allowed"
                    }`,
                  }}
                  onClick={status === "Delivered" && handleOpen}
                >
                  Rate and review product
                </Typography>
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
                        size={"large"}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                          setRatingValue(newValue);
                          setFieldValue("rating", newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      {ratingValue !== null && (
                        <Box sx={{ ml: 2 }}>
                          {ratingLabels[hover !== -1 ? hover : ratingValue]}
                        </Box>
                      )}
                    </Box>
                    <Box textAlign={"right"}>
                      <Typography mt={2} mb={2} textAlign={"left"}>
                        Add a review
                      </Typography>
                      <TextField
                        // id="outlined-multiline-static"
                        id="comment"
                        name="comment"
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="Description..."
                        value={values.comment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.comment && touched.comment ? (
                        <Typography
                          variant={"subtitle2"}
                          textAlign={"left"}
                          fontSize={12}
                          color={"red"}
                          sx={{ paddingLeft: 1, paddingTop: 0.5 }}
                        >
                          {errors.comment}
                        </Typography>
                      ) : null}
                      <Button
                        type="submit"
                        variant={"contained"}
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                        disabled={reviewPostIsLoading ? true : false}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default OrderProductTemplate;

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
