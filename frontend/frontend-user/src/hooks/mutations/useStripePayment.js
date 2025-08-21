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
    mutationFn: async ({ orderId, paymentIntentId }) => {
      const res = await api.post("/payment/success", {
        orderId,
        paymentIntentId,
      });
      return res.data;
    },
  });
};

export const usePaymentFailed = () => {
  return useMutation({
    mutationFn: async ({ orderId, paymentIntentId }) => {
      const res = await api.post("/payment/failed", {
        orderId,
        paymentIntentId,
      });
      return res.data;
    },
  });
};

export const useRetryPayment = () => {
  return useMutation({
    mutationFn: async ({ orderId }) => {
      const res = await api.post("/payment/retry", { orderId });
      return res.data;
    },
  });
};
