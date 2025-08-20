import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useState } from "react"

export default function StripeCheckoutForm({ onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/orderSuccess",
      },
      redirect: "if_required",
    })

    if (error) {
      console.error(error.message)
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  )
}
