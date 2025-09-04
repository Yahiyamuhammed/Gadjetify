import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data) => api.post("/auth/forgot-password", data),
  });

export const useVerifyForgotOtp = () =>
  useMutation({
    mutationFn: (data) => api.post("/auth/verify-forgot-otp", data),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (data) => api.post("/auth/reset-password", data),
  });
