import { api } from "@/utils/api";

export const fetchOrderByPaymentIntent = async (paymentIntentId) => {
  const res = await api.get(`/payment/status`, { paymentIntentId });
  return res.data;
};
