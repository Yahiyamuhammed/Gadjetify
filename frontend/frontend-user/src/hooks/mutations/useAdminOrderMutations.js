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
