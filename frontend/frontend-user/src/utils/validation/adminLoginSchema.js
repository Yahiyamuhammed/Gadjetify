// src/utils/validation/adminLoginSchema.js
import * as yup from "yup";

export const adminLoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(4, "Min 6 characters").required("Password is required"),
});
