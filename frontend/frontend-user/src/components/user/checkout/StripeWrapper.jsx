import { useRef, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FormDialog from "@/components/common/FormDialog";
import StripeCheckoutForm from "./StripeCheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function StripePaymentDialog({
  open,
  setOpen,
  clientSecret,
  onSuccess,
  onFailed,
}) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);


  if (!clientSecret) return null;

  return (
    <FormDialog
      title="Complete Payment"
      open={open}
      setOpen={setOpen}
      triggerLabel={null}
      onSubmit={async () => {
        if (formRef.current) {
          const success = await formRef.current.submit();
          if (success) {
            setOpen(false);
          }
        }
      }}
      onFailed
      submitLabel="Pay"
      loading={loading}
    >
      {console.log('this is the loading ',formRef.current?.loading)}
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripeCheckoutForm
          ref={formRef}
          onSuccess={onSuccess}
          onFailed={onFailed}
            setLoading={setLoading}
        />
      </Elements>
    </FormDialog>
  );
}
