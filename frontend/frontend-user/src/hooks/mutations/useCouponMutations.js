import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

export const useApplyCoupon = () => {
  return useMutation({
    mutationFn: async ({ code}) => {
      const res = await api.post("/coupon/apply", { code});
      return res.data;
    },
  });
};

export const useRemoveCoupon = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/coupon/remove");
      return res.data;
    },
  });
};
