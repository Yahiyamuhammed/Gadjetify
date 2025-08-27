import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useAdminFetchCoupons = ({ page, limit, search }) => {
  return useQuery({
    queryKey: ["admin-coupons", page, search],
    queryFn: async () => {
      const res = await api.get(`/admin/coupons`, {
        params: { page, limit, search },
      });
      return res.data;
    },
  });
};
