import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Loader2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useFetchPaymentStatus } from "@/hooks/queries/usePaymentQueries";

export default function PaymentProcessing() {
  const navigate = useNavigate();
  const { orderId, payment_intent } = useParams();
  const [searchParams] = useSearchParams();

  const paymentIntentId = searchParams.get("payment_intent");
  console.log(payment_intent, paymentIntentId);

  const {
    data: paymentStatus,
    error,
    isError: verifyError,
    isLoading: verifyLoading,
  } = useFetchPaymentStatus(paymentIntentId);

  useEffect(() => {
    if (!verifyLoading && paymentStatus) {
      if (paymentStatus.orderStatus.paymentStatus === "paid")
        navigate(`/order/success`);
      if (paymentStatus.orderStatus.paymentStatus === "failed")
        navigate(`/order/failure/${orderId}`);
    }
  }, [paymentStatus, verifyLoading, navigate, paymentIntentId]);

  if (verifyError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          <AlertTriangle className="text-red-500 w-12 h-12 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Not Placed</h1>
          <p className="text-gray-600">
            Your order could not be placed because one or more products were out
            of stock or removed. If you have already made a payment, don’t worry
            – your money will be refunded within 3 business days.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <Loader2 className="animate-spin text-indigo-600 w-12 h-12 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Processing Your Payment</h1>
        <p className="text-gray-600 max-w-md">
          We are confirming your payment with our provider. Please wait a
          moment. This page will automatically redirect you once the status is
          confirmed.
        </p>
      </motion.div>
    </div>
  );
}
