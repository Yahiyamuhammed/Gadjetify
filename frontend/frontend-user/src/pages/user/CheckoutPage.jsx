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
import { useStripePayment } from "@/hooks/mutations/useStripePayment";
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

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [stripeClientSecret, setStripeClientSecret] = useState(null);
  const [pendingOrderPayload, setPendingOrderPayload] = useState(null);
  const [openStripeDialog, setOpenStripeDialog] = useState(false);

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
    console.log(addressId);
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
        toast.success("Order placed!", res);
        navigate("/orderSuccess");
      },
      onError: (err) => {
        toast.error(`error occuerd ${err}`);
        console.error("Failed to place order", err);
      },
    });
  };
  const handleOrderSummaryData = (data) => {
    toast.success(paymentMethod);
    paymentMethod;
    selectedAddressId;

    const payload = {
      addressId: selectedAddressId,
      paymentMethod,
      finalTotal: data.summary.total,
      items: data.items,
      summary: data.summary,
    };

    handlePlaceOrder(payload);
    if (paymentMethod === "Online Payment") {
      toast.success("this is inside online payment");
      createPaymentIntent(
        { amount: payload.finalTotal * 100 },
        {
          onSuccess: (res) => {
            const { clientSecret } = res;
            setStripeClientSecret(clientSecret);
            setPendingOrderPayload(payload);
            setOpenStripeDialog(true);
          },
          onError: (err) => {
            console.error(err);
          },
        }
      );
    }
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
          onSuccess={() => {
            handlePlaceOrder(pendingOrderPayload);
          }}
        />

        <OrderSummary
          items={items.items}
          onPlaceOrder={handleOrderSummaryData}
        />
      </div>
    </div>
  );
}
