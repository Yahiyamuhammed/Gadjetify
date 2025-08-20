import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { useState } from "react"

export default function StripeCheckoutForm({ clientSecret, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)

    const card = elements.getElement(CardElement)
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    })

    if (error) {
      console.error(error.message)
      setLoading(false)
    } else {
      if (paymentIntent.status === "succeeded") {
        onSuccess()
      }
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  )
}
