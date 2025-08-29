import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchSummaryData = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/summary");
      return res.data.data;
    },
  });
};
