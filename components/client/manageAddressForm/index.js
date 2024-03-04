"use client";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Country, State } from "country-state-city";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addShippingInfoApi,
  deleteShippingInfo,
  getCordtAddressApi,
  getShippingInfoApi,
} from "../../../api/order";
import { Field, useFormik } from "formik";
import { shippingInfoSchema } from "@/schema/order";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ManageAddressForm() {
  const [locationAddress, setLocationAddress] = useState(null);
  const [formatedAddress, setFormatedAddress] = useState("");
  const [location, setLocation] = useState(null);
  const [coordsError, setCoordsError] = useState(null);
  const [addAddressToggle, setAddAddressToggle] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [delId, setDelId] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleOpenMenu = (event, id) => {
    setDelId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const queryClient = useQueryClient();

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          setCoordsError(error.message);
        }
      );
    }
  };

  const handleUseMyLocation = async () => {
    await getCurrentLocation();
    setTimeout(() => refetchLocationAddress(), 1000);
  };

  const { data: shippingInfoData, isSuccess: shippingInfoSuccess } = useQuery({
    queryKey: ["shipping-info"],
    queryFn: getShippingInfoApi,
  });

  useEffect(() => {
    if (shippingInfoData && shippingInfoSuccess) {
      setUserAddress(shippingInfoData?.data?.shippingInfo);
    }
  }, [shippingInfoData, shippingInfoSuccess]);

  const {
    data: addShippingInfoData,
    mutateAsync: addShippingInfoMutate,
    isPending: addShippingInfoPending,
  } = useMutation({
    mutationKey: ["Add-shipping-info"],
    mutationFn: addShippingInfoApi,
  });

  const {
    data: locationData,
    error: locationError,
    refetch: refetchLocationAddress,
    isSuccess: locationDataSuccess,
  } = useQuery({
    queryKey: [
      "Get-location-address",
      { longitude: location?.longitude, latitude: location?.latitude },
    ],
    queryFn: getCordtAddressApi,
    enabled: false,
  });

  const addressInitialValues = {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
    alternatePhoneNo: "",
  };

  const {
    values: values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: addressInitialValues,
    validationSchema: shippingInfoSchema,
    onSubmit: (values, action) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("shippingInfo", JSON.stringify(values));
      }
      postShippingInfo(values);
      action.resetForm();
    },
  });

  const {
    data: deleteShippingInfoData,
    refetch: deleteShippingInfoRefetch,
    isSuccess: deleteShippingInfoSuccess,
  } = useQuery({
    queryKey: ["delete-shipping-info", delId],
    queryFn: deleteShippingInfo,
    enabled: false,
  });

  useEffect(() => {
    if (deleteShippingInfoData && deleteShippingInfoSuccess) {
      handleMenuClose();
      queryClient.invalidateQueries({ queryKey: ["shipping-info"] });
      toast.success("Address deleted successfully");
      setDelId("");
    }
  }, [deleteShippingInfoData, deleteShippingInfoSuccess, queryClient]);

  async function postShippingInfo(values) {
    await addShippingInfoMutate(values);
    setAddAddressToggle(false);
    queryClient.invalidateQueries({ queryKey: ["shipping-info"] });
    toast.success("Address added successfully");
  }

  useEffect(() => {
    if (locationData && locationDataSuccess) {
      setLocationAddress(locationData?.data?.results[0]?.components);
      setFormatedAddress(locationData?.data?.results[0]?.formatted);
    }
  }, [locationData, locationDataSuccess]);

  useEffect(() => {
    if (locationAddress) {
      setValues({
        city: locationAddress?.city,
        pinCode: locationAddress?.postcode,
      });
    }
    if (formatedAddress) {
      setFieldValue("address", `${formatedAddress}`);
    }
  }, [locationAddress, formatedAddress, setFieldValue, setValues]);

  const { user } = useSelector((state) => state.user);

  const ITEM_HEIGHT = 28;

  return (
    <Box sx={{ p: 1, pt: 0, mt: 2 }}>
      <Button
        fullWidth
        variant={"outlined"}
        color="tertiary"
        sx={{ mb: 2 }}
        onClick={() => setAddAddressToggle(true)}
      >
        Add a new address
      </Button>
      <Box
        sx={{ bgcolor: "whitesmoke", p: 1, pt: 0 }}
        display={addAddressToggle ? "block" : "none"}
      >
        <Typography
          textTransform={"uppercase"}
          color={"tertiary.light"}
          variant={"subtitle2"}
          mb={1}
          pt={1}
        >
          Add a new address
        </Typography>
        <Button
          variant="contained"
          color="tertiary"
          size="small"
          sx={{ color: "white" }}
          startIcon={<MyLocationIcon />}
          onClick={() => handleUseMyLocation()}
        >
          Use my current location
        </Button>
        {coordsError && <p>Error: {coordsError}</p>}
        <br />
        <TextField
          type="text"
          size="small"
          multiline
          rows={2}
          placeholder={"Address"}
          name="address"
          id="address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="normal"
          color="tertiary"
          sx={{ backgroundColor: "#fff" }}
        />
        <TextField
          type="text"
          size="small"
          placeholder={"City"}
          name="city"
          id="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          color="tertiary"
          sx={{ mr: 2, bgcolor: "#fff" }}
        />
        <TextField
          select
          label="State"
          size="small"
          placeholder={"State"}
          name="state"
          id="state"
          value={values.state}
          onChange={handleChange}
          margin="normal"
          color="tertiary"
          sx={{ backgroundColor: "#fff", width: 210 }}
        >
          {State &&
            State.getStatesOfCountry(
              values.country ? values.country : "IN"
            ).map((state) => (
              <MenuItem value={state.isoCode} key={state.isoCode}>
                {state.name}
              </MenuItem>
            ))}
        </TextField>
        <br />
        <TextField
          type="text"
          size="small"
          placeholder={"pinCode"}
          name="pinCode"
          id="pinCode"
          value={values.pinCode}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          color="tertiary"
          sx={{ mr: 2, bgcolor: "#fff" }}
        />
        <TextField
          select
          size="small"
          color="tertiary"
          placeholder="Country"
          id="country"
          name="country"
          label="Country"
          value={values.country}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          sx={{ bgcolor: "#fff", width: 210 }}
        >
          {Country &&
            Country.getAllCountries().map((country) => (
              <MenuItem value={country.isoCode} key={country.isoCode}>
                {country.name}
              </MenuItem>
            ))}
        </TextField>
        <br />
        <TextField
          type="text"
          size="small"
          placeholder={"Phone"}
          name="phoneNo"
          id="phoneNo"
          value={values.phoneNo}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          color="tertiary"
          sx={{ mr: 2, bgcolor: "#fff" }}
        />
        <TextField
          type="text"
          size="small"
          placeholder={"Alternate Phone"}
          name="alternatePhoneNo"
          id="alternatePhoneNo"
          value={values.alternatePhoneNo}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
          color="tertiary"
          sx={{ backgroundColor: "#fff", position: "relative" }}
        />
        <br />
        <Button
          variant="contained"
          color="tertiary"
          size="small"
          sx={{ color: "white", px: 8, mb: 2, mr: 1, mt: 2 }}
          onClick={handleSubmit}
        >
          {addShippingInfoPending ? "Saving.." : "Save"}
        </Button>
        <Button
          variant="text"
          color="tertiary"
          size="small"
          sx={{ px: 4, mb: 2, mt: 2 }}
          onClick={() => setAddAddressToggle(false)}
        >
          Cancel
        </Button>
        <br />
        {errors.address || touched.address ? (
          <Typography color={"red"} variant="caption" mr={1}>
            {errors.address ? `*${errors.address}` : ""}
          </Typography>
        ) : null}
        {errors.city || touched.city ? (
          <Typography color={"red"} variant="caption" mr={1}>
            {errors.city ? `*${errors.city}` : ""}
          </Typography>
        ) : null}
        {errors.state || touched.state ? (
          <Typography color={"red"} variant="caption" mr={1}>
            {errors.state ? `*${errors.state}` : ""}
          </Typography>
        ) : null}
        {errors.pinCode || touched.pinCode ? (
          <Typography color={"red"} variant="caption" mr={1}>
            {errors.pinCode ? `*${errors.pinCode}` : ""}
          </Typography>
        ) : null}
        {errors.country || touched.country ? (
          <Typography color={"red"} variant="caption" mr={1}>
            {errors.country ? `*${errors.country}` : ""}
          </Typography>
        ) : null}
        {errors.phoneNo || touched.phoneNo ? (
          <Typography color={"red"} variant="caption" mr={1}>
            {errors.phoneNo ? `*${errors.phoneNo}` : ""}
          </Typography>
        ) : null}
        {errors.alternatePhoneNo || touched.alternatePhoneNo ? (
          <Typography color={"red"} variant="caption" mr={1}>
            {errors.alternatePhoneNo ? `*${errors.alternatePhoneNo}` : ""}
          </Typography>
        ) : null}
      </Box>
      {userAddress
        ? userAddress.map((item, index) => (
            <Box
              key={index}
              sx={{ border: "1px solid #6fa3ff", p: 2 }}
              mt={2}
              mb={2}
            >
              <Typography
                variant={"caption"}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="subtitle2" mr={1} fontWeight={400}>
                  {user ? user.name : ""}
                </Typography>
                <Typography variant="caption" flexGrow={1}>
                  {item.phoneNo}
                </Typography>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={(e) => handleOpenMenu(e, item._id)}
                >
                  <MoreVertIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "8ch",
                    },
                  }}
                >
                  <MenuItem
                    key={"delete"}
                    selected={"delete"}
                    onClick={() => deleteShippingInfoRefetch()}
                    sx={{ fontSize: 12, textAlign: "center" }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </Typography>
              <Typography variant="caption">{`${item.address} - ${item.pinCode}`}</Typography>
            </Box>
          ))
        : null}
    </Box>
  );
}

export default ManageAddressForm;
