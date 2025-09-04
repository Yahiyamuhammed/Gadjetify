import * as Yup from "yup";

export const variantValidationSchema = Yup.object().shape({
  productId: Yup.string()
    .required("Product ID is required")
    .min(3, "Product ID must be at least 3 characters")
    .max(50, "Product ID must be at most 50 characters"),

  ram: Yup.number()
    .required("RAM is required")
    .min(1, "RAM must be at least 1 GB")
    .max(512, "RAM cannot exceed 512 GB"),

  storage: Yup.number()
    .required("Storage is required")
    .min(8, "Storage must be at least 8 GB")
    .max(2048, "Storage cannot exceed 2048 GB"),

  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be at least 1")
    .max(1000000, "Price cannot exceed 1,000,000"),

  stock: Yup.number()
    .required("Stock is required")
    .min(0, "Stock cannot be negative")
    .max(10000, "Stock cannot exceed 10,000"),
});
