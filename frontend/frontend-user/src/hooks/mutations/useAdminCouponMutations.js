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


export const useUpdateCoupon = () => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/admin/coupons/${id}`, data);
      return res.data;
    },
  });
};


export const useToggleCoupon = () => {
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.patch(`/admin/coupons/${id}/toggle`);
      return res.data;
    },
  });
};
