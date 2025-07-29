import { api } from "@/utils/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Add or Remove (Toggle) Wishlist Item
export const useToggleWishlist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ productId, variantId }) => {
      const res = await api.post("/wishlist/toggle", { productId, variantId })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist'])
    }
  })
}

// Remove Specific Wishlist Item (no toggle)
export const useRemoveWishlistItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ productId, variantId }) => {
      const res = await api.delete("/wishlist/remove", {
        data: { productId, variantId }
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist'])
    }
  })
}

// Clear Entire Wishlist
export const useClearWishlist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const res = await api.delete("/wishlist/clear")
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist'])
    }
  })
}
