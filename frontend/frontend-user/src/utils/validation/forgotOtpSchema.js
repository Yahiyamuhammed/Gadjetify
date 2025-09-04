import * as yup from "yup";

export const emailSchema = 
  yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });
