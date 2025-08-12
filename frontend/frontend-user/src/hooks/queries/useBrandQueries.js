// src/hooks/queries/useBrandQueries.js
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useFetchBrands = (queryParams = {}) => {
  return useQuery({
    queryKey: ["brands",queryParams],
    queryFn: async () => {
      const response = await api.get("/admin/brands",{ params: queryParams });
      return response.data;
    },
  });
};
export const useFetchUserBrands = (queryParams = {}) => {
  return useQuery({
    queryKey: ["brands",queryParams],
    queryFn: async () => {
      const response = await api.get("/brands",{ params: queryParams });
      return response.data;
    },
  });
};
