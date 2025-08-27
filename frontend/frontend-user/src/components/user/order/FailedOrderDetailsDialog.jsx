import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useOrderDetails } from "@/hooks/queries/useOrders";

const OrderDetailsDialog = ({ open, setOpen, orderId ,order, isLoading}) => {
  
  console.log(order);

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
              <span className="font-medium">{order.orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="font-medium capitalize">{order.status}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Payment:</span>
              <span className="font-medium">
                {order.paymentMethod} ({order.paymentStatus})
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount:</span>
              <span className="font-bold">₹{order.summary?.total}</span>
            </div>

            <div>
              <span className="text-gray-500">Items:</span>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                {order.items.map((item) => (
                  <li key={item.itemId}>
                    {item.productName} × {item.quantity} — ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-gray-500">Shipping Address:</span>
              <div className="mt-1 text-sm text-gray-700">
                <p>{order.addressSnapshot.name}</p>
                <p>{order.addressSnapshot.address}, {order.addressSnapshot.locality}</p>
                <p>{order.addressSnapshot.district}, {order.addressSnapshot.state} - {order.addressSnapshot.pincode}</p>
                <p>Phone: {order.addressSnapshot.phone}</p>
              </div>
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
