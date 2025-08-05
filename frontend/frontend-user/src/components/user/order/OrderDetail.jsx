import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const OrderDetail = ({ order, onBack }) => {
  if (!order) return null;

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Order #{order.orderId}
          </h1>
          <p className="text-gray-600 mt-1">
            Placed on {format(new Date(order.createdAt), "dd/MM/yyyy")}
          </p>
        </div>
        <Badge variant="outline" className="capitalize mt-2 sm:mt-0">
          {order.status}
        </Badge>
      </div>

      {/* Customer Info & Summary */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-b">
        {/* Customer Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-gray-600">Name</p>
              <p className="text-gray-900">{order.customer.name}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Email</p>
              <p className="text-gray-900">{order.customer.email}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Shipping Address</p>
              <p className="text-gray-900">{order.customer.address}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p className="text-gray-900">₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Shipping</p>
              <p className="text-gray-900">₹0.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Tax</p>
              <p className="text-gray-900">₹0.00</p>
            </div>
            <div className="flex justify-between pt-3 border-t font-medium">
              <p className="text-gray-900">Total</p>
              <p className="text-gray-900">₹{subtotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 border-b pb-4 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ₹{item.variant.price} × {item.quantity}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.variant.ram} / {item.variant.storage}
                  </p>
                </div>
              </div>
              {order.status.toLowerCase() === "delivered" && (
                <Button variant="outline" size="sm">
                  Return
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Back to Orders
        </Button>
        {order.status.toLowerCase() === "placed" && (
          <Button variant="destructive">Cancel Order</Button>
        )}
      </div>
    </Card>
  );
};

export default OrderDetail;
