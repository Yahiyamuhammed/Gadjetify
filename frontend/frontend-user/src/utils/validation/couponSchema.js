import * as Yup from "yup";

export const couponSchema = Yup.object().shape({
  code: Yup.string().required("Coupon code is required"),
  discountType: Yup.string().oneOf(["percentage", "fixed"]).required("Discount type required"),
  discountValue: Yup.number().positive().required("Discount value required"),
  minPurchase: Yup.number().min(0, "Minimum purchase cannot be negative"),
  expiryDate: Yup.date().required("Expiry date is required"),
});
