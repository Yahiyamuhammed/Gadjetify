import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/admin/login", formData);
      return response.data;
    },
  });
};
