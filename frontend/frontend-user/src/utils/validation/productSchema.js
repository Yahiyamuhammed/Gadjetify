import * as yup from "yup";

const noRepeatingChars = /^(?!.*(.)\1{3,}).*$/;

export const productValidation = yup.object().shape({
  name: yup.string().required("Product name is required"),

  description: yup
    .string()
    .required("Brand description is required")
    .min(20, "Description must be at least 20 characters")
    .max(300, "Description cannot exceed 300 characters")
    .matches(
      noRepeatingChars,
      "Description contains too many repeated characters"
    ),

  brand: yup.string().required("Brand is required"),
  model: yup.string().required("Model is required"),

  returnPolicy: yup.string().optional(),

  // codAvailable: yup
  //   .mixed()
  //   // . "Please select if COD is available")
  //   .required("COD availability is required"),

  warranty: yup.string().optional(),

  offerPercentage: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .min(0, "Offer cannot be negative")
    .max(100, "Offer cannot exceed 100")
    .optional(),
});
