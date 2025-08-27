import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useCreateCoupon = () => {
  return useMutation({
    mutationFn: async (couponData) => {
      const res = await api.post(`/admin/coupons`, couponData);
      return res.data;
    },
  });
};

export const useDisableCoupon = () => {
  return useMutation({
    mutationFn: async (couponId) => {
      const res = await api.delete(`/admin/coupons/${couponId}`);
      return res.data;
    },
  });
};
