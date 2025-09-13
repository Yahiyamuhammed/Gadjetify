import EditAddressDialog from "@/components/user/address/EditAddressDialog";
import AddressList from "@/components/user/checkout/AddressList";
import OrderSummary from "@/components/user/checkout/OrderSummary";
import PaymentMethod from "@/components/user/checkout/PaymentMethod";
import { getAddresses } from "@/hooks/queries/useAddressQueries";
import { useEffect, useState } from "react";
import { addressSchema } from "@/utils/validation/addressSchema";
import {
  useAddAddress,
  useEditAddress,
} from "@/hooks/mutations/useAddressMutations";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useFetchCart } from "@/hooks/queries/useCartQuery";
import { usePlaceOrder } from "@/hooks/mutations/usePlaceOrder";
import { useNavigate } from "react-router-dom";
import {
  usePaymentFailed,
  usePaymentSuccess,
  useStripePayment,
} from "@/hooks/mutations/useStripePayment";
import StripeCheckoutForm from "@/components/user/checkout/StripeCheckoutForm";
import StripeWrapper from "@/components/user/checkout/StripeWrapper";
import StripePaymentDialog from "@/components/user/checkout/StripeWrapper";
// import { Navigate } from "react-router-dom";

export default function CheckoutPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: addresses } = getAddresses();
  const { data: items = [] } = useFetchCart();

  const { mutate: addAddress, data: addedAddress } = useAddAddress();
  const { mutate: editAddress, data: editedAddress } = useEditAddress();
  const { mutate: placeOrder, isPending:paceOrderIsPending } = usePlaceOrder();
  const { mutate: createPaymentIntent,isPending:intentIsPending } = useStripePayment();
  const { mutate: markSuccess } = usePaymentSuccess();
  const { mutate: markFailed } = usePaymentFailed();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [stripeClientSecret, setStripeClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [pendingOrderPayload, setPendingOrderPayload] = useState(null);
  const [openStripeDialog, setOpenStripeDialog] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState(null);

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);

  // Calculate subtotal and total whenever items change
  useEffect(() => {
    if (!Array.isArray(items.items) || items.items.length === 0) return;
    const formattedItems = items.items.map((item) => {
      const actualPrice = item.variantId.price * item.quantity;
      const offerPercentage = item.productId.offerPercentage || 0;
      const offerDiscount =
        offerPercentage > 0 ? (actualPrice * offerPercentage) / 100 : 0;
      return { ...item, actualPrice, offerDiscount };
    });

    const newSubtotal = formattedItems.reduce(
      (sum, item) => sum + item.actualPrice,
      0
    );
    const totalOfferDiscount = formattedItems.reduce(
      (sum, item) => sum + item.offerDiscount,
      0
    );
    const shipping = newSubtotal > 1000 ? 0 : 49.99;
    const tax = newSubtotal * 0.08;
    const newTotal = newSubtotal - totalOfferDiscount + shipping + tax;

    setSubtotal(newSubtotal);
    setTotal(newTotal);
  }, [items]);

  // Disable COD if total > 1000
  useEffect(() => {
    if (total > 1000 && paymentMethod === "cod") {
      setPaymentMethod("Online Payment");
    }
  }, [total]);

  // const [addresse, setAddresses] = useState([]);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setDialogOpen(true);
  };
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setDialogOpen(true);
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };
  
  const handletotalChange = ({amount}) => {
    setTotalFinal(amount);
  };

  const onFormSubmit = (formData) => {
    if (formData && formData._id) {
      editAddress(
        { updateData: formData, addressId: formData._id },
        {
          onSuccess: () => {
            toast.success("Address updated successfully");
            setDialogOpen(false);
            queryClient.invalidateQueries(["addresses"]);
          },
          onError: (err) => {
            toast.error(
              `Error updating address: ${
                err?.response.data.message || err.message
              }`
            );
          },
        }
      );
    } else {
      addAddress(formData, {
        onSuccess: () => {
          toast.success("Address added successfully");
          setDialogOpen(false);
          queryClient.invalidateQueries(["addresses"]);
        },
        onError: (err) => {
          toast.error(
            `Error adding address: ${err?.response.data.message || err.message}`
          );
        },
      });
    }
  };

  const handlePlaceOrder = (data) => {
    placeOrder(data, {
      onSuccess: (res) => {
        setCreatedOrderId(res.orderId);
        queryClient.invalidateQueries(["cartCount"]);

        if (data.paymentMethod != "Online Payment") {
          toast.success("Order placed!", res);
          navigate("/orderSuccess");
        } else toast.success("Order created!");
        return res.orderId;
      },
      onError: (err) => {
        toast.error(`error occuerd ${err.response.data.message}`);
        console.error("Failed to place order", err);
      },
    });
  };
  const handleOrderSummaryData = (data) => {
    if (!selectedAddressId) {
      toast.error("add address to place order");
      return;
    }
    paymentMethod;
    selectedAddressId;

    const payload = {
      addressId: selectedAddressId,
      paymentMethod,
      finalTotal: data.summary.total,
      items: data.items,
      summary: data.summary,
    };
    if (paymentMethod === "cod" || paymentMethod === "wallet") {
      handlePlaceOrder(payload);
    } else if (paymentMethod === "Online Payment") {
      createPaymentIntent(
        { amount: payload.finalTotal * 100 },
        {
          onSuccess: (res) => {
            const { client_secret: clientSecret, paymentIntentId } = res;
            setStripeClientSecret(clientSecret);
            setPaymentIntentId(paymentIntentId);
            setPendingOrderPayload(payload);
            setOpenStripeDialog(true);
          },
          onError: (err) => {
            console.error(err);
            toast.error(err.response.data.message || "something went wrong");
          },
        }
      );
    }
  };

  const handlePaymentSuccess = () => {
    // First place the order after successful payment
    placeOrder(pendingOrderPayload, {
      onSuccess: (res) => {
        const orderIdFromResponse = res.orderId;
        queryClient.invalidateQueries(["cartCount"]);

        // Now mark payment as successful with the actual order ID
        markSuccess(
          { orderId: orderIdFromResponse, paymentIntentId: paymentIntentId },
          {
            onSuccess: () => {
              toast.success("Payment completed and order placed!");
              navigate("/orderSuccess");
            },
            onError: (err) => {
              toast.error(
                "Payment confirmation failed: ",
                err.response.data.message
              );
            },
          }
        );
      },
      onError: (err) => {
        toast.error(
          err.response.data.message ||
            `Failed to place order after payment: ${err}`
        );
        if (!err.response.data.message)
          console.error("Failed to place order", err);
      },
    });
  };

  const handlePaymentFailed = (error) => {
    placeOrder(pendingOrderPayload, {
      onSuccess: (res) => {
        const orderIdFromResponse = res.orderId;

        markFailed(
          { orderId: orderIdFromResponse, paymentIntentId: paymentIntentId },
          {
            onSuccess: () => {
              toast.error(
                `Payment failed: ${error.message || "Unknown error"}`
              );
              
              navigate(`/orderFailed/${orderIdFromResponse}`);
            },
            onError: (err) => {
              toast.error(
                err.response.data.message || "Failed to record payment failure"
              );
              console.error(err);
            },
          }
        );
      },
      onError: (err) => {
        toast.error(
          err.response.data.message ||
            `Failed to place order after payment: ${err}`
        );
        console.error("Failed to place order", err);
      },
    });
  };

  return (
    <div className="checkout-page p-6 md:p-10 grid md:grid-cols-2 gap-10">
      <div>
        <AddressList
          addresses={addresses}
          onAdd={handleAddAddress}
          onEdit={handleEditAddress}
          onSelect={handleSelectAddress}
        />

        <EditAddressDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          address={editingAddress}
          onSubmit={onFormSubmit}
          validationSchema={addressSchema}

          // your yup schema
          // no trigger here; you're opening manually
        />
        {/* <AddressForm /> */}
        <PaymentMethod
          value={paymentMethod}
          onChange={setPaymentMethod}
          subtotal={totalFinal}
        />
      </div>

      <div>
        <StripePaymentDialog
          open={openStripeDialog}
          setOpen={setOpenStripeDialog}
          clientSecret={stripeClientSecret}
          onSuccess={() => handlePaymentSuccess(createdOrderId)}
          onFailed={handlePaymentFailed}
        />

        <OrderSummary
          items={items.items}
          onPlaceOrder={handleOrderSummaryData}
          onPymentChange={handletotalChange}
          loading={intentIsPending||paceOrderIsPending}
        />
      </div>
    </div>
  );
}
