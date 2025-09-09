import * as yup from "yup";

export const variantSchema = yup.object().shape({
  productId: yup.string().required("Product ID is required"),
  ram: yup
    .number()
    .typeError("RAM must be a number")
    .positive("RAM must be positive")
    .required("RAM is required"),
  storage: yup
    .number()
    .typeError("Storage must be a number")
    .positive("Storage must be positive")
    .required("Storage is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
});
