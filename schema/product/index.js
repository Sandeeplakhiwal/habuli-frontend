import * as Yup from "yup";

export const reviewSchema = Yup.object({
  rating: Yup.string().required("Please rate this product"),
  comment: Yup.string().required("Add a comment"),
});
