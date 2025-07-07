import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/api"; // your axios instance

export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/admin/product", formData);
      return response.data;
    },
  });
};
