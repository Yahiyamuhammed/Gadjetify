// src/utils/validation/productValidation.js
import * as yup from "yup";

export const productValidation = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters"),

  description: yup
    .string()
    .nullable(),

  brand: yup
    .string()
    .required("Brand is required"),

  model: yup
    .string()
    .nullable(),

  returnPolicy: yup
    .string()
    .nullable(),

  codAvailable: yup
    .boolean()
    .required("COD availability is required"),

  warranty: yup
    .string()
    .nullable(),

  offerPercentage: yup
    .number()
    .nullable()
    .min(0, "Offer percentage cannot be negative")
    .max(100, "Offer percentage cannot exceed 100"),
});
