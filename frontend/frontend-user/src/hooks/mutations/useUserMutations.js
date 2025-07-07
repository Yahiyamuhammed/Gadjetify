import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useToggleUserBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const res = await api.patch(`/admin/users/${userId}/block-toggle`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // refetch user list
    },
  });
};
