"use client";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getItemIndex } from "./cartSlice";

const initialState = {
  orderDetails: {
    shippingInfo: {
      address: null,
      city: null,
      state: null,
      country: null,
      pinCode: null,
      phoneNo: null,
      alternatePhoneNo: null,
    },
    orderItems: [],
    paymentInfo: {
      id: nanoid(10),
      status: null,
    },
    itemsPrice: null,
    taxPrice: null,
    shippingPrice: null,
    totalPrice: null,
  },
};

const Slice = createSlice({
  name: "order-details",
  initialState,
  reducers: {
    addShippingInfoToOrder: (state, action) => {
      state.orderDetails.shippingInfo.address = action.payload?.address;
      state.orderDetails.shippingInfo.city = action.payload?.city;
      state.orderDetails.shippingInfo.country = action.payload?.country;
      state.orderDetails.shippingInfo.state = action.payload?.state;
      state.orderDetails.shippingInfo.pinCode = action.payload?.pinCode;
      state.orderDetails.shippingInfo.phoneNo = action.payload?.phoneNo;
      state.orderDetails.shippingInfo.alternatePhoneNo = action.payload
        ?.alternatePhoneNo
        ? action.payload?.alternatePhoneNo
        : null;
    },
    addOrderItemsToOrder: (state, action) => {
      const newOrderItems = (action.payload || []).map((item) => ({
        name: item?.name,
        price: item?.price,
        quantity: item?.quantity,
        Image: item?.images[0]?.url,
        product: item?._id,
      }));

      if (!state.orderDetails) {
        state.orderDetails = { orderItems: [] };
      } else if (!state.orderDetails.orderItems) {
        state.orderDetails.orderItems = [];
      }

      newOrderItems.forEach((newItem) => {
        const existingItemIndex = state.orderDetails.orderItems.findIndex(
          (existingItem) => existingItem.product === newItem.product
        );

        if (existingItemIndex !== -1) {
          state.orderDetails.orderItems[existingItemIndex].quantity =
            newItem.quantity;
        } else {
          state.orderDetails.orderItems.push(newItem);
        }
      });
    },

    addPaymentInfoToOrder: (state, action) => {
      state.orderDetails.paymentInfo.status = action.payload;
    },
    addPricesToOrder: (state, action) => {
      state.orderDetails.itemsPrice = action.payload?.itemsPrice;
      state.orderDetails.taxPrice = action.payload?.taxPrice;
      state.orderDetails.shippingPrice = action.payload?.shippingCharges;
      state.orderDetails.totalPrice = action.payload?.totalAmount;
    },
    emptyOrderDetails: (state, action) => {
      state.orderDetails.orderItems = [];
      state.orderDetails.shippingInfo = initialState.orderDetails.shippingInfo;
      state.orderDetails.itemsPrice = initialState.orderDetails.itemsPrice;
      state.orderDetails.taxPrice = initialState.orderDetails.taxPrice;
      state.orderDetails.totalPrice = initialState.orderDetails.totalPrice;
      state.orderDetails.shippingPrice =
        initialState.orderDetails.shippingPrice;
      state.orderDetails.paymentInfo = initialState.orderDetails.paymentInfo;
    },
    removeOrderItemFromOrder: (state, action) => {
      let index = getItemIndex(
        state.orderDetails.orderItems,
        action.payload?._id
      );
      state.orderDetails.orderItems.splice(index, 1);
    },
  },
});

export const {
  addShippingInfoToOrder,
  addOrderItemsToOrder,
  addPaymentInfoToOrder,
  addPricesToOrder,
  emptyOrderDetails,
  removeOrderItemFromOrder,
} = Slice.actions;

export default Slice.reducer;
