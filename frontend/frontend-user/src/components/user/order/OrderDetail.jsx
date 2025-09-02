import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useOrderDetails } from "@/hooks/queries/useOrders";
import FormDialog from "@/components/common/FormDialog";
import {
  useCancelOrder,
  useRequestReturn,
} from "@/hooks/mutations/usePlaceOrder";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const OrderDetail = ({ orderId, onBack }) => {
  const queryClient = useQueryClient();
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const [returnProduct, setReturnProduct] = useState(null);
  const [returnReason, setReturnReason] = useState("");

  const { mutate: requestReturn } = useRequestReturn();
  const { mutate: cancelOrder } = useCancelOrder();

  const {
    data: OrderDetail,
    isLoading,
    isError,
  } = useOrderDetails({ orderId });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !OrderDetail) return <div>Failed to load order details</div>;

  const subtotal = OrderDetail?.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCancelOrder = () => {
    cancelOrder(
      { orderId },
      {
        onSuccess: () => {
          toast.success("Order cancelled");
          queryClient.invalidateQueries(["orders", orderId]);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || err.message);
        },
      }
    );
  };

  const handleReturnSubmit = () => {
    if (!returnReason || returnReason.trim().length < 6) {
      toast.error("Please provide a valid reason for the return.");
      return;
    }

    requestReturn(
      {
        itemId: returnProduct.itemId,
        reason: returnReason,
        orderId: OrderDetail?.orderId,
      },
      {
        onSuccess: () => {
          toast.success("Return Requested");
          queryClient.invalidateQueries(["orders", orderId]);
          setOpenReturnDialog(false);
          setReturnReason("");
          setReturnProduct(null);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || err.message);
          setOpenReturnDialog(false);
          setReturnReason("");
          setReturnProduct(null);
        },
      }
    );
  };

  const handleDownloadOrderPDF = () => {
    if (!OrderDetail) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Order #${OrderDetail.orderId}`, 14, 20);
    doc.setFontSize(12);
    doc.text(
      `Placed on: ${format(new Date(OrderDetail.createdAt), "dd/MM/yyyy")}`,
      14,
      28
    );
    doc.text(`Status: ${OrderDetail.status}`, 14, 36);

    doc.text("Customer Information:", 14, 50);
    doc.text(`Name: ${OrderDetail.addressSnapshot.name}`, 14, 58);
    doc.text(`Phone: ${OrderDetail.addressSnapshot.phone}`, 14, 66);
    doc.text(
      `Address: ${OrderDetail.addressSnapshot.address}, ${OrderDetail.addressSnapshot.locality}, ${OrderDetail.addressSnapshot.district}, ${OrderDetail.addressSnapshot.state} - ${OrderDetail.addressSnapshot.pincode}`,
      14,
      74
    );

    const tableData = OrderDetail.items.map((item, index) => [
      index + 1,
      item.productName,
      item.ram && item.storage ? `${item.ram}GB / ${item.storage}GB` : "-",
      item.quantity,
      `₹${item.price}`,
      `₹${item.price * item.quantity}`,
    ]);

    autoTable(doc, {
      startY: 90,
      head: [["#", "Product", "Variant", "Qty", "Price", "Total"]],
      body: tableData,
    });

    let finalY = doc.lastAutoTable.finalY + 10;
    doc.text("Order Summary:", 14, finalY);
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 14, finalY + 8);
    doc.text(`Shipping: ₹${OrderDetail.summary.shipping}`, 14, finalY + 16);
    doc.text(`Tax: ₹${OrderDetail.summary.tax}`, 14, finalY + 24);
    doc.text(
      `Total Discount: -₹${OrderDetail.summary.totalDiscount}`,
      14,
      finalY + 32
    );
    doc.text(
      `Coupon Discount: -₹${OrderDetail.summary.couponDiscount || 0}`,
      14,
      finalY + 40
    );
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ₹${OrderDetail.summary.total}`, 14, finalY + 55);

    doc.save(`Order_${OrderDetail.orderId}.pdf`);
  };

  const statusClasses = {
    placed: "bg-blue-100 text-blue-700 border-blue-300",
    shipped: "bg-indigo-100 text-indigo-700 border-indigo-300",
    delivered: "bg-green-100 text-green-700 border-green-300",
    cancelled: "bg-red-100 text-red-700 border-red-300",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Order #{OrderDetail.orderId}
            </h1>
            <p className="text-gray-600 mt-1">
              Placed on {format(new Date(OrderDetail.createdAt), "dd/MM/yyyy")}
            </p>
          </div>
          <Badge
            variant="outline"
            className={`capitalize mt-2 sm:mt-0 text-base px-4 py-2 ${
              statusClasses[OrderDetail.status.toLowerCase()]
            }`}
          >
            {OrderDetail.status}
          </Badge>
        </div>

        {/* Customer Info & Summary */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-b">
          {/* Customer Info */}
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
              <p className="font-medium text-gray-600">Shipping Address:</p>
              <p className="text-gray-900">
                {OrderDetail.addressSnapshot.address},{" "}
                {OrderDetail.addressSnapshot.locality},{" "}
                {OrderDetail.addressSnapshot.district},{" "}
                {OrderDetail.addressSnapshot.state} -{" "}
                {OrderDetail.addressSnapshot.pincode}
              </p>
              <p>
                <span className="font-medium text-gray-600">
                  Payment Method:
                </span>{" "}
                {OrderDetail.paymentMethod.toUpperCase()}
              </p>
              <p>
                <span className="font-medium text-gray-600">
                  Payment Status:
                </span>{" "}
                {OrderDetail.paymentStatus.toUpperCase()}
              </p>
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
              <div className="flex justify-between">
                <p className="text-gray-600">Coupon Discount</p>
                <p className="text-gray-900">
                  - ₹{OrderDetail.summary.couponDiscount || 0}
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

        {/* Items */}
        <CardContent className="space-y-4">
          {OrderDetail.items.map((item) => (
            <div
              key={item.itemId}
              className="flex gap-4 border p-4 rounded-lg bg-gray-50 items-center"
            >
              <img
                src={item.image}
                alt={item.productName}
                className="w-20 h-20 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-lg">{item.productName}</p>

                {item.ram && item.storage && (
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-600 shadow-sm">
                      {item.ram}GB RAM
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-600 shadow-sm">
                      {item.storage}GB Storage
                    </span>
                  </div>
                )}

                <p className="text-sm text-gray-600 mt-1">
                  Quantity: {item.quantity}
                </p>
                <p className="text-md font-semibold text-blue-600">
                  Price: ₹{item.price}
                </p>
              </div>

              {OrderDetail.status.toLowerCase() === "delivered" &&
              item.returnStatus === "not_requested" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setReturnProduct(item);
                    setReturnReason("");
                    setOpenReturnDialog(true);
                  }}
                >
                  Return
                </Button>
              ) : (
                <span className="text-sm text-gray-600 capitalize">
                  {item.returnStatus.replace("_", " ")}
                </span>
              )}
            </div>
          ))}
        </CardContent>

        {/* Actions */}
        <div className="p-6 flex justify-between">
          <Button variant="secondary" onClick={onBack}>
            Back to Orders
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadOrderPDF}>
              Download Order
            </Button>
            {OrderDetail.status.toLowerCase() === "placed" && (
              <Button variant="destructive" onClick={handleCancelOrder}>
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </Card>

      <FormDialog
        open={openReturnDialog}
        setOpen={setOpenReturnDialog}
        title={`Return: ${returnProduct?.productName}`}
        onSubmit={handleReturnSubmit}
        formData={{}}
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Reason for Return
          </label>
          <textarea
            className="w-full h-24 border rounded px-3 py-2 text-sm"
            placeholder="Enter your reason..."
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
          />
        </div>
      </FormDialog>
    </>
  );
};

export default OrderDetail;
