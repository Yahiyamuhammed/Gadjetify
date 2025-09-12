import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchPaymentStatus = (paymentIntentId) => {
  return useQuery({
    queryKey: ["paymentStatus"],
    queryFn: async () => {
      const res = await api.get(`/payment/status/${paymentIntentId}`);
      return res.data;
    },
  });
};
