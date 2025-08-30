import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchSummaryData = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/summary");
      return res.data;
    },
  });
};

export const useFetchSalesReport = ({ startDate, endDate, period, page, limit }) => {
  return useQuery({
    queryKey: ["salesReport", { startDate, endDate, period, page, limit }],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/sales", {
        params: { startDate, endDate, period, page, limit },
      });
      return res.data.data;
    },
    enabled: !!startDate && !!endDate,
  });
};
