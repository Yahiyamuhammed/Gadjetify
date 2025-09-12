import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getOrderStatus } from "@/query/order"; // Your API call to fetch order status

export default function PaymentProcessing() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["order-status", orderId],
    queryFn: () => getOrderStatus(orderId),
    refetchInterval: orderId ? 3000 : false,
    enabled: !!orderId,
  });

  useEffect(() => {
    if (!isLoading && data) {
      if (data.status === "PAID") navigate(`/order/success/${orderId}`);
      if (data.status === "FAILED") navigate(`/order/failure/${orderId}`);
    }
  }, [data, isLoading, navigate, orderId]);

  if (!orderId) {
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          <AlertTriangle className="text-red-500 w-12 h-12 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Unable to Fetch Order</h1>
          <p className="text-gray-600">
            Something went wrong while checking your order status. Please try
            again later or contact support.
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
