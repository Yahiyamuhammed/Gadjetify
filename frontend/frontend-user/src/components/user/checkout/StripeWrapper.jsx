import { useRef } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import FormDialog from "@/components/common/FormDialog"
import StripeCheckoutForm from "./StripeCheckoutForm"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export default function StripePaymentDialog({ open, setOpen, clientSecret, onSuccess,onFailed }) {
  const formRef = useRef(null)

  if (!clientSecret) return null

  return (
    <FormDialog
      title="Complete Payment"
      open={open}
      setOpen={setOpen}
      triggerLabel={null}
      // connect the outer "Pay" button to StripeCheckoutForm
      onSubmit={async () => {
        if (formRef.current) {
          const success = await formRef.current.submit()
          if (success) {
            setOpen(false)
          }
        }
      }}
      onFailed 
      submitLabel="Pay"
    >
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripeCheckoutForm ref={formRef} onSuccess={onSuccess} onFailed={onFailed}/>
      </Elements>
    </FormDialog>
  )
}
