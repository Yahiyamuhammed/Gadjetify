export const useApproveReturn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, itemId }) => {
      const res = await api.patch(`/admin/orders/${orderId}/approve-return/${itemId}`);
      return res.data;
    },
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-order-detail', orderId] });
    }
  });
};
