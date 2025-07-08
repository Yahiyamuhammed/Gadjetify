import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useSingleProduct = (id) => {
  return useQuery({
    queryKey: ["single-product", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    },
  });
};
