const { api } = require("@/utils/api");
const { useMutation } = require("@tanstack/react-query");

export const useAdminLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/admin/logout");
      return res;
    },
  });
};
