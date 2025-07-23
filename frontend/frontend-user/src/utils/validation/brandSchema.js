import * as yup from "yup";

const noRepeatingChars = /^(?!.*(.)\1{3,}).*$/;

export const brandValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Brand name is required")
    .min(2, "Brand name must be at least 2 characters")
    .max(50, "Brand name cannot exceed 50 characters")
    .matches(noRepeatingChars, "Brand name contains too many repeated characters"),

  description: yup
    .string()
    .required("Brand description is required")
    .min(20, "Description must be at least 20 characters")
    .max(300, "Description cannot exceed 300 characters")
    .matches(noRepeatingChars, "Description contains too many repeated characters"),

  website: yup
    .string()
    .required("Website is required")
    .url("Must be a valid URL"),
});
