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

export default function CheckoutPage() {
  const queryClient = useQueryClient();

  const { data: addresses } = getAddresses();
  const { data: items = [] } = useFetchCart();

  const { mutate: addAddress, data: addedAddress } = useAddAddress();
  const { mutate: editAddress, data: editedAddress } = useEditAddress();
  

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  // const [addresse, setAddresses] = useState([]);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setDialogOpen(true);
    // Show modal or navigate to AddAddressPage
  };
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setDialogOpen(true);
    // Open modal with address data or navigate to edit page
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
          validationSchema={addressSchema} // your yup schema
          // no trigger here; you're opening manually
        />
        {/* <AddressForm /> */}
        <PaymentMethod />
      </div>
      <div>
        <OrderSummary 
            items={items.items}
        />
      </div>
    </div>
  );
}
