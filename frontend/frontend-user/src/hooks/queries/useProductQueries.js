import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useFetchProducts = (queryParams = {}) => {
  return useQuery({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const response = await api.get("admin/product", { params: queryParams });
      return response.data;
    },
  });
};

export const useFetchProductsForVariantAdding = (queryParams = {}) => {
  return useQuery({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const response = await api.get("/admin/product", { params: queryParams });
      return response.data;
    },
    keepPreviousData: true,
  });
};
