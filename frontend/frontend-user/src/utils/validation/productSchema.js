// src/utils/validation/productSchema.js
import * as yup from 'yup';

export const productValidation = yup.object().shape({
  name: yup
    .string()
    .required('Product name is required')
    .min(2, 'Product name must be at least 2 characters'),

  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),

  categoryId: yup
    .string()
    .required('Category is required'),

  offerPercent: yup
    .number()
    .required('Offer percent is required')
    .min(0, 'Offer percent cannot be negative')
    .max(100, 'Offer percent cannot exceed 100'),

  returnPolicy: yup
    .boolean()
    .nullable()
    .oneOf([true, false, null], 'Invalid return policy'),

  COD: yup
    .boolean()
    .nullable()
    .oneOf([true, false, null], 'Invalid COD value'),

  warranty: yup
    .string()
    .required('Warranty is required')
    .min(3, 'Warranty must be at least 3 characters'),

  model: yup
    .string()
    .required('Model is required'),

  size: yup
    .string()
    .required('Size is required'),

  ram: yup
    .number()
    .required('RAM is required')
    .min(1, 'RAM must be at least 1 GB'),

  storage: yup
    .number()
    .required('Storage is required')
    .min(1, 'Storage must be at least 1 GB'),

  stock: yup
    .number()
    .required('Stock is required')
    .min(0, 'Stock cannot be negative'),

  price: yup
    .number()
    .required('Price is required')
    .min(0, 'Price cannot be negative'),

  network: yup
    .string()
    .required('Network is required'),
});
