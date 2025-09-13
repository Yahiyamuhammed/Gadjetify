import * as yup from "yup";

export const editProfileSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),

  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});
