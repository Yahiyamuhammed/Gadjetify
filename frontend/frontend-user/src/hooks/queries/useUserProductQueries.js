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
