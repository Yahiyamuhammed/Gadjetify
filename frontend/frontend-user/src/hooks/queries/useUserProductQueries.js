import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

/**
 * Fetch products with filters, sort, and pagination.
 * @param {Object} queryParams - search, brand, sort, price range, page, limit.
 */
export const useUserFetchProducts = (queryParams = {}) => {

    const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const response = await api.get("/products", { params: queryParams });
       if (response.data.user) {
        // Save user data into React Query cache under "currentUser"
        console.log('there is user in the session',response.data.user)
        queryClient.setQueryData(["auth-user"], response.data.user);
      }
      return response.data; // { products, totalCount, totalPages, currentPage }
    },
    keepPreviousData: true, // useful for paginated lists
    onSuccess: (data) => {
      // data.user comes from your controller via checkBlockedUser
      if (data.user) {
        // rehydrate login state
        console.log('there is user ',data.user)
        queryClient.setQueryData(["auth-user"], data.user);
      } else {
        // no user → guest or blocked
        queryClient.removeQueries({ queryKey: ["auth-user"] });
      }
    },
  });
};
