import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/api';

// Add Address
export const useAddAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (addressData) => {
      const res = await api.post('/address/add-address', addressData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

// Edit Address
export const useEditAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ addressId, updateData }) => {
      const res = await api.put(`/address/edit-address/${addressId}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

// Delete Address
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (addressId) => {
      const res = await api.delete(`/address/delete-address/${addressId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

// Set Primary Address
export const useSetPrimaryAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (addressId) => {
      const res = await api.patch(`/address/set-primary-address/${addressId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};