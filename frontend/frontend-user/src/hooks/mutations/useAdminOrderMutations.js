import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useApproveReturn = () => {
  return useMutation({
    mutationFn: async ({ orderId, itemId }) => {
      const res = await api.patch(`/admin/orders/${orderId}/approve-return/${itemId}`);
      return res.data;
    }
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      const res = await api.patch(`/admin/orders/${orderId}/status`, { status });
      return res.data;
    }
  });
};