import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useFetchWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await api.get("/wishlist")
      return res.data.wishlist
    }
  })
}
