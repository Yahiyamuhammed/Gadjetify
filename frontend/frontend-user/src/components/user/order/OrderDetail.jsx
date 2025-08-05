import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useOrderDetails } from "@/hooks/queries/useOrders";

const OrderDetail = ({ orderId, onBack }) => {
  if (!orderId) return <div> no Id returned </div>;

  const {
    data: OrderDetail,
    isLoading,
    isError,
  } = useOrderDetails({ orderId });

  if (isLoading || !OrderDetail) return <div>Loading...</div>;
  if (isError) return <div>Failed to load order details</div>;

  console.log(OrderDetail);

  const subtotal = OrderDetail?.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Order #{OrderDetail?.orderId}
          </h1>
          <p className="text-gray-600 mt-1">
            Placed on {format(new Date(OrderDetail?.createdAt), "dd/MM/yyyy")}
          </p>
        </div>
        <Badge variant="outline" className="capitalize mt-2 sm:mt-0">
          {OrderDetail.status}
        </Badge>
      </div>

      {/* Customer Info & Summary */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-b">
        {/* Customer Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Customer Information
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium text-gray-600">Name:</span>{" "}
              {OrderDetail.addressSnapshot.name}
            </p>
            <p>
              <span className="font-medium text-gray-600">Phone:</span>{" "}
              {OrderDetail.addressSnapshot.phone}
            </p>
            <div>
              <p className="font-medium text-gray-600">Shipping Address</p>
              <p className="text-gray-900">
                {OrderDetail.addressSnapshot.address} ,{" "}
                {OrderDetail.addressSnapshot.district}
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p className="text-gray-900">₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Shipping</p>
              <p className="text-gray-900">₹{OrderDetail.summary.shipping}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Tax</p>
              <p className="text-gray-900">₹{OrderDetail.summary.tax}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Total Discount</p>
              <p className="text-gray-900">
                - ₹{OrderDetail.summary.totalDiscount}
              </p>
            </div>
            <div className="flex justify-between pt-3 border-t font-medium">
              <p className="text-gray-900">Total</p>
              <p className="text-gray-900">
                ₹{OrderDetail.summary.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <CardContent className="space-y-4">
        {OrderDetail.items.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 border p-4 rounded-lg bg-gray-50 items-center"
          >
            <img
              src={item.image[0]}
              className="w-20 h-20 rounded object-cover"
              alt={item.productName}
            />
            <div className="flex-1">
              <p className="font-medium text-lg">{item.productName}</p>

              {item.ram && item.storage && (
                <p className="text-md text-gray-600">
                  {item.ram} GB / {item.storage} GB
                </p>
              )}

              <p className="text-md text-gray-600">Quantity: {item.quantity}</p>

              <p className="text-md font-semibold text-blue-600">
                Price: ₹{item.price}
              </p>
            </div>

            {OrderDetail.status.toLowerCase() === "delivered" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReturnProduct(item)}
              >
                Return
              </Button>
            )}
          </div>
        ))}
      </CardContent>

      {/* Actions */}
      <div className="p-6 flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Back to Orders
        </Button>
        {OrderDetail.status.toLowerCase() === "placed" && (
          <Button variant="destructive">Cancel Order</Button>
        )}
      </div>
    </Card>
  );
};

export default OrderDetail;
