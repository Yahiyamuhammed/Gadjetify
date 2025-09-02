import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useFetchCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await api.get("/cart")
      return res.data
    },
  })
}

export const useFetchCartCount = () => {
  return useQuery({
    queryKey: ["cartCount"],
    queryFn: async () => {
      const res = await api.get("/cart/count");
      return res.data.count;
    },
  });
};