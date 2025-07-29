import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useFetchCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await api.get("/cart")
      return res.data
    },
    // staleTime: 5 * 60 * 1000, // optional: 5 minutes
  })
}
