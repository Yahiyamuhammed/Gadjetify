import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useFetchUsers = ({ search = "", page = 1, limit = 5 }) => {
  return useQuery({
    queryKey: ["users", { search, page, limit }],
    queryFn: async () => {
      const res = await api.get("/admin/users", {
        params: { search, page, limit },
      });
      return res.data;
    },
  });
};
