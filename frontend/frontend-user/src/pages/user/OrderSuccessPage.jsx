import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border-0 overflow-hidden">
        <CardHeader className="text-center pt-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-100 rounded-full opacity-75 animate-ping" />
              <div className="relative bg-green-500 rounded-full p-3">
                <CheckCircle2 className="h-16 w-16 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Order Successful!</h1>
          <p className="mt-3 text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </CardHeader>

        <CardContent className="flex justify-center py-8">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md transform rotate-6">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 w-16 h-24 rounded-t-lg mx-auto" />
              <div className="mt-2 bg-white border-2 border-amber-200 rounded-b-lg p-2">
                <div className="h-1 bg-gray-200 mb-1" />
                <div className="h-1 bg-gray-200 w-3/4 mx-auto" />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pb-10">
          <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl">
            <Link to="/orders">View Order Details</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50 h-12 rounded-xl"
          >
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderSuccessPage;
