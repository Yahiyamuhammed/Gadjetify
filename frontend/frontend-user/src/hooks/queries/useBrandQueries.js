// src/hooks/queries/useBrandQueries.js
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useFetchBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await api.get("/admin/brands");
      return response.data;
    },
  });
};
