import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useOrderDetails } from "@/hooks/queries/useOrders";

const OrderDetailsDialog = ({ open, setOpen, orderId }) => {
  const { data: order, isLoading } = useOrderDetails({ orderId });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p>Loading...</p>
        ) : order ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-medium">{order._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="font-medium">{order.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount:</span>
              <span className="font-bold">${order.amount}</span>
            </div>
            <div>
              <span className="text-gray-500">Items:</span>
              <ul className="list-disc ml-6 mt-2">
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.productName} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>No details found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;