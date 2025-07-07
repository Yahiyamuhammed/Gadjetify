import * as yup from "yup";

export const brandValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Brand name is required")
    .min(2, "Brand name must be at least 2 characters")
    .max(50, "Brand name cannot exceed 50 characters"),

  description: yup
    .string()
    .required("Brand description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),

  website: yup
    .string()
    .required("Website is required")
    .url("Must be a valid URL"),
});
