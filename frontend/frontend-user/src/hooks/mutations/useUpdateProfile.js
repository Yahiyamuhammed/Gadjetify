import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/api"; 

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async ({ name, email }) => {
      const { data } = await api.patch("/profile", { name, email });
      return data;
    },
  });
};
export const useVerifyEmailOtp = () => {
  return useMutation({
    mutationFn: async (otp) => {
      const { data } = await api.post("/profile/email/verify", otp );
      return data;
    },
  });
};
