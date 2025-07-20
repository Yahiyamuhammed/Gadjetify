import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

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
  });
};
