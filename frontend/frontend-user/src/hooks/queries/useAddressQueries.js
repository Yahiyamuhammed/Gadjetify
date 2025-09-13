import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const getAddresses = (limit = 5) => {
  return useQuery({
    queryKey: ["address", limit],
    queryFn: async () => {
      const res = await api.get(`/address/get-all-addresses?limit=${limit}`);
      return res.data.addresses;
    },
    keepPreviousData: true,
  });
};
