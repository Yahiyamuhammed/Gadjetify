import { api } from "@/utils/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Add to Cart
export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ productId, variantId }) => {
        console.log(productId,variantId)
      const res = await api.post("/cart", { productId, variantId })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"])
      queryClient.invalidateQueries(["wishlist"]) // since item is removed from wishlist
    },
  })
}

// Update Quantity
export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ variantId, quantity }) => {
      const res = await api.patch(`/cart/${variantId}`, {variantId, quantity })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"])
    },
  })
}

// Remove from Cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ variantId }) => {
      const res = await api.delete(`/cart/${variantId}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"])
    },
  })
}
