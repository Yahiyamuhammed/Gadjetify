import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useAdminFetchOrders = ({ page = 1, limit = 10, search = '' }) => {
  return useQuery({
    queryKey: ['admin-orders', page, limit, search],
    queryFn: async () => {
      const res = await api.get('/orders', {
        params: { page, limit, search }
      });
      return res.data;
    },
    keepPreviousData: true,
  });
};
