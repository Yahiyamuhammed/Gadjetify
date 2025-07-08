import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

/**
 * Fetch products with filters, sort, and pagination.
 * @param {Object} queryParams - search, brand, sort, price range, page, limit.
 */
export const useUserFetchProducts = (queryParams = {}) => {
  return useQuery({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const response = await api.get("/products", { params: queryParams });
      return response.data; // { products, totalCount, totalPages, currentPage }
    },
    keepPreviousData: true, // useful for paginated lists
  });
};
