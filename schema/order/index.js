import * as Yup from "yup";

export const shippingInfoSchema = Yup.object({
  address: Yup.string().min(20).required("Please enter address"),
  city: Yup.string().min(2).required("Please enter city"),
  state: Yup.string().required("Please enter state"),
  country: Yup.string().required("Please enter country"),
  pinCode: Yup.number().min(6).required("Please enter pincode"),
  phoneNo: Yup.number().min(10).required("Please enter phoneNo"),
  alternatePhoneNo: Yup.number().min(10),
});
