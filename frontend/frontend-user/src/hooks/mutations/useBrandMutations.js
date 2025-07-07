// src/hooks/mutations/useBrandMutations.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useAddBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (brandData) => {
      const res = await api.post("/admin/brands", brandData);
      return res.data;
    },
    onSuccess: () => {
      // Refetch brands after adding new one
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (brandId) => {
      const res = await api.patch(`/admin/brands/${brandId}/delete`);
      return res.data;
    },
    onSuccess: () => {
      // Refresh brand list after deletion
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useRestoreBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (brandId) => {
      const res = await api.patch(`/admin/brands/${brandId}/restore`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] }); // refetch brands
    },
  });
};