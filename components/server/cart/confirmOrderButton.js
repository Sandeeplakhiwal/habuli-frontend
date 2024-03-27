"use client";
import { createNewOrderApi } from "@/api/order";
import { resetBuyNowCart } from "@/redux/slices/buyNowSlice";
import { removeFromCart } from "@/redux/slices/cartSlice";
import {
  addPaymentInfoToOrder,
  addPricesToOrder,
  emptyOrderDetails,
} from "@/redux/slices/orderSlice";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const ConfirmOrderButton = () => {
  const { cartPrices } = useSelector((state) => state.cart);
  const { orderDetails } = useSelector((state) => state.order);
  const { buyNowItems } = useSelector((state) => state.buynow);

  const router = useRouter();

  const dispatch = useDispatch();

  const { data, isPending, isSuccess, isError, error, mutateAsync } =
    useMutation({
      mutationKey: ["create-new-order"],
      mutationFn: createNewOrderApi,
    });

  function makePayment() {
    if (orderDetails?.paymentInfo?.status === "Online") {
      toast.error(
        "We are working 🚧 on online payment, kindly try another payment option."
      );
    } else {
      setTimeout(() => mutateAsync(orderDetails), 500);
    }
  }

  useEffect(() => {
    if (cartPrices) {
      dispatch(addPricesToOrder(cartPrices));
    }
  }, [dispatch, cartPrices]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && isSuccess) {
      toast.success("Order created successfully");
      dispatch(emptyOrderDetails());
      dispatch(resetBuyNowCart());
      queryClient.resetQueries({ queryKey: ["cart-items"] });
      (data.data?.order?.orderItems || []).map((item) => {
        dispatch(removeFromCart({ _id: item?.product }));
      });
      router.push("/account/orders");
    }
    if (error) {
      toast.error(error.message);
    }
  }, [data, isSuccess, isError, dispatch, error, queryClient, router]);

  return (
    <Button
      onClick={makePayment}
      fullWidth
      sx={{ mt: 1 }}
      variant="contained"
      disabled={
        !buyNowItems?.length ||
        !orderDetails?.shippingInfo?.address ||
        !orderDetails?.orderItems ||
        !orderDetails?.paymentInfo.status
      }
    >
      Confirm order
    </Button>
  );
};
