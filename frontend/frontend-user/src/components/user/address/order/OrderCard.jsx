import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OrderCard = ({ order, navigate }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-lg">Order ID: {order.orderId}</p>
            <p className="text-sm text-muted-foreground">Status: {order.status}</p>
            <p className="text-sm text-muted-foreground">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button onClick={() => navigate(order._id)}>View</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {order.items.slice(0, 2).map((item) => (
          <div key={item._id} className="flex items-center gap-4">
            <img
              src={item.product.images[0]}
              className="h-16 w-16 rounded object-cover"
              alt={item.product.name}
            />
            <div>
              <p className="font-medium">{item.product.name}</p>
              {item.variant.ram && item.variant.storage && (
                <p className="text-sm text-muted-foreground">
                  {item.variant.ram} / {item.variant.storage}
                </p>
              )}
            </div>
          </div>
        ))}
        {order.items.length > 2 && (
          <p className="text-sm text-muted-foreground">
            + {order.items.length - 2} more items
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
