import { api } from "@/utils/api"
import { useMutation } from "@tanstack/react-query"


export const useStripePayment = () => {
  return useMutation({
    mutationFn: async ({ amount }) => {
      const res = await api.post("/payment/create-payment-intent", { amount })
      return res.data 
    },
  })
}