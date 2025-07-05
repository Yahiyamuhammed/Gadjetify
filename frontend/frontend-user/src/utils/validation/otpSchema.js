import * as yup from "yup";

export const otpValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{4,6}$/, "OTP must be 4-6 digits"),
});
