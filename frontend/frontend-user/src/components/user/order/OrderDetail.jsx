import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const OrderDetail = ({ order, onBack }) => {
  if (!order) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Order #{order.orderId}</span>
          <Badge variant="outline" className="capitalize">
            {order.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Placed On: {order.date}</p>
          <p className="text-sm text-muted-foreground">Total: ₹{order.totalAmount}</p>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          {order.products.map((product) => (
            <div
              key={product.productId}
              className="flex items-center justify-between gap-4 border-b pb-4 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ₹{product.price} × {product.quantity}
                  </p>
                </div>
              </div>
              {order.status === "delivered" && (
                <Button variant="outline" size="sm">
                  Return
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-4">
          <Button variant="secondary" onClick={onBack}>
            Back to Orders
          </Button>
          {order.status === "placed" && (
            <Button variant="destructive">Cancel Order</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetail;
