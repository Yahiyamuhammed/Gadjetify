import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchVarients = ({ page, limit, search }) => {
  return useQuery({
    queryKey: ["variants", page, limit, search],
    queryFn: async () => {
      const res = await api.get("/admin/variants", {
        params: { page, limit, search },
      });
      return res.data;
    },
  });
};
