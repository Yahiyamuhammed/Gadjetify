import * as yup from "yup";


const noNumbers = /^[A-Za-z\s]+$/;
const noRepeatingChars = /^(?!.*(.)\1{3,}).*$/;

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .matches(noNumbers, "Name cannot contain numbers or special characters")
    .matches(noRepeatingChars, "Name contains too many repeated characters")
    .trim(),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});
