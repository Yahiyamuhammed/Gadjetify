import EditAddressDialog from "@/components/user/address/EditAddressDialog";
import AddressList from "@/components/user/checkout/AddressList";
import OrderSummary from "@/components/user/checkout/OrderSummary";
import PaymentMethod from "@/components/user/checkout/PaymentMethod";
import { getAddresses } from "@/hooks/queries/useAddressQueries";
import { useState } from "react";
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
  const { mutate: placeOrder, isPending } = usePlaceOrder();
  const { mutate: createPaymentIntent } = useStripePayment();
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
    // console.log(addressId);
    setSelectedAddressId(addressId);
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
            toast.error(`Error updating address: ${err?.message || err}`);
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
          toast.error(`Error adding address: ${err?.message || err}`);
        },
      });
    }
  };

  const handlePlaceOrder = (data) => {
    placeOrder(data, {
      onSuccess: (res) => {
        console.log(res.orderId, "tyhis is the ordre id");
        setCreatedOrderId(res.orderId);
        console.log("this is the order id seting", createdOrderId);
        toast.success("Order created!");
        if (data.paymentMethod != "Online Payment") {
          toast.success("Order placed!", res);
          navigate("/orderSuccess");
        }
        return res.orderId;
      },
      onError: (err) => {
        toast.error(`error occuerd ${err}`);
        console.error("Failed to place order", err);
      },
    });
  };
  const handleOrderSummaryData = (data) => {
    paymentMethod;
    selectedAddressId;

    const payload = {
      addressId: selectedAddressId,
      paymentMethod,
      finalTotal: data.summary.total,
      items: data.items,
      summary: data.summary,
    };
    if (paymentMethod === "cod") {
      handlePlaceOrder(payload);
    } else if (paymentMethod === "Online Payment") {
      createPaymentIntent(
        { amount: payload.finalTotal * 100 },
        {
          onSuccess: (res) => {
            console.log(" thi si sthe res of payment", res);
            const { client_secret: clientSecret, paymentIntentId } = res;
            setStripeClientSecret(clientSecret);
            setPaymentIntentId(paymentIntentId);
            setPendingOrderPayload(payload);
            setOpenStripeDialog(true);
            console.log(
              "setting striope to tru",
              openStripeDialog,
              stripeClientSecret
            );
          },
          onError: (err) => {
            console.error(err);
          },
        }
      );
    }
  };

  const handlePaymentSuccess = () => {
  // First place the order after successful payment
  placeOrder(pendingOrderPayload, {
    onSuccess: (res) => {
      console.log('Order placed after payment success:', res.orderId);
      const orderIdFromResponse = res.orderId;
      
      // Now mark payment as successful with the actual order ID
      markSuccess(
        { orderId: orderIdFromResponse, paymentIntentId: paymentIntentId },
        {
          onSuccess: () => {
            toast.success("Payment completed and order placed!");
            navigate("/orderSuccess");
          },
          onError: (err) => {
            toast.error("Payment confirmation failed: " + err.message);
          },
        }
      );
    },
    onError: (err) => {
      toast.error(`Failed to place order after payment: ${err}`);
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
        <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
      </div>

      <div>
        <StripePaymentDialog
          open={openStripeDialog}
          setOpen={setOpenStripeDialog}
          clientSecret={stripeClientSecret}
          onSuccess={() => handlePaymentSuccess(createdOrderId)}
        />

        <OrderSummary
          items={items.items}
          onPlaceOrder={handleOrderSummaryData}
        />
      </div>
    </div>
  );
}
