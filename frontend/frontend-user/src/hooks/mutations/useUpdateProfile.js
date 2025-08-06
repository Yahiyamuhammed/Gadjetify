import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/api"; 

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async ({ name, email }) => {
      const { data } = await api.put("/edit", { name, email });
      return data;
    },
  });
};
