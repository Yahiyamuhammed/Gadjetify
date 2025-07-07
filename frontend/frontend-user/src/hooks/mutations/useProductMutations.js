import { useMutation,useQueryClient  } from "@tanstack/react-query";
import { api } from "@/utils/api"; // your axios instance

export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/admin/product", formData);
      return response.data;
    },
  });
};

// Update Product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedData }) => api.put(`/admin/product/${id}/update`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Soft Delete Product
export const useUnlistProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.patch(`/admin/product/${id}/delete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Restore Product
export const useRestoreProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.patch(`/admin/product/${id}/restore`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
