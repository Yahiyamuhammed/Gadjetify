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

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/category/${id}`, data);
      return res.data;
    },
  });
};

export const useToggleCategory = () => {
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.patch(`/category/toggle/${id}`);
      return res.data;
    },
  });
};
