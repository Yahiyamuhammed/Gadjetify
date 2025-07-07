import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useFetchProducts = (queryParams = {}) => {
  return useQuery({
    queryKey: ["products", queryParams], // include filters/pagination later
    queryFn: async () => {
      const response = await api.get("admin/product", { params: queryParams });
      return response.data;
    },
  });
};
