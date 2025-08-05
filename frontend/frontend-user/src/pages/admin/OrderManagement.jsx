// AdminOrders.jsx
import { useState } from "react";
import { getAdminOrderColumns } from "@/components/admin/orders/adminOrderColumns";
import DataTableWrapper from "@/components/admin/DataTableWrapper";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/queries/useOrders";
import { useAdminFetchOrders } from "@/hooks/queries/useAdminOrdersQueries";

// Mock data (Replace with your API data)
const mockOrders = [
  {
    _id: "order1",
    customer: { name: "John Doe", email: "john@example.com" },
    totalAmount: 3200,
    status: "Pending",
    date: "2025-08-06",
    products: [
      {
        _id: "product1",
        name: "Product A",
        quantity: 2,
        price: 1200,
        returnRequested: false,
        returnStatus: "None"
      },
      {
        _id: "product2",
        name: "Product B",
        quantity: 1,
        price: 800,
        returnRequested: true,
        returnStatus: "Requested"
      }
    ]
  }
];

export default function AdminOrders() {
    const [orderss, setOrders] = useState(mockOrders);
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    
    const {data:orders}=useAdminFetchOrders({page:1,limit:10,search})
    console.log(orders)

  const handleSearch = (value) => {
    setSearch(value.toLowerCase());
  };

  const handleStatusChange = (orderId, status) => {
    const updated = orders.map((order) =>
      order._id === orderId ? { ...order, status } : order
    );
    setOrders(updated);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDialog(true);
  };

  const handleApproveReturn = (orderId, productId) => {
    const updated = orders.map((order) => {
      if (order._id === orderId) {
        const updatedProducts = order.products.map((p) =>
          p._id === productId
            ? { ...p, returnStatus: "Approved" }
            : p
        );
        return { ...order, products: updatedProducts };
      }
      return order;
    });
    setOrders(updated);
  };

//   const filteredOrders = orders.filter((order) =>
//     order.customer.name.toLowerCase().includes(search)
//   );

  return (
    <>
      <DataTableWrapper
        title="Orders"
        data={filteredOrders}
        columns={getAdminOrderColumns(
          handleStatusChange,
          handleViewDetails,
          handleApproveReturn
        )}
        filterFn={handleSearch}
        addButton=""
      />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {selectedOrder.products.map((product) => (
                <div key={product._id} className="border p-2 rounded">
                  <div>Name: {product.name}</div>
                  <div>Qty: {product.quantity}</div>
                  <div>Price: ₹{product.price}</div>
                  <div>Return Status: {product.returnStatus}</div>
                  {product.returnRequested &&
                    product.returnStatus === "Requested" && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleApproveReturn(selectedOrder._id, product._id)
                        }
                      >
                        Approve Return
                      </Button>
                    )}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
