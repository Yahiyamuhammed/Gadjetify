import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useUserFetchProducts = (queryParams = {}) => {

    const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const response = await api.get("/products", { params: queryParams });
      return response.data; // { products, totalCount, totalPages, currentPage }
    },
    keepPreviousData: true, // useful for paginated lists
  });
};
