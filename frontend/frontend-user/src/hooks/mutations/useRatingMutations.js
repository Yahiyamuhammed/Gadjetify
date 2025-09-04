import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useRateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, variantId, rating }) => {
      const res = await api.post("/rating", { productId, variantId, rating });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orderDetail"]);
    },
  });
};
