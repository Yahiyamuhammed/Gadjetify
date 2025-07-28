import * as yup from "yup";

export const addressSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Must be 10 digits"),
  pincode: yup.string().required("Pincode is required"),
  locality: yup.string().required("Locality is required"),
  address: yup.string().required("Address is required"),
  district: yup.string().required("District is required"),
  state: yup.string().required("State is required"),
  alternatePhone: yup
    .string()
    .optional()
    .matches(/^\d{10}$/, "Must be 10 digits")
    .nullable(),
  isPrimary: yup.boolean(),
});