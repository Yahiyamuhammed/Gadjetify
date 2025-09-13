import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useOrders = (limit = 5) => {
  return useQuery({
    queryKey: ["orders", limit], // refetches when limit changes
    queryFn: async () => {
      const res = await api.get(`/order?limit=${limit}`);
      return res.data.data;
    },
    keepPreviousData: true, // keeps old data while fetching more
  });
};

export const useOrderDetails = ({ orderId }) => {
  return useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: async () => {
      const res = await api.get(`/order/${orderId}`);
      return res.data.data;
    },
    enabled: !!orderId,
  });
};
