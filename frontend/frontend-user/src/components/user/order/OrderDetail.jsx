import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useOrderDetails } from "@/hooks/queries/useOrders";
import FormDialog from "@/components/common/FormDialog";
import { useRequestReturn } from "@/hooks/mutations/usePlaceOrder";
import toast from "react-hot-toast";

const OrderDetail = ({ orderId, onBack }) => {
  if (!orderId) return <div> no Id returned </div>;

  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const [returnProduct, setReturnProduct] = useState(null);
  const [returnReason, setReturnReason] = useState("");

  const { mutate: requestReturn, isError: requestError } = useRequestReturn();
  const {
    data: OrderDetail,
    isLoading,
    isError,
  } = useOrderDetails({ orderId });

  if (isLoading || !OrderDetail) return <div>Loading...</div>;
  if (isError) return <div>Failed to load order details</div>;
  // if (requestError) return <div>Failed to load order details</div>;

  // console.log(OrderDetail);

  const subtotal = OrderDetail?.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    console.log("Returning:", returnProduct);
    console.log("Reason:", returnReason);

    if (returnReason.trim()?.length < 6) {
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

    // Reset
  };

  return (
    <>
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
          {OrderDetail.items.map((item, index) => {
            console.log(item);
            return (
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

                  <p className="text-md text-gray-600">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-md font-semibold text-blue-600">
                    Price: ₹{item.price}
                  </p>
                </div>

                {OrderDetail.status.toLowerCase() !==
                "delivered" ? null : item.returnStatus === "not_requested" ? (
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
            );
          })}
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
      <FormDialog
        open={openReturnDialog}
        setOpen={setOpenReturnDialog}
        title={`Return: ${returnProduct?.productName}`}
        onSubmit={() => {
          handleSubmit();
        }}
        formData={{}} // if not used, pass empty object
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
