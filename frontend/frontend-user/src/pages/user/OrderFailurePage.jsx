import React from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle , CreditCardIcon, UserIcon } from "lucide-react"
import { useParams } from "react-router-dom"

const OrderFailurePage = () => {
    const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-4xl overflow-hidden flex flex-col md:flex-row rounded-2xl shadow-xl">
        {/* Illustration Section */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-red-50 to-red-100 p-8 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-200 rounded-full opacity-20 animate-ping"></div>
            <div className="relative">
              <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-64 md:h-64">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="#FEE2E2"
                  stroke="#FECACA"
                  strokeWidth="4"
                />
                <path
                  d="M70,70 L130,130 M70,130 L130,70"
                  stroke="#EF4444"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="80" r="10" fill="#EF4444" />
                <path
                  d="M80,120 Q100,140 120,120"
                  stroke="#EF4444"
                  strokeWidth="6"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
          <Alert variant="destructive" className="mb-4 flex items-center gap-2">
            <AlertTriangle  className="h-5 w-5" />
            <AlertTitle>PAYMENT FAILED</AlertTitle>
          </Alert>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Payment Unsuccessful
          </h1>

          <p className="text-gray-600 mb-2">
            We encountered an issue processing your payment. Don't worry, your
            order is safe!
          </p>

          <Card className="bg-gray-50 mt-4 mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-medium">#ORD-78945</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold text-lg">$124.99</span>
              </div>
            </CardContent>
          </Card>

          <p className="text-gray-600 mb-6">
            You can retry the payment or contact support for assistance. Your
            items are reserved for the next 30 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              className="px-6 py-3 text-white font-semibold shadow-md"
              variant="destructive"
            >
              Retry Payment
            </Button>
            <Button
              className="px-6 py-3 font-medium shadow-sm"
              variant="outline"
            >
              View Order Details
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Need immediate help?{" "}
              <a
                href="#"
                className="text-red-500 hover:underline font-medium"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </Card>

      {/* Additional Info Section */}
      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-start gap-4">
          <AlertTriangle  className="h-6 w-6 text-red-500" />
          <div>
            <CardTitle className="text-base">Payment Declined</CardTitle>
            <p className="text-gray-600 text-sm mt-1">
              Your bank declined the transaction. Please verify your payment
              details.
            </p>
          </div>
        </Card>

        <Card className="p-6 flex items-start gap-4">
          <CreditCardIcon className="h-6 w-6 text-red-500" />
          <div>
            <CardTitle className="text-base">Card Issues</CardTitle>
            <p className="text-gray-600 text-sm mt-1">
              Check your card's expiration date, CVV, and available balance.
            </p>
          </div>
        </Card>

        <Card className="p-6 flex items-start gap-4">
          <UserIcon className="h-6 w-6 text-red-500" />
          <div>
            <CardTitle className="text-base">24/7 Support</CardTitle>
            <p className="text-gray-600 text-sm mt-1">
              Our team is always ready to help resolve any payment issues.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default OrderFailurePage
