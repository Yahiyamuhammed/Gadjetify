import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useUserRating = (variantId) => {
  return useQuery({
    queryKey: ["rating", variantId],
    queryFn: async () => {
      const res = await api.get(`/rating/${variantId}`);
      return res.data.rating;
    },
    enabled: !!variantId, 
  });
};
