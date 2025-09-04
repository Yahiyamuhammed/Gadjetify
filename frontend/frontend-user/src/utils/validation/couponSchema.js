import * as Yup from "yup";

export const couponSchema = Yup.object().shape({
  code: Yup.string().required("Coupon code is required"),
  discountType: Yup.string()
    .oneOf(["percentage", "fixed"])
    .required("Discount type required"),
  discountValue: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Discount value must be a number")
    .positive("Discount must be greater than 0")
    .required("Discount value required"),
  minPurchase: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Minimum purchase must be a number")
    .min(0, "Minimum purchase cannot be negative")
    .required("Minimum purchase required"),
  expiryDate: Yup.date()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Expiry date must be a valid date")
    .required("Expiry date is required"),
});
