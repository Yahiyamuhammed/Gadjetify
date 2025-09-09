import { useMutation, useQueryClient } from "@tanstack/react-query";
import {api} from "@/utils/api";

export const useAdminLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/admin/auth/login", formData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["admin"], data);
    },
  });
};
