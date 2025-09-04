import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useSalesReport = ({ startDate, endDate, period, page, limit }) => {
  return useQuery({
    queryKey: ["salesReport", { startDate, endDate, period, page, limit }],
    queryFn: async () => {
      const res = await api.get("/admin/reports", {
        params: { startDate, endDate, period, page, limit },
      });
      return res.data.data;
    },
  });
};
