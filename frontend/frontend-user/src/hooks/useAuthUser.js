// hooks/useAuthUser.js
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api"; // your axios instance

export const fetchAuthUser = async () => {
  const res = await api.get("/auth/me");
  console.log('get into the me')
  return res.data;
};
export const useAuthUser = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: fetchAuthUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};