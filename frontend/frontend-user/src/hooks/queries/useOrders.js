import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders");
      return res.data.data;
    },
  });
};


export const useOrderDetails = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await api.get(`/order/${orderId}`);
      return res.data.data;
    },
    enabled: !!orderId, 
  });
};
