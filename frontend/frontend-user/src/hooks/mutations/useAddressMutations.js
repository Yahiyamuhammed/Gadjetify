import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/utils/api'

export const useAddressMutations = () => {
  const queryClient = useQueryClient()

  const addAddress = useMutation({
    mutationFn: async (addressData) => {
      const res = await axiosInstance.post('/add-address', addressData)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['addresses'])
    }
  })

  const editAddress = useMutation({
    mutationFn: async ({ addressId, updateData }) => {
      const res = await axiosInstance.put(`/edit-address/${addressId}`, updateData)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['addresses'])
    }
  })

  const deleteAddress = useMutation({
    mutationFn: async (addressId) => {
      const res = await axiosInstance.delete(`/delete-address/${addressId}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['addresses'])
    }
  })

  const setPrimaryAddress = useMutation({
    mutationFn: async (addressId) => {
      const res = await axiosInstance.patch(`/set-primary-address/${addressId}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['addresses'])
    }
  })

  return {
    addAddress,
    editAddress,
    deleteAddress,
    setPrimaryAddress
  }
}
