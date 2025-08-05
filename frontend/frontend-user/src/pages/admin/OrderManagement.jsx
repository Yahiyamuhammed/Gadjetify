// AdminOrders.jsx
import { useState } from "react";
import { getAdminOrderColumns } from "@/components/admin/orders/adminOrderColumns";
import DataTableWrapper from "@/components/admin/DataTableWrapper";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAdminFetchOrders } from "@/hooks/queries/useAdminOrdersQueries";
import { Pagination } from "@/components/ui/pagination";

export default function AdminOrders() {

    

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const { data, isLoading } = useAdminFetchOrders({ page, limit: 10, search });
  const orders = data?.data || [];
  const pagination = data?.pagination || { page: 1, pages: 1 };

  const handleSearch = (value) => {
    console.log(value)
    setSearch(value.toLowerCase());
  };

  const handleStatusChange = (orderId, status) => {
    // Integrate with mutation to update status in backend
    console.log("Change status", orderId, status);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDialog(true);
  };

  const handleApproveReturn = (orderId, itemId) => {
    // Integrate with mutation to approve return
    console.log("Approve return", orderId, itemId);
  };

  const transformedOrders = orders.map((order) => ({
    ...order,
    customer: {
      name: order.addressSnapshot?.name || "",
      phone: order.addressSnapshot?.phone || "",
    },
    date: order.createdAt,
    totalAmount: order.finalTotal,
    products: order.items.map((item) => ({
      _id: item._id,
      name: item.productName,
      quantity: item.quantity,
      price: item.price,
      returnStatus: item.returnStatus,
      returnReason: item.returnReason,
      returnRequested: item.returnStatus === "requested"
    }))
  }));

  return (
    <>
      <DataTableWrapper
        title="Orders"
        data={transformedOrders}
        columns={getAdminOrderColumns(
          handleStatusChange,
          handleViewDetails,
          handleApproveReturn
        )}
        filterFn={handleSearch}
        addButton=""
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        onPageChange={setPage}
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
                    product.returnStatus === "requested" && (
                        <>
                        <div>Return Reason: {product.returnReason}</div>

                      <Button
                        variant="outline"
                        onClick={() =>
                            handleApproveReturn(selectedOrder._id, product._id)
                        }
                        >
                        Approve Return
                      </Button>
                          </>
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
