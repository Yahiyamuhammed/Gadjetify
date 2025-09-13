import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useWallet = () => {
  return useQuery({
    queryKey: ['user-wallet'],
    queryFn: async () => {
      const res = await api.get('/wallet');
      return res.data.data;
    },
  });
};

export const useWalletBalance = () => {
  return useQuery({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      const { data } = await api.get("/wallet/balance");
      return data; 
    },
  });
};
