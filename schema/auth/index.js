import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});

export const SignupSchema = Yup.object({
  name: Yup.string().min(2).max(30).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string().required("Please enter your password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

export const updateProfileSchema = Yup.object({
  name: Yup.string().min(2).max(30),
  email: Yup.string().email(),
});
