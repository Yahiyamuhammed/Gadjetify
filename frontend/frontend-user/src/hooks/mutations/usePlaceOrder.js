import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData) => {
      const res = await api.post("/order", orderData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useRequestReturn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, itemId, reason }) => {
      const res = await api.patch(`/order/${orderId}/return/${itemId}`, { reason });
      return res.data;
    },
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['user-order-detail', orderId] });
    }
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({orderId}) => {
      const res = await api.patch(`/orders/${orderId}/cancel`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
    },
  });
};