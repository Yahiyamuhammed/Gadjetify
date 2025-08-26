import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useState, useImperativeHandle, forwardRef } from "react"
import { Link } from "react-router-dom"

const StripeCheckoutForm = forwardRef(({ onSuccess}, ref) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async () => {
    if (!stripe || !elements) return false

    setLoading(true)
    setErrorMessage(null)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orderSuccess`,
      },
      redirect: "if_required",
    })

    console.log(paymentIntent)

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return false
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess()
      setLoading(false)
      return true
    }
    

    setLoading(false)
    return false
  }

  
  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
    loading,
  }))

  return (
    <div className="space-y-4">
      <PaymentElement />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  )
})

export default StripeCheckoutForm
