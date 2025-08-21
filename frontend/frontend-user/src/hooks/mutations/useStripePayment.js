import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

export const useStripePayment = () => {
  return useMutation({
    mutationFn: async ({ amount }) => {
      const res = await api.post("/payment", { amount });
      return res.data;
    },
  });
};
export const usePaymentSuccess = () => {
  return useMutation({
    mutationFn: async ({ paymentId, orderId }) => {
      const res = await api.post("/payment/success", { paymentId, orderId });
      return res.data;
    },
  });
};

export const usePaymentFailure = () => {
  return useMutation({
    mutationFn: async ({ paymentId }) => {
      const res = await api.post("/payment/failure", { paymentId });
      return res.data;
    },
  });
};

export const useRetryPayment = () => {
  return useMutation({
    mutationFn: async ({ amount }) => {
      const res = await api.post("/payment/retry", { amount });
      return res.data;
    },
  });
};
