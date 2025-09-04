import * as yup from "yup";

export const editProfileSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
});
