import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import StripeCheckoutForm from "./StripeCheckoutForm"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export default function StripeWrapper({ clientSecret, onSuccess }) {
  const options = { clientSecret }

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckoutForm onSuccess={onSuccess} />
    </Elements>
  )
}
