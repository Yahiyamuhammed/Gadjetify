import { api } from "@/utils/api"
import { useMutation } from "@tanstack/react-query"


export const useStripePayment = () => {
  return useMutation({
    mutationFn: async ({ amount }) => {
      const res = await api.post("/payment", { amount })
      return res.data 
    },
  })
}