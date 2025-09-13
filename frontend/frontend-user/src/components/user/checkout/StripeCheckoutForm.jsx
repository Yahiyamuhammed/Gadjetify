import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Link } from "react-router-dom";

const StripeCheckoutForm = forwardRef(({ onSuccess, onFailed ,setLoading }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  // const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (!stripe || !elements) return false;

    setLoading(true);
    setErrorMessage(null);

    const { error, paymentIntent} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orderStatus`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return false;
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
      setLoading(false);
      return true;
    } else if (paymentIntent.last_payment_error) {
      onFailed(paymentIntent.last_payment_error);
      return { success: false, error: paymentIntent.last_payment_error };
    }

    setLoading(false);
    return false;
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  return (
    <div className="space-y-4">
      <PaymentElement />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
});

export default StripeCheckoutForm;
