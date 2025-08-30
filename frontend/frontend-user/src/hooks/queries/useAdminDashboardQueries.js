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
export const useFetchTopProducts = () => {
  return useQuery({
    queryKey: ["topProducts"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/bestsellers/products");
      return res.data.data;
    },
  });
};
export const useFetchTopBrand = () => {
  return useQuery({
    queryKey: ["topBrand"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/bestsellers/brands");
      return res.data.data;
    },
  });
};