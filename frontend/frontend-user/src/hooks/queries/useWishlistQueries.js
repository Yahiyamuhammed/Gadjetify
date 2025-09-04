import { api } from "@/utils/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useFetchWishlist = () => {
   const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["auth-user"]);
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await api.get("/wishlist")
      return res.data.wishlist
    },
     enabled: !!user, 
  })
}
